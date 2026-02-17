export interface Match {
  id: number;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  status: "LIVE" | "HT" | "FT" | "UPCOMING";
  minute?: number;
  time?: string;
  league: string;
  leagueShort: string;
}

export interface TeamStanding {
  pos: number;
  team: string;
  p: number;
  w: number;
  d: number;
  l: number;
  gf: number;
  ga: number;
  gd: number;
  pts: number;
  form: ("W" | "D" | "L")[];
}

export interface NewsItem {
  id: number;
  title: string;
  summary: string;
  category: string;
  timestamp: string;
  imageUrl?: string;
  isBreaking?: boolean;
}

export interface Transfer {
  id: number;
  player: string;
  fromClub: string;
  toClub: string;
  status: "Confirmed" | "Rumor" | "Here We Go" | "Medical" | "Negotiations";
  fee?: string;
  timestamp: string;
  summary: string;
}

export const liveMatches: Match[] = [
  { id: 1, homeTeam: "Arsenal", awayTeam: "Chelsea", homeScore: 2, awayScore: 1, status: "LIVE", minute: 67, league: "Premier League", leagueShort: "PL" },
  { id: 2, homeTeam: "Enyimba", awayTeam: "Kano Pillars", homeScore: 1, awayScore: 0, status: "LIVE", minute: 34, league: "NPFL", leagueShort: "NPFL" },
  { id: 3, homeTeam: "Al Ahly", awayTeam: "Sundowns", homeScore: 0, awayScore: 0, status: "HT", league: "CAF CL", leagueShort: "CAFCL" },
  { id: 4, homeTeam: "Liverpool", awayTeam: "Man United", homeScore: 3, awayScore: 2, status: "FT", league: "Premier League", leagueShort: "PL" },
  { id: 5, homeTeam: "Rivers Utd", awayTeam: "Shooting Stars", homeScore: 0, awayScore: 0, status: "UPCOMING", time: "15:00", league: "NPFL", leagueShort: "NPFL" },
  { id: 6, homeTeam: "Barcelona", awayTeam: "Real Madrid", homeScore: 0, awayScore: 0, status: "UPCOMING", time: "20:00", league: "La Liga", leagueShort: "LAL" },
  { id: 7, homeTeam: "Man City", awayTeam: "Tottenham", homeScore: 1, awayScore: 1, status: "LIVE", minute: 82, league: "Premier League", leagueShort: "PL" },
  { id: 8, homeTeam: "Remo Stars", awayTeam: "Kwara Utd", homeScore: 2, awayScore: 1, status: "FT", league: "NPFL", leagueShort: "NPFL" },
];

