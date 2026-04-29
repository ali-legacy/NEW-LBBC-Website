import express from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import * as cheerio from "cheerio";
import fetch from "node-fetch";
import https from "https";

console.log('--- LBBC SERVER STARTING ---');
console.log('Time:', new Date().toISOString());
console.log('CWD:', process.cwd());
console.log('Node Version:', process.version);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ─── Configuration ──────────────────────────────────────────────

const DATA_DIR = path.join(__dirname, 'public', 'data');
const ORG_ID = '5915';
const BASE = 'https://lbbc.glueup.com';

// Refresh interval: 30 minutes (in milliseconds)
const REFRESH_INTERVAL_MS = 30 * 60 * 1000;

// Member detail cache duration: 24 hours
const DETAIL_CACHE_DURATION_MS = 24 * 60 * 60 * 1000;

// In-memory caches
let membersCache = null;
let eventsCache = null;
const memberDetailCache = new Map(); // glueupId -> { data, timestamp }
let lastRefreshTime = 0;
let isRefreshing = false;

// ─── HTTP Helper ────────────────────────────────────────────────

const agent = new https.Agent({ rejectUnauthorized: false });

const HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  'Accept-Language': 'en-GB,en;q=0.9',
  'Referer': `${BASE}/organization/${ORG_ID}/`,
};

