
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
            return [];
        }

        const data = await response.json();
        return data.results || [];
    } catch (error) {
        console.error("Failed to fetch news from NewsData:", error);
        return [];
    }
}
