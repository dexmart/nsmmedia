
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
                try {
                    resolve({ status: res.statusCode, body: JSON.parse(data) });
                } catch (e) {
                    resolve({ status: res.statusCode, body: data });
                }
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

    console.log(`Checking PL (2021) from ${from} to ${today}`);
    const plRes = await fetchMatches(`/competitions/2021/matches?dateFrom=${from}&dateTo=${today}`);
    console.log("PL Status:", plRes.status);
    console.log("PL Match Count:", plRes.body.matches ? plRes.body.matches.length : 0);
    if (plRes.body.matches && plRes.body.matches.length > 0) {
        console.log("PL Latest Match:", plRes.body.matches[0].homeTeam.name, "vs", plRes.body.matches[0].awayTeam.name, "Status:", plRes.body.matches[0].status);
    }

    console.log("\nChecking Global /matches (filtered in fetch)");
    const globalRes = await fetchMatches(`/matches?dateFrom=${from}&dateTo=${today}`);
    console.log("Global Status:", globalRes.status);
    console.log("Global Total:", globalRes.body.matches ? globalRes.body.matches.length : 0);
    if (globalRes.body.matches) {
        const interested = [2021, 2014, 2019, 2015, 2001];
        const filtered = globalRes.body.matches.filter(m => interested.includes(m.competition.id));
        console.log("Interested matches in global list:", filtered.length);
    }
}

run();
