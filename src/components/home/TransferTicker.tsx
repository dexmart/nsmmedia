
import { useFreePlayers } from "@/hooks/useTransfers";
import { useNews } from "@/hooks/useNews";
import { Link } from "react-router-dom";

const TransferTicker = () => {
  const { data: players, isLoading: loadingPlayers } = useFreePlayers();
  const { data: newsItems, isLoading: loadingNews } = useNews("football transfer OR mercato");

  const isLoading = loadingPlayers || loadingNews;

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <div className="px-4 py-3 border-b border-border flex items-center justify-between">
        <h3 className="font-display text-base uppercase text-foreground">Transfer Ticker</h3>
        <Link to="/transfers" className="text-[10px] font-semibold text-primary hover:underline uppercase">
          All transfers →
        </Link>
      </div>
      <div className="divide-y divide-border min-h-[300px]">
        {isLoading ? (
          Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="px-4 py-3 animate-pulse">
              <div className="h-3 w-16 bg-muted rounded mb-2" />
              <div className="h-4 w-32 bg-muted rounded" />
            </div>
          ))
        ) : (
          <>
            {/* Live News Updates */}
            {newsItems && newsItems.slice(0, 4).map((item) => (
              <a
                key={item.article_id}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-3 hover:bg-muted/30 transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-amber-500 text-white">
                    News
                  </span>
                  <span className="text-[10px] text-muted-foreground">{new Date(item.pubDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <p className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                  {item.title}
                </p>
                <span className="text-[9px] text-muted-foreground uppercase">{item.source_id}</span>
              </a>
            ))}

            {/* Free Agent Updates */}
            {players && players.slice(0, 4).map((t) => (
              <div key={t.id} className="px-4 py-3 hover:bg-muted/30 transition-colors cursor-pointer">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-primary text-primary-foreground">
                    Free Agent
                  </span>
                  <span className="text-[10px] text-muted-foreground">Market Value: {t.market_value}</span>
                </div>
                <p className="text-xs font-semibold text-foreground">
                  {t.name}: {t.last_club} → <span className="text-primary italic">Searching...</span>
                </p>
                <span className="text-[10px] text-muted-foreground font-medium">{t.position}</span>
              </div>
            ))}

            {(!newsItems || newsItems.length === 0) && (!players || players.length === 0) && (
              <div className="px-4 py-8 text-center text-xs text-muted-foreground">
                No recent transfer activity found.
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default TransferTicker;