export const plTable: TeamStanding[] = [
  { pos: 1, team: "Arsenal", p: 25, w: 18, d: 4, l: 3, gf: 52, ga: 18, gd: 34, pts: 58, form: ["W","W","D","W","W"] },
  { pos: 2, team: "Liverpool", p: 25, w: 17, d: 5, l: 3, gf: 55, ga: 22, gd: 33, pts: 56, form: ["W","W","W","D","W"] },
  { pos: 3, team: "Man City", p: 25, w: 16, d: 4, l: 5, gf: 50, ga: 25, gd: 25, pts: 52, form: ["W","L","W","W","D"] },
  { pos: 4, team: "Chelsea", p: 25, w: 14, d: 6, l: 5, gf: 45, ga: 28, gd: 17, pts: 48, form: ["D","W","W","L","W"] },
  { pos: 5, team: "Aston Villa", p: 25, w: 14, d: 4, l: 7, gf: 44, ga: 30, gd: 14, pts: 46, form: ["W","W","L","W","D"] },
  { pos: 6, team: "Newcastle", p: 25, w: 13, d: 5, l: 7, gf: 40, ga: 27, gd: 13, pts: 44, form: ["L","W","D","W","W"] },
  { pos: 7, team: "Brighton", p: 25, w: 12, d: 6, l: 7, gf: 42, ga: 32, gd: 10, pts: 42, form: ["W","D","W","L","W"] },
  { pos: 8, team: "Tottenham", p: 25, w: 12, d: 4, l: 9, gf: 43, ga: 35, gd: 8, pts: 40, form: ["L","W","W","D","L"] },
  { pos: 9, team: "Man United", p: 25, w: 11, d: 3, l: 11, gf: 33, ga: 35, gd: -2, pts: 36, form: ["L","L","W","W","D"] },
  { pos: 10, team: "West Ham", p: 25, w: 10, d: 5, l: 10, gf: 34, ga: 38, gd: -4, pts: 35, form: ["D","L","W","L","W"] },
  { pos: 11, team: "Bournemouth", p: 25, w: 9, d: 7, l: 9, gf: 33, ga: 35, gd: -2, pts: 34, form: ["W","D","D","L","W"] },
  { pos: 12, team: "Fulham", p: 25, w: 9, d: 6, l: 10, gf: 30, ga: 33, gd: -3, pts: 33, form: ["L","W","D","W","L"] },
  { pos: 13, team: "Wolves", p: 25, w: 9, d: 5, l: 11, gf: 31, ga: 38, gd: -7, pts: 32, form: ["W","L","L","W","D"] },
  { pos: 14, team: "Crystal Palace", p: 25, w: 8, d: 7, l: 10, gf: 28, ga: 34, gd: -6, pts: 31, form: ["D","W","L","D","L"] },
  { pos: 15, team: "Brentford", p: 25, w: 8, d: 5, l: 12, gf: 32, ga: 40, gd: -8, pts: 29, form: ["L","D","W","L","L"] },
  { pos: 16, team: "Everton", p: 25, w: 7, d: 7, l: 11, gf: 25, ga: 34, gd: -9, pts: 28, form: ["D","L","D","W","L"] },
  { pos: 17, team: "Nott'm Forest", p: 25, w: 7, d: 6, l: 12, gf: 26, ga: 38, gd: -12, pts: 27, form: ["L","W","L","D","L"] },
  { pos: 18, team: "Luton Town", p: 25, w: 5, d: 6, l: 14, gf: 24, ga: 45, gd: -21, pts: 21, form: ["L","L","D","L","W"] },
  { pos: 19, team: "Burnley", p: 25, w: 4, d: 5, l: 16, gf: 20, ga: 48, gd: -28, pts: 17, form: ["L","L","L","D","L"] },
  { pos: 20, team: "Sheffield Utd", p: 25, w: 3, d: 5, l: 17, gf: 17, ga: 55, gd: -38, pts: 14, form: ["L","L","D","L","L"] },
];

export const topStories: NewsItem[] = [
  { id: 1, title: "Osimhen Scores Brace as Napoli Crush Juventus in Serie A Thriller", summary: "Victor Osimhen was the hero again as Napoli dominated Juventus at the Diego Maradona Stadium. The Nigerian striker's clinical finishing sealed a memorable 3-1 victory.", category: "Nigeria", timestamp: "12 min ago", isBreaking: true },
  { id: 2, title: "Super Eagles Name 25-Man Squad for World Cup Qualifiers", summary: "Coach Finidi George has revealed his selection for the crucial double-header against South Africa and Benin Republic next month.", category: "Nigeria", timestamp: "1 hour ago" },
  { id: 3, title: "NPFL Title Race: Enyimba Edge Closer After Kano Pillars Win", summary: "A late Chidiebere Nwakali goal gave Enyimba all three points in a heated encounter at the Aba Township Stadium.", category: "NPFL", timestamp: "2 hours ago" },
  { id: 4, title: "Arsenal Go Top After Saka Masterclass Against Chelsea", summary: "Bukayo Saka delivered two assists as Arsenal reclaimed the Premier League summit with a convincing 2-1 victory at the Emirates.", category: "Premier League", timestamp: "3 hours ago" },
  { id: 5, title: "AFCON 2025: Morocco and Nigeria Drawn in Group of Death", summary: "The African Cup of Nations draw has produced a blockbuster group featuring the Super Eagles, Atlas Lions, and Cameroon.", category: "Africa", timestamp: "4 hours ago" },
  { id: 6, title: "Iwobi's Form Earns Fulham Star Premier League Player of the Month Nomination", summary: "Alex Iwobi has been shortlisted for the PL POTM award after a string of outstanding performances.", category: "Nigeria", timestamp: "5 hours ago" },
  { id: 7, title: "Champions League: Al Ahly Stun Sundowns to Reach Semi-Finals", summary: "The Red Devils of Cairo held firm to secure a dramatic aggregate victory over the South African champions.", category: "Africa", timestamp: "6 hours ago" },
  { id: 8, title: "Premier League Transfer Window: Every Deal Done So Far", summary: "A comprehensive roundup of every confirmed transfer in the January window as deadline day approaches.", category: "Transfers", timestamp: "7 hours ago" },
  { id: 9, title: "La Liga: Real Madrid Close Gap on Barcelona After El Clásico Draw", summary: "A fiercely contested El Clásico ended level as both sides had chances to win at the Santiago Bernabéu.", category: "World", timestamp: "8 hours ago" },
  { id: 10, title: "Ndidi Completes Move to Everton from Leicester City", summary: "Nigerian midfielder Wilfred Ndidi has signed a three-year deal with the Toffees in a £20m transfer.", category: "Nigeria", timestamp: "9 hours ago" },
];

