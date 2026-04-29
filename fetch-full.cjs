
async function run() {
    const orgId = '5915';
    const eventId = '1670346'; // Ahmed Ghattour & Co
    const url = `https://lbbc.glueup.com/ajax/organization/${orgId}/widget/membership-directory/ajax/requestInfoOverlay?type=corporate&id=${eventId}`;
    
    const headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'application/json, text/javascript, */*; q=0.01',
        'X-Requested-With': 'XMLHttpRequest',
        'Referer': 'https://lbbc.glueup.com/organization/5915/widget/membership-directory/corporate/'
    };

    const res = await fetch(url, { headers });
    const json = await res.json();
    console.log(JSON.stringify(json, null, 2));
}

run();
