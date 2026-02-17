
import { useQuery } from "@tanstack/react-query";
import { getFreePlayers } from "@/lib/transfersApi";

export function useFreePlayers() {
    return useQuery({
        queryKey: ["freePlayers"],
        queryFn: getFreePlayers,
        staleTime: 3600000, // 1 hour (free agents don't change every minute)
        gcTime: 86400000,   // 24 hours
    });
}
