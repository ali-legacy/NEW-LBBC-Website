
async function run() {
    const url = 'https://lbbc.glueup.com/organization/5915/members/corporate/';
    const headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    };
    const res = await fetch(url, { headers });
    const text = await res.text();
    console.log(`Status: ${res.status}`);
    console.log(`Length: ${text.length}`);
    console.log(text.substring(0, 1000));
}
run();
