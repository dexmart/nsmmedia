import { useQuery } from "@tanstack/react-query";
import { getFixtures, getStandings, getRecentMatches, transformFixture, transformStanding, LEAGUE_IDS } from "@/lib/footballApi";

export function useLiveFixtures() {
  return useQuery({
    queryKey: ["fixtures", "live"],
    queryFn: async () => {
      const fixtures = await getFixtures(undefined, true);
      return fixtures.map(transformFixture);
    },
    refetchInterval: 300000, // 5 minutes (was 1 minute)
    staleTime: 60000,
  });
}

export function useFixturesByDate(date: string, leagueId?: number) {
  return useQuery({
    queryKey: ["fixtures", "date", date, leagueId],
    queryFn: async () => {
      const fixtures = await getFixtures(date, false, leagueId);
      return fixtures.map(transformFixture);
    },
    staleTime: 600000, // 10 minutes
  });
}

export function useTodayFixtures() {
  const today = new Date().toISOString().split("T")[0];
  return useQuery({
    queryKey: ["fixtures", "today"],
    queryFn: async () => {
      const fixtures = await getFixtures(today);
      return fixtures.map(transformFixture);
    },
    refetchInterval: 300000, // 5 minutes
    staleTime: 60000,
  });
}

export function useStandings(leagueId: number = LEAGUE_IDS.PL) {
  return useQuery({
    queryKey: ["standings", leagueId],
    queryFn: async () => {
      const standings = await getStandings(leagueId);
      return standings.map(transformStanding);
    },
    staleTime: 1800000, // 30 minutes
  });
}
export function useRecentMatches() {
  return useQuery({
    queryKey: ["recentMatches"],
    queryFn: async () => {
      const matches = await getRecentMatches();
      return matches.map(transformFixture);
    },
    staleTime: 1800000, // 30 minutes
  });
}
