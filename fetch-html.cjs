
async function run() {
    const orgId = '5915';
    const eventId = '1670346';
    const url = `https://lbbc.glueup.com/organization/${orgId}/widget/membership-directory/ajax/requestInfoOverlay?type=corporate&id=${eventId}`;
    
    const headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
        'Referer': 'https://lbbc.glueup.com/organization/5915/widget/membership-directory/corporate/'
    };

    const res = await fetch(url, { headers });
    const text = await res.text();
    console.log(text.substring(0, 2000));
}

run();
