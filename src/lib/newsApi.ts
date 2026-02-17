
const API_KEY = "pub_60751e35bbd2410ea29b3d9ff526589b";
const BASE_URL = "https://newsdata.io/api/1/latest";

export interface NewsArticle {
    article_id: string;
    title: string;
    link: string;
    description: string | null;
    pubDate: string;
    image_url: string | null;
    source_id: string;
    creator: string[] | null;
    category: string[];
}

export async function getLatestNews(query: string = "football"): Promise<NewsArticle[]> {
    const cacheKey = `news_cache_${query}`;
    const cacheTimeKey = `news_cache_time_${query}`;
    const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

    // Check if we have fresh cached data
    try {
        const cachedTime = localStorage.getItem(cacheTimeKey);
        if (cachedTime && Date.now() - parseInt(cachedTime) < CACHE_DURATION) {
            const cached = localStorage.getItem(cacheKey);
            if (cached) {
                console.log(`[News] Using cached data for "${query}"`);
                return JSON.parse(cached);
            }
        }
    } catch { /* ignore cache read errors */ }

    try {
        const url = new URL(BASE_URL);
        url.searchParams.append("apikey", API_KEY);
        url.searchParams.append("q", query);
        url.searchParams.append("country", "fr,de,ng,es,gb");
        url.searchParams.append("language", "en");
        url.searchParams.append("category", "sports");
        url.searchParams.append("removeduplicate", "1");

        const response = await fetch(url.toString());

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`NewsData Error: ${response.status}`, errorText);
            // Fall back to stale cache
            const cached = localStorage.getItem(cacheKey);
            if (cached) {
                console.warn(`[News] API error, using stale cache for "${query}"`);
                return JSON.parse(cached);
            }
            return [];
        }

        const data = await response.json();
        const results = data.results || [];

        // Save to cache
        try {
            localStorage.setItem(cacheKey, JSON.stringify(results));
            localStorage.setItem(cacheTimeKey, String(Date.now()));
        } catch { /* ignore storage full errors */ }

        return results;
    } catch (error) {
        console.error("Failed to fetch news from NewsData:", error);
        // Fall back to stale cache
        const cached = localStorage.getItem(cacheKey);
        if (cached) {
            console.warn(`[News] Network error, using stale cache for "${query}"`);
            return JSON.parse(cached);
        }
        return [];
    }
}
