
async function run() {
    const orgId = '5915';
    const eventId = '1670346';
    const urls = [
        `https://lbbc.glueup.com/membership-directory/corporate/${eventId}/`,
        `https://lbbc.glueup.com/organization/${orgId}/membership-directory/corporate/${eventId}/`,
        `https://lbbc.glueup.com/organization/${orgId}/members/corporate/${eventId}/`
    ];
    
    for (const url of urls) {
        console.log(`Testing: ${url}`);
        const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
        console.log(`Status: ${res.status}`);
        if (res.ok) {
            const text = await res.text();
            console.log(`Title: ${text.match(/<title>(.*?)<\/title>/)?.[1]}`);
        }
        console.log('---');
    }
}

run();