async function fetchPage(url, retries = 3) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const res = await fetch(url, { agent, headers: HEADERS, timeout: 30000 });
      if (!res.ok) {
        if (attempt < retries) { await sleep(2000 * attempt); continue; }
        throw new Error(`HTTP ${res.status}`);
      }
      return await res.text();
    } catch (err) {
      if (attempt < retries) await sleep(2000 * attempt);
      else throw err;
    }
  }
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function normalizeImageUrl(src) {
  if (!src) return null;
  src = src.trim().replace(/['"]/g, '');
  if (src.startsWith('//')) return 'https:' + src;
  if (src.startsWith('/')) return BASE + src;
  if (src.startsWith('http')) return src;
  return BASE + '/' + src;
}

// ─── Scraping Functions ─────────────────────────────────────────

function parseMembersFromHtml(html, membershipType) {
  const $ = cheerio.load(html);
  const members = [];
  $('dt.BlockRow').each((i, el) => {
    const $el = $(el);
    const name = $el.find('.title').first().text().trim();
    if (!name) return;
    const sector = $el.find('.description').first().text().trim() || 'Other';
    const dataId = $el.attr('data-id') || `${membershipType}-${i}`;
    const dataEvent = $el.attr('data-event') || '';
    let glueupId = null;
    const idMatch = dataEvent.match(/id=(\d+)/);
    if (idMatch) glueupId = idMatch[1];
    const imgSrc = $el.find('img').first().attr('src');
    const srcset = $el.find('img').first().attr('srcset');
    const logoHq = srcset ? normalizeImageUrl(srcset.split(/\s+/)[0]) : null;
    const logo = normalizeImageUrl(imgSrc);
    members.push({
      name, sector,
      logo: logoHq || logo,
      id: dataId,
      glueupId: glueupId || dataId,
      membershipType,
      members: [],
    });
  });
  return members;
}

function parseEventsFromHtml(html) {
  const $ = cheerio.load(html);
  const events = [];
  $('h2.content').each((i, el) => {
    const $h2 = $(el);
    const $a = $h2.find('a').first();
    const title = ($a.text() || $h2.text()).trim();
    if (!title) return;
    let link = $a.attr('href') || '';
    if (link && !link.startsWith('http')) link = BASE + (link.startsWith('/') ? '' : '/') + link;
    const $container = $h2.closest('li').length ? $h2.closest('li') : $h2.parent();
    const date = $container.find('time.content').first().text().trim();
    const location = $container.find('.area.content').first().text().trim();
    let image = null;
    const $eventImage = $container.find('.event-image');
    if ($eventImage.length) {
      const style = $eventImage.attr('style') || '';
      const imgMatch = style.match(/url\(([^)]+)\)/);
      if (imgMatch) image = normalizeImageUrl(imgMatch[1]);
    }
    const eventIdMatch = link.match(/\/event\/[^/]+-(\d+)\//);
    const eventId = eventIdMatch ? eventIdMatch[1] : `e-${i}`;
    events.push({ id: eventId, title, date, location, image, link, type: 'Event' });
  });
  return events;
}

// ─── Background Refresh Logic ───────────────────────────────────

async function refreshData() {
  if (isRefreshing) {
    console.log('[Refresh] Already in progress, skipping...');
    return;
  }
  isRefreshing = true;
  const start = Date.now();
  console.log(`[Refresh] Starting data refresh at ${new Date().toISOString()}`);

  // Scrape members
  try {
    const corporateUrl = `${BASE}/organization/${ORG_ID}/widget/membership-directory/corporate/`;
    const corporateHtml = await fetchPage(corporateUrl);
    const allMembers = parseMembersFromHtml(corporateHtml, 'corporate');
    
    let council = [];
    let corporate = [];

    // Classify members using known council list (from official LBBC website)
    const COUNCIL_NAMES = new Set([
      'ALFA Holding Group', 'ALMARAJ Company for Oil and Gas', 'Anzar Property Investors Limited',
      'BACB', 'Bank ABC', 'Black Gold Automation & Control', 'Blue Sky Oilfield Supply & Services',
      'BP', 'CGG Services UK LTD', 'Consolidated Contractors (UK) Ltd', 'Core Laboratories',
      'De La Rue International', 'DNO ASA', 'Eltumi Partners', 'Equinor Libya AS',
      'Eversheds Sutherland', 'Expertise Consultancy', 'Global Consolidated Contractors International',
      'Gulfsands Petroleum Plc', 'HB Group', 'Harbour Energy', 'Jawaby Services and Investment Limited',
      'kashadah & Co', 'Libya Holdings', 'METLEN Energy & Metals SA', 'Misurata Free Zone',
      'Murzuq Oil', 'North south global sl', 'Petroleum Research Centre', 'PROMERGON',
      'Ribat International', 'Safe group investment holding company', 'Seawing Company Oil & Marine',
      'Seawing-ILK Contracting and Construction', 'Shell International Limited', 'StoneTurn UK Limited',
      'Takween', 'Trouvay & Cauvin Limited', 'Vitol SA', 'Zahaf & Partners Law Firm',
    ].map(n => n.toLowerCase()));
    
    for (const member of allMembers) {
      if (COUNCIL_NAMES.has(member.name.toLowerCase())) {
        member.membershipType = 'council';
        council.push(member);
      } else {
        corporate.push(member);
      }
    }

    const totalMembers = council.length + corporate.length;
    if (totalMembers > 0) {
      membersCache = { council, corporate, timestamp: Date.now(), source: 'live-scrape', totalMembers };
      // Persist to disk as fallback
      fs.writeFileSync(path.join(DATA_DIR, 'members.json'), JSON.stringify(membersCache, null, 2));
      console.log(`[Refresh] ✓ Members: ${council.length} council, ${corporate.length} corporate`);
    } else {
      console.warn('[Refresh] ⚠ Members: Got 0 results, keeping existing cache');
    }
  } catch (err) {
    console.error('[Refresh] ✗ Members failed:', err.message);
  }

  // Scrape events
  try {
    const upcomingUrl = `${BASE}/organization/${ORG_ID}/widget/event-list/full-view`;
    const pastUrl = `${BASE}/organization/${ORG_ID}/widget/event-list/full-view?listType=past`;
    const [htmlUp, htmlPast] = await Promise.all([fetchPage(upcomingUrl), fetchPage(pastUrl)]);
    const upcoming = parseEventsFromHtml(htmlUp);
    const past = parseEventsFromHtml(htmlPast);

    eventsCache = { upcoming, past, timestamp: Date.now(), source: 'live-scrape' };
    fs.writeFileSync(path.join(DATA_DIR, 'events.json'), JSON.stringify(eventsCache, null, 2));
    console.log(`[Refresh] ✓ Events: ${upcoming.length} upcoming, ${past.length} past`);
  } catch (err) {
    console.error('[Refresh] ✗ Events failed:', err.message);
  }

  lastRefreshTime = Date.now();
  isRefreshing = false;
  const elapsed = ((Date.now() - start) / 1000).toFixed(1);
  console.log(`[Refresh] Complete in ${elapsed}s. Next refresh in ${REFRESH_INTERVAL_MS / 60000} minutes.`);
}

// ─── Member Detail Proxy ────────────────────────────────────────

async function getMemberDetail(glueupId, type = 'corporate') {
  // Check in-memory cache
  const cached = memberDetailCache.get(glueupId);
  if (cached && (Date.now() - cached.timestamp) < DETAIL_CACHE_DURATION_MS) {
    return cached.data;
  }

  // Fetch from GlueUp with session
  try {
    // Establish session
    const dirUrl = `${BASE}/organization/${ORG_ID}/widget/membership-directory/${type}/`;
    const sessionRes = await fetch(dirUrl, { agent, headers: HEADERS, redirect: 'follow' });
    const rawCookies = sessionRes.headers.raw()['set-cookie'];
    const cookieStr = rawCookies ? rawCookies.map(c => c.split(';')[0]).join('; ') : '';

    // Fetch the overlay
    const url = `${BASE}/ajax/organization/${ORG_ID}/widget/membership-directory/ajax/requestInfoOverlay?type=${type}&id=${glueupId}`;
    const res = await fetch(url, {
      agent,
      headers: {
        ...HEADERS,
        'X-Requested-With': 'XMLHttpRequest',
        'X-Platform': 'WIDGET',
        'Accept': 'application/json, text/javascript, */*; q=0.01',
        'Referer': dirUrl,
        ...(cookieStr ? { 'Cookie': cookieStr } : {}),
      },
    });

    if (!res.ok) {
      console.warn(`[Detail] HTTP ${res.status} for member ${glueupId}`);
      return null;
    }

    const json = await res.json();
    const html = json?.data?.value?.wrapper || '';

    if (html.includes('404') && html.includes('Page not found')) {
      // Cache the "not found" so we don't keep retrying
      memberDetailCache.set(glueupId, { data: null, timestamp: Date.now() });
      return null;
    }

    const $ = cheerio.load(html);

    // Extract all useful text content from the overlay
    const description = 
      $('.about-content').text().trim() ||
      $('.description').text().trim() ||
      $('.content-area').text().trim() ||
      null;

    const website =
      $('a[href*="http"]').not('[href*="glueup"]').first().attr('href') ||
      null;

    // Extract any contact info
    const email = $('a[href^="mailto:"]').first().attr('href')?.replace('mailto:', '') || null;
    const phone = $('a[href^="tel:"]').first().attr('href')?.replace('tel:', '') || null;

    // Extract address
    const address = $('.address').text().trim() || null;

    const detail = { description, website, email, phone, address, rawHtml: html };
    
    // Cache it
    memberDetailCache.set(glueupId, { data: detail, timestamp: Date.now() });
    return detail;
  } catch (err) {
    console.error(`[Detail] Error fetching detail for ${glueupId}:`, err.message);
    return null;
  }
}

// ─── Server Setup ───────────────────────────────────────────────

async function createServer() {
  const app = express();

  // Request logging
  app.use((req, res, next) => {
    console.log(`[Server] ${new Date().toISOString()} ${req.method} ${req.url}`);
    // Normalize API requests with subfolder prefix
    if (req.url.includes('/api/') && !req.url.startsWith('/api/')) {
      req.url = req.url.substring(req.url.indexOf('/api/'));
    }
    next();
  });

  // ── API Endpoints ──

  // Members endpoint — serves from in-memory cache, falls back to disk
  const membersHandler = (req, res) => {
    if (membersCache) {
      return res.json(membersCache);
    }
    const cachePath = path.join(DATA_DIR, 'members.json');
    if (fs.existsSync(cachePath)) {
      return res.sendFile(cachePath);
    }
    res.status(404).json({ error: 'Members data not available. Refresh in progress.' });
  };

  // Events endpoint
  const eventsHandler = (req, res) => {
    if (eventsCache) {
      return res.json(eventsCache);
    }
    const cachePath = path.join(DATA_DIR, 'events.json');
    if (fs.existsSync(cachePath)) {
      return res.sendFile(cachePath);
    }
    res.status(404).json({ error: 'Events data not available. Refresh in progress.' });
  };

  // Member detail proxy — fetches "More Information" from GlueUp on demand
  const memberDetailHandler = async (req, res) => {
    const { id } = req.params;
    const type = req.query.type || 'corporate';

    if (!id || !/^\d+$/.test(id)) {
      return res.status(400).json({ error: 'Invalid member ID' });
    }

    try {
      const detail = await getMemberDetail(id, type);
      if (detail) {
        res.json({ success: true, data: detail });
      } else {
        res.json({ success: false, data: null, message: 'No details available for this member' });
      }
    } catch (err) {
      console.error(`[Server] Detail fetch error for ${id}:`, err.message);
      res.status(500).json({ error: 'Failed to fetch member details' });
    }
  };

  // Health/status endpoint
  const healthHandler = (req, res) => {
    res.json({
      status: 'ok',
      env: process.env.NODE_ENV,
      lastRefresh: lastRefreshTime ? new Date(lastRefreshTime).toISOString() : 'never',
      nextRefresh: lastRefreshTime ? new Date(lastRefreshTime + REFRESH_INTERVAL_MS).toISOString() : 'pending',
      membersCount: membersCache ? (membersCache.council?.length || 0) + (membersCache.corporate?.length || 0) : 0,
      eventsCount: eventsCache ? (eventsCache.upcoming?.length || 0) + (eventsCache.past?.length || 0) : 0,
      detailCacheSize: memberDetailCache.size,
      isRefreshing,
    });
  };

  // Force refresh endpoint (for manual updates)
  const forceRefreshHandler = async (req, res) => {
    console.log('[Server] Force refresh triggered');
    refreshData(); // Don't await — run in background
    res.json({ message: 'Refresh started. Check /api/health for status.' });
  };

  app.get("/api/test", (req, res) => res.send("API is working"));
  app.get(["/api/members", "/api/members/"], membersHandler);
  app.get(["/api/events", "/api/events/"], eventsHandler);
  app.get("/api/members/detail/:id", memberDetailHandler);
  app.get("/api/health", healthHandler);
  app.get("/api/refresh", forceRefreshHandler);

  // Legacy route compatibility
  app.get(["/members", "/members/"], membersHandler);
  app.get(["/events", "/events/"], eventsHandler);
  app.use("/*/api/members", membersHandler);
  app.use("/*/api/events", eventsHandler);

  // Serve static files
  const distPath = path.join(__dirname, 'dist');
  console.log(`[Server] Checking for dist at: ${distPath}`);
  if (fs.existsSync(distPath)) {
    console.log(`[Server] Serving static files from: ${distPath}`);
    app.use(express.static(distPath));
  } else {
    console.warn(`[Server] WARNING: 'dist' directory not found at ${distPath}`);
  }

  // Catch-all for SPA routing
  app.get('*', (req, res) => {
    const indexPath = path.join(distPath, 'index.html');
    if (fs.existsSync(indexPath)) {
      res.sendFile(indexPath);
    } else {
      res.status(404).send(`
        <html><body style="font-family: sans-serif; padding: 2rem;">
          <h1 style="color: #e11d48;">LBBC Server Running</h1>
          <p>The frontend build was not found. Run <code>npm run build</code> first.</p>
          <a href="/api/health">Check Health</a>
        </body></html>
      `);
    }
  });

  app.use((err, req, res, next) => {
    console.error('[Server Error]', err);
    res.status(500).json({ error: 'Internal Server Error', message: err.message });
  });

  return app;
}

// ─── Start Server ───────────────────────────────────────────────

const PORT = process.env.PORT || 3000;

createServer().then(app => {
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`--- LBBC SERVER IS LIVE ---`);
    console.log(`Port: ${PORT}`);
    console.log(`Directory: ${__dirname}`);
    console.log(`Time: ${new Date().toISOString()}`);
    console.log(`Auto-refresh: Every ${REFRESH_INTERVAL_MS / 60000} minutes`);

    // Load existing data from disk into memory immediately
    try {
      const memberPath = path.join(DATA_DIR, 'members.json');
      if (fs.existsSync(memberPath)) {
        membersCache = JSON.parse(fs.readFileSync(memberPath, 'utf8'));
        console.log(`[Startup] Loaded ${(membersCache.council?.length || 0) + (membersCache.corporate?.length || 0)} members from disk`);
      }
    } catch (e) { console.warn('[Startup] Could not load members from disk:', e.message); }

    try {
      const eventsPath = path.join(DATA_DIR, 'events.json');
      if (fs.existsSync(eventsPath)) {
        eventsCache = JSON.parse(fs.readFileSync(eventsPath, 'utf8'));
        console.log(`[Startup] Loaded ${(eventsCache.upcoming?.length || 0) + (eventsCache.past?.length || 0)} events from disk`);
      }
    } catch (e) { console.warn('[Startup] Could not load events from disk:', e.message); }

    // Trigger first background refresh after a 5-second delay (let server stabilize)
    setTimeout(() => {
      console.log('[Startup] Triggering initial background data refresh...');
      refreshData();
    }, 5000);

    // Set up periodic refresh
    setInterval(() => {
      refreshData();
    }, REFRESH_INTERVAL_MS);
  });
}).catch(err => {
  console.error('CRITICAL: Failed to start server:', err);
});
