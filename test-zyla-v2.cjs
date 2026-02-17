
const https = require('https');

const API_TOKEN = "12371|itLTPI1sgcE2N8BhJKdubBvtmjGjVwDsmyTjnTq5";
const HOST = "zylalabs.com";

function testEndpoint(path) {
    return new Promise((resolve) => {
        const options = {
            hostname: HOST,
            path: path,
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API_TOKEN}`,
                'Content-Type': 'application/json'
            }
        };

        console.log(`[DEBUG] Requesting ${path}...`);
        const req = https.request(options, (res) => {
            console.log(`[DEBUG] Received status: ${res.statusCode}`);
            console.log(`[DEBUG] Headers:`, JSON.stringify(res.headers));
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => {
                console.log(`[DEBUG] Raw body snippet: ${data.substring(0, 200)}`);
                try {
                    const json = JSON.parse(data);
                    resolve({ status: res.statusCode, body: json });
                } catch (e) {
                    resolve({ status: res.statusCode, body: data });
                }
            });
        });

        req.on('error', (e) => {
            console.error(`[DEBUG] Request error: ${e.message}`);
            resolve({ error: e.message });
        });
        req.end();
    });
}

async function runTests() {
    const res = await testEndpoint("/api/11305/transfer+market+free+football+players+api/21429/free+goalkeepers");
    if (res.error) console.log("FAILED:", res.error);
    else console.log("DONE. Status:", res.status);
}

runTests();
