
import { useStandings } from "@/hooks/useFootballData";
import { plTable } from "@/data/mockData";
import { Link } from "react-router-dom";

const FormDot = ({ result }: { result: "W" | "D" | "L" }) => {
  const colors = { W: "bg-primary", D: "bg-accent", L: "bg-live" };
  return <span className={`w-[6px] h-[6px] rounded-full ${colors[result]}`} />;
};

const PLTableWidget = () => {
  const { data: standings, isLoading } = useStandings();

  // Only use mock data if we truly have nothing and it's not loading
  const hasData = standings && standings.length > 0;
  const tableData = hasData ? standings.slice(0, 6) : (isLoading ? [] : plTable.slice(0, 6));

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <div className="px-4 py-3 border-b border-border flex items-center justify-between">
        <h3 className="font-display text-base uppercase text-foreground">Premier League</h3>
        {isLoading && <div className="w-3 h-3 border-2 border-primary border-t-transparent rounded-full animate-spin" />}
      </div>

      {isLoading && !hasData ? (
        <div className="p-4 space-y-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-5 bg-muted rounded animate-pulse" />
          ))}
        </div>
      ) : (
        <table className="w-full text-xs">
          <thead>
            <tr className="text-muted-foreground border-b border-border">
              <th className="text-left py-2 pl-4 font-semibold w-8">#</th>
              <th className="text-left py-2 font-semibold">Team</th>
              <th className="text-center py-2 font-semibold w-8">P</th>
              <th className="text-center py-2 font-semibold w-8">GD</th>
              <th className="text-center py-2 pr-4 font-semibold w-10">Pts</th>
            </tr>
          </thead>
          <tbody>
            {(tableData || []).map((team: any) => (
              <tr key={team.pos} className="border-b border-border/50 last:border-0 hover:bg-muted/50 transition-colors">
                <td className="py-2.5 pl-4 font-bold text-foreground">{team.pos}</td>
                <td className="py-2.5">
                  <div className="flex items-center gap-2">
                    {team.teamLogo && <img src={team.teamLogo} alt="" className="w-4 h-4 object-contain" />}
                    <span className="font-semibold text-foreground truncate max-w-[80px] sm:max-w-none">{team.team}</span>
                    <div className="hidden sm:flex items-center gap-0.5">
                      {team.form?.map((f: any, i: number) => (
                        <FormDot key={i} result={f} />
                      ))}
                    </div>
                  </div>
                </td>
                <td className="text-center py-2.5 text-muted-foreground">{team.p}</td>
                <td className="text-center py-2.5 font-semibold text-foreground">{team.gd > 0 ? `+${team.gd}` : team.gd}</td>
                <td className="text-center py-2.5 pr-4 font-bold text-foreground">{team.pts}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <Link
        to="/tables"
        className="block text-center text-xs font-semibold text-primary py-3 border-t border-border hover:bg-primary/5 transition-colors"
      >
        View full table →
      </Link>
    </div>
  );
};

export default PLTableWidget;
