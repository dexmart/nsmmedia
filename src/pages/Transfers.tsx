import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { useFreePlayers } from "@/hooks/useTransfers";

const positionFilters = ["All", "Forward", "Midfielder"];

const Transfers = () => {
  const { data: players, isLoading } = useFreePlayers();
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = activeFilter === "All"
    ? players
    : players?.filter((p) => p.position === activeFilter);

  return (
    <Layout>
      <div className="container py-6">
        <h1 className="font-display text-2xl md:text-3xl uppercase mb-1">Transfer Hub</h1>
        <p className="text-sm text-muted-foreground mb-5">Latest free agents and market values from around the world</p>

        {/* Filters */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto scrollbar-hide">
          {positionFilters.map((s) => (
            <button
              key={s}
              onClick={() => setActiveFilter(s)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-full whitespace-nowrap transition-colors ${activeFilter === s
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Transfer feed */}
          <div className="lg:col-span-2 space-y-3">
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-32 bg-card rounded-lg border border-border animate-pulse" />
              ))
            ) : (
              filtered && filtered.map((t) => (
                <div key={t.id} className="bg-card rounded-lg border border-border p-4 hover:border-primary/20 hover:shadow-sm transition-all cursor-pointer">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-primary text-primary-foreground">
                      Free Agent
                    </span>
                    <span className="text-[11px] text-muted-foreground">Since {t.without_club_since || "Recent"}</span>
                    <span className="text-[11px] font-bold text-primary ml-auto">{t.market_value}</span>
                  </div>
                  <h3 className="text-base font-semibold text-foreground mb-1">
                    {t.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Last Club: <span className="text-foreground font-medium">{t.last_club}</span>
                  </p>
                  <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                    <span>Position: <span className="text-foreground">{t.position}</span></span>
                    {t.age && <span>Age: <span className="text-foreground">{t.age}</span></span>}
                  </div>
                </div>
              ))
            )}
            {!isLoading && (!filtered || filtered.length === 0) && (
              <div className="bg-muted/30 rounded-lg p-12 text-center text-muted-foreground">
                No players found matching this filter.
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-5">
            {/* Value context */}
            <div className="bg-card rounded-lg border border-border overflow-hidden">
              <div className="px-4 py-3 border-b border-border">
                <h3 className="font-display text-base uppercase text-foreground">Highest Market Value</h3>
              </div>
              <div className="divide-y divide-border">
                {players && players
                  .filter(p => !p.market_value?.includes("thousand"))
                  .slice(0, 5)
                  .map((t) => (
                    <div key={t.id} className="px-4 py-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-foreground">{t.name}</span>
                        <span className="text-xs font-bold text-primary">{t.market_value}</span>
                      </div>
                      <p className="text-[10px] text-muted-foreground mt-0.5">
                        {t.last_club}
                      </p>
                    </div>
                  ))}
              </div>
            </div>

            {/* Market sentiment */}
            <div className="bg-secondary rounded-lg p-4">
              <h3 className="font-display text-sm uppercase text-secondary-foreground mb-3">Live Market Status</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-live mt-1.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-secondary-foreground font-semibold">Active Free Agent Window</p>
                    <p className="text-[10px] text-secondary-foreground/60">Monitoring latest movements in the global transfer market.</p>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </Layout>
  );
};

export default Transfers;
