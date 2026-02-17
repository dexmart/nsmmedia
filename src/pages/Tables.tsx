import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { useStandings } from "@/hooks/useFootballData";
import { LEAGUE_IDS } from "@/lib/footballApi";
import { plTable } from "@/data/mockData";

const FormDot = ({ result }: { result: "W" | "D" | "L" }) => {
  const colors = { W: "bg-primary", D: "bg-accent", L: "bg-live" };
  return <span className={`w-2 h-2 rounded-full ${colors[result]} inline-block`} />;
};

const leagueOptions = [
  { label: "Premier League", id: LEAGUE_IDS.PL },
  { label: "NPFL", id: LEAGUE_IDS.NPFL },
  { label: "La Liga", id: LEAGUE_IDS.LALIGA },
  { label: "Serie A", id: LEAGUE_IDS.SERIE_A },
  { label: "CAF CL", id: LEAGUE_IDS.CAFCL },
];

const Tables = () => {
  const [selectedLeague, setSelectedLeague] = useState<number>(LEAGUE_IDS.PL);
  const { data: standings, isLoading } = useStandings(selectedLeague);
  const [selectedTeam, setSelectedTeam] = useState<number | null>(null);


  const tableData = (standings && standings.length > 0) ? standings : []; // (selectedLeague === LEAGUE_IDS.PL ? plTable : []);

  return (
    <Layout>
      <div className="container py-6">
        <h1 className="font-display text-2xl md:text-3xl uppercase mb-5">Standings</h1>

        <div className="flex items-center gap-2 mb-6 overflow-x-auto scrollbar-hide">
          {leagueOptions.map((l) => (
            <button
              key={l.id}
              onClick={() => { setSelectedLeague(l.id); setSelectedTeam(null); }}
              className={`px-4 py-2 text-sm font-semibold rounded-lg whitespace-nowrap transition-colors ${selectedLeague === l.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-muted-foreground border border-border hover:border-primary/30"
                }`}
            >
              {l.label}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="bg-card rounded-lg border border-border p-4 space-y-3">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="h-8 bg-muted rounded animate-pulse" />
            ))}
          </div>
        ) : tableData.length > 0 ? (
          <div className="bg-card rounded-lg border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-xs text-muted-foreground border-b border-border bg-muted/30">
                    <th className="text-left py-3 pl-4 font-semibold w-10">#</th>
                    <th className="text-left py-3 font-semibold">Team</th>
                    <th className="text-center py-3 font-semibold w-10">P</th>
                    <th className="text-center py-3 font-semibold w-10 hidden sm:table-cell">W</th>
                    <th className="text-center py-3 font-semibold w-10 hidden sm:table-cell">D</th>
                    <th className="text-center py-3 font-semibold w-10 hidden sm:table-cell">L</th>
                    <th className="text-center py-3 font-semibold w-10 hidden md:table-cell">GF</th>
                    <th className="text-center py-3 font-semibold w-10 hidden md:table-cell">GA</th>
                    <th className="text-center py-3 font-semibold w-10">GD</th>
                    <th className="text-center py-3 font-semibold w-12">Pts</th>
                    <th className="text-center py-3 pr-4 font-semibold w-24 hidden lg:table-cell">Form</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((team: any) => (
                    <tr
                      key={team.pos}
                      onClick={() => setSelectedTeam(selectedTeam === team.pos ? null : team.pos)}
                      className={`border-b border-border/50 cursor-pointer transition-colors ${selectedTeam === team.pos ? "bg-primary/5" : "hover:bg-muted/30"
                        } ${team.pos <= 4 ? "border-l-2 border-l-primary" : team.pos >= (tableData.length - 2) ? "border-l-2 border-l-live" : ""}`}
                    >
                      <td className="py-3 pl-4 font-bold text-foreground">{team.pos}</td>
                      <td className="py-3 font-semibold text-foreground">
                        <div className="flex items-center gap-2">
                          {team.teamLogo && <img src={team.teamLogo} alt="" className="w-5 h-5 object-contain" />}
                          {team.team}
                        </div>
                      </td>
                      <td className="text-center py-3 text-muted-foreground">{team.p}</td>
                      <td className="text-center py-3 text-muted-foreground hidden sm:table-cell">{team.w}</td>
                      <td className="text-center py-3 text-muted-foreground hidden sm:table-cell">{team.d}</td>
                      <td className="text-center py-3 text-muted-foreground hidden sm:table-cell">{team.l}</td>
                      <td className="text-center py-3 text-muted-foreground hidden md:table-cell">{team.gf}</td>
                      <td className="text-center py-3 text-muted-foreground hidden md:table-cell">{team.ga}</td>
                      <td className="text-center py-3 font-semibold text-foreground">
                        {Number(team.gd) > 0 ? `+${team.gd}` : team.gd}
                      </td>
                      <td className="text-center py-3 font-bold text-foreground">{team.pts}</td>
                      <td className="text-center py-3 pr-4 hidden lg:table-cell">
                        <div className="flex items-center justify-center gap-1">
                          {team.form?.map((f: any, i: number) => (
                            <FormDot key={i} result={f} />
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            <p className="text-sm">No standings data available for this league.</p>
          </div>
        )}

        <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-primary rounded" /> Champions League</div>
          <div className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-live rounded" /> Relegation</div>
        </div>
      </div>
    </Layout>
  );
};

export default Tables;
