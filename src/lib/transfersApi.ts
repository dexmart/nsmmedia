
const API_TOKEN = "12371|itLTPI1sgcE2N8BhJKdubBvtmjGjVwDsmyTjnTq5";
const BASE_URL = "https://zylalabs.com/api/11305/transfer+market+free+football+players+api";

export interface FreePlayer {
    id: string;
    name: string;
    age?: string | number;
    last_club?: string;
    market_value?: string;
    without_club_since?: string;
    position: "Goalkeeper" | "Defender" | "Midfielder" | "Forward";
}

async function fetchFromZyla(endpoint: string) {
    const url = `${BASE_URL}${endpoint}`;
    console.log(`[Transfers] Requesting: ${url}`);
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API_TOKEN}`,
                'Content-Type': 'application/json'
            }
        });

        console.log(`[Transfers] Response status for ${endpoint}: ${response.status}`);

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`[Transfers] API Error Body:`, errorText);
            throw new Error(`Zyla API Error: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`[Transfers] Fetch exception for ${endpoint}:`, error);
        return null;
    }
}

export async function getFreePlayers(): Promise<FreePlayer[]> {
    console.log("[Transfers] Fetching free players from Zyla...");
    try {
        const [forwardsRes, midfieldersRes] = await Promise.all([
            fetchFromZyla("/21438/free+forwards"),
            fetchFromZyla("/21435/free+midfielders")
        ]);

        // Handle array wrapping if present
        const forwardsData = Array.isArray(forwardsRes) ? forwardsRes[0] : forwardsRes;
        const midfieldersData = Array.isArray(midfieldersRes) ? midfieldersRes[0] : midfieldersRes;

        console.log("[Transfers] Processed Data Received:", {
            forwards: forwardsData?.players?.length,
            midfielders: midfieldersData?.players?.length
        });

        const players: FreePlayer[] = [];

        const transform = (p: any, pos: FreePlayer["position"]): FreePlayer => ({
            id: `${pos}-${p.name}-${p.without_club_since || Date.now()}`,
            name: p.name,
            age: p.age,
            last_club: p.last_club || "N/A",
            market_value: p.market_value || "Free",
            without_club_since: p.without_club_since,
            position: pos
        });

        if (forwardsData?.players) {
            players.push(...forwardsData.players.map((p: any) => transform(p, "Forward")));
        }
        if (midfieldersData?.players) {
            players.push(...midfieldersData.players.map((p: any) => transform(p, "Midfielder")));
        }

        console.log("[Transfers] Final processed player count:", players.length);

        return players;
    } catch (error) {
        console.error("[Transfers] Error in getFreePlayers:", error);
        return [];
    }
}
