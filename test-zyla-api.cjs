
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

        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => {
                try {
                    const json = JSON.parse(data);
                    resolve({ status: res.statusCode, body: json });
                } catch (e) {
                    resolve({ status: res.statusCode, body: data });
                }
            });
        });

        req.on('error', (e) => resolve({ error: e.message }));
        req.end();
    });
}

async function runTests() {
    console.log("Testing Free Goalkeepers...");
    const res = await testEndpoint("/api/11305/transfer+market+free+football+players+api/21429/free+goalkeepers");
    console.log("Status:", res.status);

    if (res.status === 200) {
        // Usually Zyla Labs returns data wrapped in a "data" or similar field, let's see
        console.log("Data Structure:", JSON.stringify(res.body, null, 2).substring(0, 1000));
    } else {
        console.log("Error Body:", res.body);
    }
}

runTests();
