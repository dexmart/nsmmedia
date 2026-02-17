
// League IDs for football-data.org
export const LEAGUE_IDS = {
  PL: 2021,
  NPFL: 0,
  CAFCL: 2001,
  LALIGA: 2014,
  UCL: 2001,
  SERIE_A: 2019,
  LIGUE1: 2015,
} as const;

export const LEAGUE_NAMES: Record<number, string> = {
  2021: "Premier League",
  2014: "La Liga",
  2001: "Champions League",
  2019: "Serie A",
  2015: "Ligue 1",
};

const API_KEY = "c205c3b938f14c1c923907affffc7f3b";

// In production, use the PHP proxy on the same domain to bypass CORS.
// In dev mode, call the API directly (localhost is allowed by football-data.org).
const IS_DEV = import.meta.env.DEV;

async function fetchFromApi(endpoint: string, params?: Record<string, string | number>) {
  let url: URL;

  if (IS_DEV) {
    // Dev: call API directly (CORS allows localhost)
    url = new URL(`https://api.football-data.org/v4${endpoint}`);
  } else {
    // Production: route through PHP proxy on same domain
    url = new URL(`${window.location.origin}/api-proxy.php`);
    url.searchParams.append("endpoint", endpoint);
  }

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, String(value));
    });
  }

  const stableKey = `fb_stable_${endpoint.replace(/\//g, '_')}`;
  const specificKey = `fb_cache_${endpoint}_${JSON.stringify(params || {})}`;

  try {
    console.log(`[API] Fetching: ${endpoint}`, params);

    const headers: Record<string, string> = {};
    if (IS_DEV) {
      headers["X-Auth-Token"] = API_KEY;
    }

    const response = await fetch(url.toString(), { headers });

    if (!response.ok) {
      console.error(`[API] Error ${response.status}: ${response.statusText}`);
      if (response.status === 429) {
        const cached = localStorage.getItem(specificKey) || localStorage.getItem(stableKey);
        if (cached) {
          console.warn(`[API] Rate limit hit. Using cached data for ${endpoint}`);
          return JSON.parse(cached);
        }
      }
      return null;
    }

    const data = await response.json();
    console.log(`[API] Success: ${endpoint}`, { count: data.count, matches: data.matches?.length });

    const serialized = JSON.stringify(data);
    localStorage.setItem(specificKey, serialized);
    localStorage.setItem(stableKey, serialized);

    return data;
  } catch (error) {
    console.error(`[API] Network Error for ${endpoint}:`, error);
    const cached = localStorage.getItem(specificKey) || localStorage.getItem(stableKey);
    if (cached) {
      console.log(`[API] Using cached fallback for ${endpoint}`);
      return JSON.parse(cached);
    }
    return null;
  }
}

// --- Public API functions ---

export async function getFixtures(date?: string, live?: boolean, leagueId?: number) {
  const params: Record<string, string | number> = {};

  if (live) {
    params.status = "LIVE,IN_PLAY,PAUSED";
  } else if (date) {
    params.dateFrom = date;
    params.dateTo = date;
  }

  // Specific league → competition endpoint
  if (leagueId && leagueId !== 332 && leagueId !== 0) {
    const data = await fetchFromApi(`/competitions/${leagueId}/matches`, params);
    return data?.matches || [];
  }

  // All leagues → generic /matches endpoint
  const data = await fetchFromApi("/matches", params);
  return data?.matches || [];
}

export async function getStandings(leagueId: number) {
  if (leagueId === 0 || leagueId === 332) return [];

  const data = await fetchFromApi(`/competitions/${leagueId}/standings`);
  return data?.standings?.[0]?.table || [];
}

export function transformFixture(fixture: any) {
  const statusMap: Record<string, string> = {
    'IN_PLAY': 'LIVE', 'PAUSED': 'HT',
    'FINISHED': 'FT', 'SCHEDULED': 'UPCOMING',
    'TIMED': 'UPCOMING', 'CANCELED': 'FT', 'POSTPONED': 'UPCOMING',
    'SUSPENDED': 'HT', 'AWARDED': 'FT',
  };

  return {
    id: fixture.id,
    homeTeam: fixture.homeTeam.shortName || fixture.homeTeam.name,
    awayTeam: fixture.awayTeam.shortName || fixture.awayTeam.name,
    homeLogo: fixture.homeTeam.crest,
    awayLogo: fixture.awayTeam.crest,
    homeScore: fixture.score.fullTime.home ?? 0,
    awayScore: fixture.score.fullTime.away ?? 0,
    status: (statusMap[fixture.status] || 'UPCOMING') as 'LIVE' | 'HT' | 'FT' | 'UPCOMING',
    minute: fixture.minute || 0,
    time: new Date(fixture.utcDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    league: fixture.competition?.name || "Other",
    leagueShort: fixture.competition?.code || "INT",
    leagueId: fixture.competition?.id,
  };
}

export function transformStanding(standing: any) {
  const formStr = standing.form || "";
  const form = formStr.split(',').join('').split('').slice(-5).map((c: string) => c as 'W' | 'D' | 'L');
  return {
    pos: standing.position,
    team: standing.team.shortName || standing.team.name,
    teamLogo: standing.team.crest,
    p: standing.playedGames,
    w: standing.won,
    d: standing.draw,
    l: standing.lost,
    gf: standing.goalsFor,
    ga: standing.goalsAgainst,
    gd: standing.goalDifference,
    pts: standing.points,
    form,
  };
}

export async function getRecentMatches() {
  const today = new Date();
  const lastWeek = new Date();
  lastWeek.setDate(today.getDate() - 7);

  const dateFrom = lastWeek.toISOString().split('T')[0];
  const dateTo = today.toISOString().split('T')[0];

  const data = await fetchFromApi("/matches", { dateFrom, dateTo, status: "FINISHED" });
  const matches = data?.matches || [];

  console.log(`[getRecentMatches] Found ${matches.length} finished matches.`);
  return matches;
}
