import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { useFixturesByDate, useLiveFixtures, useRecentMatches } from "@/hooks/useFootballData";

const leagueFilters = [
  { label: "All", value: undefined },
  { label: "PL", value: 2021 },
  { label: "La Liga", value: 2014 },
  { label: "UCL", value: 2001 },
  { label: "Serie A", value: 2019 },
  { label: "Ligue 1", value: 2015 },
];

const StatusBadge = ({ match }: { match: any }) => {
  if (match.status === "LIVE") {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-bold text-live">
        <span className="w-1.5 h-1.5 rounded-full bg-live animate-pulse-live" />
        {match.minute}'
      </span>
    );
  }
  if (match.status === "HT") return <span className="text-xs font-bold text-accent">HT</span>;
  if (match.status === "FT") return <span className="text-xs font-bold text-muted-foreground">FT</span>;
  return <span className="text-xs font-semibold text-muted-foreground">{match.time}</span>;
};

const getDateString = (offset: number) => {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return d.toISOString().split("T")[0];
};

const LiveScores = () => {
  const [activeTab, setActiveTab] = useState<"today" | "recent">("today");
  const [selectedLeague, setSelectedLeague] = useState<number | undefined>(undefined);

  const date = getDateString(0);
  const { data: liveData } = useLiveFixtures();

  // Fetch each league individually to avoid free-tier API limitations  
  const allLeagueIds = leagueFilters.filter(l => l.value).map(l => l.value!);
  const leagueQueries = allLeagueIds.map(id => useFixturesByDate(date, id));
  const loadingToday = leagueQueries.some(q => q.isLoading);

  // Merge all league fixtures
  const allTodayFixtures = leagueQueries.flatMap(q => q.data || []);

  const { data: recentMatches, isLoading: loadingRecent } = useRecentMatches();

  // Build today's matches: merge live + scheduled
  let todayMatches: any[] = [];
  if (liveData?.length) {
    const liveIds = new Set(liveData.map((m: any) => m.id));
    const nonLive = allTodayFixtures.filter((m: any) => !liveIds.has(m.id));
    todayMatches = [...liveData, ...nonLive];
  } else {
    todayMatches = allTodayFixtures;
  }

  let matches = activeTab === "today" ? todayMatches : (recentMatches || []);

  // Apply league filter client-side (only for Today tab)
  if (selectedLeague && activeTab === "today") {
    matches = matches.filter((m: any) => m.leagueId === selectedLeague);
  }

  const isLoading = activeTab === "today" ? loadingToday : loadingRecent;

  // Group by league (filter out undefined/null league names)
  const grouped = matches.reduce<Record<string, any[]>>((acc, m) => {
    const leagueName = m.league || m.leagueShort || "Other";
    (acc[leagueName] = acc[leagueName] || []).push(m);
    return acc;
  }, {});

  return (
    <Layout>
      <div className="container py-6">
        <h1 className="font-display text-2xl md:text-3xl uppercase mb-5">Live Scores</h1>

        {/* Tabs: Today / Recent Results */}
        <div className="flex items-center gap-2 mb-4">
          {[
            { label: "Today", value: "today" as const },
            { label: "Recent Results", value: "recent" as const },
          ].map((tab) => (
            <button
              key={tab.value}
              onClick={() => { setActiveTab(tab.value); if (tab.value === "recent") setSelectedLeague(undefined); }}
              className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${activeTab === tab.value
                ? "bg-primary text-primary-foreground"
                : "bg-card text-muted-foreground border border-border hover:border-primary/30"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* League filter - only show on Today tab */}
        {activeTab === "today" && (
          <div className="flex items-center gap-2 mb-6 overflow-x-auto scrollbar-hide">
            {leagueFilters.map((l) => (
              <button
                key={l.label}
                onClick={() => setSelectedLeague(l.value)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-full whitespace-nowrap transition-colors ${selectedLeague === l.value
                  ? "bg-secondary text-secondary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
              >
                {l.label}
              </button>
            ))}
          </div>
        )}

        {isLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-card rounded-lg border border-border p-4">
                <div className="h-4 w-32 bg-muted rounded animate-pulse mb-3" />
                {Array.from({ length: 3 }).map((_, j) => (
                  <div key={j} className="h-10 bg-muted/50 rounded animate-pulse mb-2" />
                ))}
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(grouped).map(([league, leagueMatches]) => (
              <section key={league}>
                <h2 className="font-display text-sm uppercase text-muted-foreground mb-3 tracking-wider">{league}</h2>
                <div className="bg-card rounded-lg border border-border divide-y divide-border overflow-hidden">
                  {leagueMatches.map((match: any) => (
                    <div key={match.id} className="flex items-center px-4 py-3 hover:bg-muted/30 transition-colors cursor-pointer">
                      <div className="flex-1 text-right flex items-center justify-end gap-2">
                        <span className="text-sm font-semibold text-foreground">{match.homeTeam}</span>
                        {match.homeLogo && <img src={match.homeLogo} alt="" className="w-5 h-5 object-contain" />}
                      </div>
                      <div className="w-24 flex items-center justify-center gap-2 mx-4">
                        {match.status === "UPCOMING" ? (
                          <span className="text-sm font-semibold text-muted-foreground">{match.time}</span>
                        ) : (
                          <>
                            <span className="text-lg font-bold text-foreground tabular-nums">{match.homeScore}</span>
                            <span className="text-muted-foreground text-xs">-</span>
                            <span className="text-lg font-bold text-foreground tabular-nums">{match.awayScore}</span>
                          </>
                        )}
                      </div>
                      <div className="flex-1 flex items-center gap-2">
                        {match.awayLogo && <img src={match.awayLogo} alt="" className="w-5 h-5 object-contain" />}
                        <span className="text-sm font-semibold text-foreground">{match.awayTeam}</span>
                      </div>
                      <div className="w-14 text-right">
                        <StatusBadge match={match} />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ))}

            {Object.keys(grouped).length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <p className="text-sm">
                  {activeTab === "today" ? "No fixtures found for today." : "No recent results available."}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default LiveScores;
