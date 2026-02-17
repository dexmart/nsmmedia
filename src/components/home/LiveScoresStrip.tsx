
import { useTodayFixtures, useLiveFixtures, useRecentMatches } from "@/hooks/useFootballData";
import { Link } from "react-router-dom";

const StatusBadge = ({ match }: { match: any }) => {
  if (match.status === "LIVE" || match.status === "HT") {
    return (
      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-live uppercase">
        <span className="w-1.5 h-1.5 rounded-full bg-live animate-pulse-live" />
        {match.status === "HT" ? "HT" : (match.minute ? `${match.minute}'` : "LIVE")}
      </span>
    );
  }
  if (match.status === "FT") {
    return <span className="text-[10px] font-bold text-muted-foreground">FT</span>;
  }
  return <span className="text-[10px] font-semibold text-muted-foreground">{match.time}</span>;
};

const MatchCard = ({ match }: { match: any }) => (
  <div className="flex-shrink-0 w-[160px] bg-card rounded-lg border border-border p-3 cursor-pointer hover:border-primary/30 transition-all">
    <div className="text-[9px] font-semibold text-muted-foreground mb-2 uppercase tracking-wider">
      {match.leagueShort}
    </div>
    <div className="space-y-1.5">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 min-w-0">
          {match.homeLogo && <img src={match.homeLogo} alt="" className="w-4 h-4 object-contain" />}
          <span className="text-xs font-semibold text-foreground truncate">{match.homeTeam}</span>
        </div>
        <span className="text-xs font-bold tabular-nums text-foreground">{match.homeScore}</span>
      </div>
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 min-w-0">
          {match.awayLogo && <img src={match.awayLogo} alt="" className="w-4 h-4 object-contain" />}
          <span className="text-xs font-semibold text-foreground truncate">{match.awayTeam}</span>
        </div>
        <span className="text-xs font-bold tabular-nums text-foreground">{match.awayScore}</span>
      </div>
    </div>
    <div className="mt-2 pt-2 border-t border-border">
      <StatusBadge match={match} />
    </div>
  </div>
);

const LiveScoresStrip = () => {
  const { data: liveData, isLoading: liveLoading } = useLiveFixtures();
  const { data: todayData, isLoading: todayLoading } = useTodayFixtures();
  const { data: recentData, isLoading: recentLoading } = useRecentMatches();

  const isLoading = liveLoading && todayLoading && recentLoading;

  // Only count as "live" if matches actually have LIVE or HT status
  const actuallyLive = liveData?.filter((m: any) => m.status === "LIVE" || m.status === "HT") || [];
  const hasLive = actuallyLive.length > 0;
  const hasToday = todayData && todayData.length > 0;
  const hasRecent = recentData && recentData.length > 0;

  // Check if today's matches are all finished
  const todayAllFinished = hasToday && todayData.every((m: any) => m.status === "FT");

  // Prioritize: Live > Today > Recent
  let displayMatches = hasLive ? actuallyLive :
    hasToday ? todayData :
      hasRecent ? recentData : [];

  let title = hasLive ? "Live Now" :
    hasToday && todayAllFinished ? "Recent Matches Today" :
      hasToday ? "Today's Fixtures" :
        hasRecent ? "Recent Results" : "Fixtures";

  return (
    <section className="bg-secondary py-3">
      <div className="container">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            {hasLive ? (
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-live uppercase">
                <span className="w-2 h-2 rounded-full bg-live animate-pulse-live" />
                Live Now
              </span>
            ) : (
              <span className="text-xs font-bold text-secondary-foreground/70 uppercase">{title}</span>
            )}

            {/* Debugging indicators (Hidden in production) */}
            <div className="flex gap-1">
              {liveLoading && <span className="w-1 h-1 rounded-full bg-blue-500 animate-pulse" />}
              {todayLoading && <span className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />}
              {recentLoading && <span className="w-1 h-1 rounded-full bg-yellow-500 animate-pulse" />}
            </div>
          </div>
          <Link to="/live" className="text-[10px] font-bold text-primary hover:underline uppercase">
            View All
          </Link>
        </div>

        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1">
          {displayMatches.length > 0 ? (
            displayMatches.map((match: any) => (
              <MatchCard key={match.id} match={match} />
            ))
          ) : (
            isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex-shrink-0 w-[160px] h-20 bg-card/50 rounded-lg animate-pulse" />
              ))
            ) : (
              <div className="text-xs text-muted-foreground py-2 px-1">
                No recent matches available. Check back later.
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default LiveScoresStrip;
