
import fetch from 'node-fetch';
import https from 'https';
import * as cheerio from 'cheerio';

async function testMember() {
  const agent = new https.Agent({ rejectUnauthorized: false });
  const ids = ['2001803']; // data-id for Ahmed Ghattour & Co
  const type = 'corporate';
  const orgId = '5915';

  console.log('--- Step 1: Getting cookies ---');
  const mainRes = await fetch(`https://lbbc.glueup.com/organization/${orgId}/widget/membership-directory/${type}/`, {
    agent,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36'
    }
  });
  const cookie = mainRes.headers.get('set-cookie');
  console.log('Cookie obtained:', cookie ? 'Yes' : 'No');

  for (const id of ids) {
    console.log(`\n--- Testing Letter A View ---`);
    const url = `https://lbbc.glueup.com/organization/${orgId}/widget/membership-directory/ajax/letter/A/`;
    
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
        'X-Requested-With': 'XMLHttpRequest',
        'Accept': 'application/json, text/javascript, */*; q=0.01',
        'X-Platform': 'WIDGET',
        'Referer': `https://lbbc.glueup.com/organization/${orgId}/widget/membership-directory/${type}/`,
        'Cookie': cookie
      },
      agent
    });

    console.log('Final URL:', res.url);
    console.log('Status:', res.status);

    const text = await res.text();
    const fs = await import('fs');
    fs.writeFileSync('overlay_raw.html', text);
    console.log('Saved response to overlay_raw.html');
    
    let html = text;
    try {
      const json = JSON.parse(text);
      console.log('JSON Data Value Present:', !!(json.data && json.data.value));
      if (json.data && json.data.value && json.data.value.wrapper) {
        html = json.data.value.wrapper;
      } else if (json.data && json.data.value && typeof json.data.value === 'string') {
        html = json.data.value;
      }
    } catch(e) {
      console.log('Not a JSON response');
    }
    
    fs.writeFileSync('overlay_parsed.html', html);
    console.log('Saved parsed HTML to overlay_parsed.html');

    const $ = cheerio.load(html);
    const website = $('.website a').attr('href') || $('.website').text().trim();
    const description = $('.description').text().trim() || $('.about-content').text().trim() || $('.content').text().trim();
    const name = $('.title').text().trim() || $('h1').text().trim();

    console.log('Name:', name);
    console.log('Website:', website);
    console.log('Description Snippet:', description.substring(0, 100));
    
    if (!description && !website) {
       console.log('Raw Response (first 200 chars):', text.substring(0, 200));
    }
  }
}

testMember();
