
import { useQuery } from "@tanstack/react-query";
import { getLatestNews, NewsArticle } from "@/lib/newsApi";

export function useNews(query: string = "football") {
    return useQuery({
        queryKey: ["news", query],
        queryFn: async () => {
            return await getLatestNews(query);
        },
        staleTime: 1800000, // 30 minutes – matches localStorage cache duration
    });
}
