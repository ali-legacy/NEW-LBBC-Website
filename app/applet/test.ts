import axios from 'axios';
import * as cheerio from 'cheerio';

async function test() {
  const url = 'https://lbbc.glueup.com/organization/5915/widget/membership-directory/corporate';
  const response = await axios.get(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0'
    }
  });
  
  const $ = cheerio.load(response.data);
  const members: any[] = [];
  $('.BlockRow').each((i, el) => {
    const name = $(el).find('.title').text().trim();
    if (name) {
      const category = $(el).find('.description').text().trim() || 'Corporate Member';
      const imgEl = $(el).find('img');
      let imageStr = imgEl.attr('src');
      if (imageStr && imageStr.startsWith('/')) {
          imageStr = `https://lbbc.glueup.com${imageStr}`;
      }
      const image = imageStr || `https://picsum.photos/seed/${name.replace(/\s+/g, '')}/400/250`;
      
      const overlayUrl = $(el).attr('data-event');
      let idMatch = overlayUrl?.match(/id=(\d+)/);
      let id = idMatch ? `glueup-${idMatch[1]}` : `scrape-${i}`;
      const glueUpUrl = idMatch ? `https://lbbc.glueup.com/organization/5915/widget/membership-directory/corporate/member/${idMatch[1]}` : '#';

      members.push({
        id,
        name,
        category,
        location: 'Lithuania / UK',
        description: `Member of LBBC in the ${category} sector.`,
        website: glueUpUrl,
        image,
        glueUpUrl
      });
    }
  });

  console.log(`Found ${members.length} members.`);
  if (members.length > 0) {
    console.log(members[0]);
  }
}
test();

