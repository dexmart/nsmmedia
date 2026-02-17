
import { useQuery } from "@tanstack/react-query";
import { getLatestNews, NewsArticle } from "@/lib/newsApi";

export function useNews(query: string = "football") {
    return useQuery({
        queryKey: ["news", query],
        queryFn: async () => {
            return await getLatestNews(query);
        },
        staleTime: 600000, // 10 minutes
    });
}
