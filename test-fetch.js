import fetch from 'node-fetch';
import https from 'https';
import * as cheerio from 'cheerio';

async function testFetch() {
  const orgId = '5915';
  const memberId = '2748560';
  const agent = new https.Agent({ rejectUnauthorized: false });
  
  console.log('--- Step 1: Fetching main widget page to get cookies ---');
  const mainRes = await fetch(`https://lbbc.glueup.com/organization/${orgId}/widget/membership-directory/corporate/`, {
    agent,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
  });
  
  const cookies = mainRes.headers.get('set-cookie');
  console.log('Cookies received:', cookies ? 'Yes' : 'No');

  const urls = [
    {
      url: `https://lbbc.glueup.com/ajax/organization/${orgId}/widget/membership-directory/ajax/requestInfoOverlay?type=corporate&id=${memberId}`,
      method: 'GET',
      headers: { 
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
        'X-Requested-With': 'XMLHttpRequest',
        'Accept': 'application/json, text/javascript, */*; q=0.01',
        'X-Platform': 'WIDGET',
        'Referer': `https://lbbc.glueup.com/organization/${orgId}/widget/membership-directory/corporate/`,
        'Cookie': cookies
      }
    },
    {
      url: `https://lbbc.glueup.com/organization/${orgId}/widget/membership-directory/ajax/requestInfoOverlay?type=corporate&id=${memberId}`,
      method: 'GET',
      headers: { 
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'X-Requested-With': 'XMLHttpRequest',
        'Referer': `https://lbbc.glueup.com/organization/${orgId}/widget/membership-directory/corporate/`,
        'Cookie': cookies
      }
    }
  ];

  for (const item of urls) {
    try {
      console.log('\n--- Testing URL:', item.url, '---');
      const res = await fetch(item.url, {
        method: item.method,
        agent,
        headers: item.headers,
        body: item.body
      });
      const text = await res.text();
      console.log('Status:', res.status, 'Length:', text.length);
      console.log('Response Snippet:', text.substring(0, 500));
      
      let html = text;
      try {
        const json = JSON.parse(text);
        if (json.data && json.data.value && json.data.value.wrapper) {
          html = json.data.value.wrapper;
        } else if (json.data && json.data.value && typeof json.data.value === 'string') {
          html = json.data.value;
        } else if (json.description || json.website) {
          console.log('JSON direct details found!');
          console.log('Website:', json.website);
          console.log('Description:', json.description?.substring(0, 100));
          continue;
        }
      } catch (e) {}

      if (html.includes('force-refresh')) {
        console.log('Response indicates a force-refresh/redirect.');
      }

      const $ = cheerio.load(html);
      const title = $('.title').first().text().trim() || $('h1').first().text().trim();
      const website = $('.website a').attr('href') || $('.website').text().trim();
      const description = $('.description').text().trim() || $('.about-content').text().trim() || $('.content').text().trim();
      
      console.log('Title (extracted):', title);
      console.log('Website (extracted):', website);
      console.log('Description Snippet (extracted):', description.substring(0, 100));

      if (text.toLowerCase().includes('ghattour.com')) {
        console.log('SUCCESS: found ghattour.com in the response!');
      } else {
        console.log('ghattour.com NOT found in response.');
      }
    } catch (e) {
      console.error('Error:', e.message);
    }
  }
}

testFetch();
