
const https = require('https');
const API_KEY = "c205c3b938f14c1c923907affffc7f3b";

function fetchMatches(path) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'api.football-data.org',
            path: '/v4' + path,
            method: 'GET',
            headers: { 'X-Auth-Token': API_KEY }
        };
        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => {
                try { resolve({ status: res.statusCode, body: JSON.parse(data) }); }
                catch (e) { resolve({ status: res.statusCode, body: data }); }
            });
        });
        req.on('error', reject);
        req.end();
    });
}

async function run() {
    const today = new Date().toISOString().split('T')[0];
    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7);
    const from = lastWeek.toISOString().split('T')[0];

    console.log(`Checking /matches from ${from} to ${today}`);
    const res = await fetchMatches(`/matches?dateFrom=${from}&dateTo=${today}`);
    console.log("Status:", res.status);

    if (res.body && res.body.matches) {
        const comps = {};
        res.body.matches.forEach(m => comps[m.competition.id] = m.competition.name);
        console.log("IDs:", Object.keys(comps).join(", "));
        console.log("Names:", Object.values(comps).join(" | "));
        console.log("Total Matches:", res.body.matches.length);
    } else {
        console.log("No data. Body:", JSON.stringify(res.body));
    }
}
run();
