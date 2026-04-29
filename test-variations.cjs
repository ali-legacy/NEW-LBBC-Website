
async function run() {
    const orgId = '5915';
    // Ahmed Ghattour & Co
    const dataId = '2001803';
    const eventId = '1670346';

    const variations = [
        { url: `https://lbbc.glueup.com/ajax/organization/${orgId}/widget/membership-directory/ajax/requestInfoOverlay?type=corporate&id=${eventId}`, label: 'Original' },
        { url: `https://lbbc.glueup.com/organization/${orgId}/widget/membership-directory/ajax/requestInfoOverlay?type=corporate&id=${eventId}`, label: 'No leading ajax' },
        { url: `https://lbbc.glueup.com/ajax/organization/${orgId}/widget/membership-directory/requestInfoOverlay?type=corporate&id=${eventId}`, label: 'No middle ajax' },
        { url: `https://lbbc.glueup.com/organization/${orgId}/widget/membership-directory/requestInfoOverlay?type=corporate&id=${eventId}`, label: 'No ajax at all' },
        { url: `https://lbbc.glueup.com/ajax/organization/${orgId}/widget/membership-directory/ajax/requestInfoOverlay?type=corporate&id=${dataId}`, label: 'Using dataId' },
    ];

    const headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'application/json, text/javascript, */*; q=0.01',
        'X-Requested-With': 'XMLHttpRequest',
        'Referer': 'https://lbbc.glueup.com/organization/5915/widget/membership-directory/corporate/'
    };

    for (const v of variations) {
        console.log(`Testing ${v.label}: ${v.url}`);
        try {
            const res = await fetch(v.url, { headers });
            const json = await res.json();
            const wrapper = json.data?.value?.wrapper || '';
            if (wrapper.includes('404')) {
                console.log('Result: 404 inside JSON');
            } else if (wrapper.length > 100) {
                console.log(`Result: SUCCESS! Length: ${wrapper.length}`);
                console.log('First 200 chars:', wrapper.substring(0, 200));
            } else {
                console.log('Result: UNKNOWN/EMPTY content');
            }
        } catch (e) {
            console.log(`Result: ERROR: ${e.message}`);
        }
        console.log('---');
    }
}

run();