export const transfers: Transfer[] = [
  { id: 1, player: "Victor Boniface", fromClub: "Bayer Leverkusen", toClub: "Chelsea", status: "Here We Go", fee: "€65m", timestamp: "15 min ago", summary: "Deal agreed between clubs. Personal terms settled on 5-year contract. Medical scheduled for tomorrow." },
  { id: 2, player: "Samuel Chukwueze", fromClub: "AC Milan", toClub: "Newcastle", status: "Negotiations", fee: "€35m", timestamp: "1 hour ago", summary: "Advanced talks ongoing. Newcastle pushing to finalize before the deadline." },
  { id: 3, player: "Ademola Lookman", fromClub: "Atalanta", toClub: "PSG", status: "Rumor", fee: "€50m", timestamp: "2 hours ago", summary: "Paris Saint-Germain reportedly interested in the Nigerian forward after his outstanding Serie A form." },
  { id: 4, player: "Calvin Bassey", fromClub: "Fulham", toClub: "Aston Villa", status: "Confirmed", fee: "£28m", timestamp: "3 hours ago", summary: "Villa have completed the signing of the Super Eagles defender on a four-year deal." },
  { id: 5, player: "Kelechi Iheanacho", fromClub: "Leicester City", toClub: "Sevilla", status: "Medical", timestamp: "5 hours ago", summary: "The striker is undergoing his medical in Seville ahead of a free transfer move." },
  { id: 6, player: "Moses Simon", fromClub: "Nantes", toClub: "Brighton", status: "Rumor", fee: "€18m", timestamp: "6 hours ago", summary: "Brighton have identified the Nigerian winger as a potential replacement for departing attackers." },
  { id: 7, player: "Sadiq Umar", fromClub: "Real Sociedad", toClub: "Wolves", status: "Negotiations", fee: "€22m", timestamp: "8 hours ago", summary: "Wolves are in advanced discussions for the Nigerian striker as they seek goal-scoring reinforcements." },
  { id: 8, player: "Taiwo Awoniyi", fromClub: "Nott'm Forest", toClub: "West Ham", status: "Confirmed", fee: "£18m", timestamp: "10 hours ago", summary: "West Ham have signed the Nigerian striker on a permanent deal from Nottingham Forest." },
];

export const trendingStories = [
  { id: 1, title: "Osimhen's brace sinks Juventus in 7-goal thriller", views: "125K" },
  { id: 2, title: "Super Eagles squad announced for WCQ", views: "98K" },
  { id: 3, title: "Boniface to Chelsea — HERE WE GO!", views: "87K" },
  { id: 4, title: "NPFL: Enyimba go top after matchday 20", views: "64K" },
  { id: 5, title: "AFCON 2025 group draw results", views: "52K" },
];
