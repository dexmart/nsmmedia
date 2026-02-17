
const https = require('https');

const API_KEY = "c205c3b938f14c1c923907affffc7f3b";
const options = {
    hostname: 'api.football-data.org',
    path: '/v4/matches?dateFrom=2026-02-09&dateTo=2026-02-16',
    method: 'GET',
    headers: {
        'X-Auth-Token': API_KEY
    }
};

const req = https.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        try {
            const json = JSON.parse(data);
            console.log("Count:", json.count);
            console.log("Matches:", json.matches ? json.matches.length : 0);
            if (json.matches && json.matches.length > 0) {
                // Check our specific leagues
                const interested = [2021, 2014, 2019, 2015, 2001];
                const filtered = json.matches.filter(m => interested.includes(m.competition.id));
                console.log("Interested matches count:", filtered.length);
                if (filtered.length > 0) {
                    console.log("Sample interested match:", filtered[0].competition.name, "-", filtered[0].homeTeam.name, "vs", filtered[0].awayTeam.name);
                } else {
                    console.log("No matches found for interested leagues.");
                    console.log("First match available is:", json.matches[0].competition.name, "(id:", json.matches[0].competition.id, ")");
                }
            } else {
                console.log("Body:", data.substring(0, 500));
            }
        } catch (e) {
            console.error(e);
            console.log("Raw Body:", data);
        }
    });
});

req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
});

req.end();
