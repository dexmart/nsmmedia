
const https = require('https');
const API_KEY = "50400d8bd7msh787eba4d4c1921cp1847f6jsn5c16700d3a18";
const HOST = "football-transfer-news.p.rapidapi.com";

function test(path) {
    return new Promise((resolve) => {
        https.get({
            hostname: HOST,
            path: path,
            headers: { 'x-rapidapi-host': HOST, 'x-rapidapi-key': API_KEY }
        }, (res) => {
            let d = '';
            res.on('data', (c) => d += c);
            res.on('end', () => {
                console.log(`Path: ${path} | Status: ${res.statusCode}`);
                if (res.statusCode === 200) {
                    try {
                        const json = JSON.parse(d);
                        console.log(`  Count: ${json.length}`);
                        if (json.length > 0) console.log(`  First item title: ${json[0].title}`);
                    } catch (e) { console.log(`  Body (first 100): ${d.substring(0, 100)}`); }
                }
                resolve();
            });
        });
    });
}

async function run() {
    await test("/");
    await test("/transfer-news/club/Arsenal");
    await test("/transfer-news/club/Chelsea");
    await test("/transfer-news/club/Manchester%20United");
}
run();
