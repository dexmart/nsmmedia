import { TrendingUp } from "lucide-react";
import { useNews } from "@/hooks/useNews";

const TrendingWidget = () => {
  const { data: articles, isLoading } = useNews("World Cup 2026 OR FIFA World Cup");

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <div className="px-4 py-3 border-b border-border flex items-center gap-2">
        <TrendingUp className="w-4 h-4 text-primary" />
        <h3 className="font-display text-base uppercase text-foreground">World Cup</h3>
      </div>
      <div className="divide-y divide-border">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-start gap-3 px-4 py-3 animate-pulse">
              <div className="w-6 h-5 bg-muted rounded" />
              <div className="flex-1">
                <div className="h-3 w-3/4 bg-muted rounded mb-1" />
                <div className="h-2 w-1/3 bg-muted rounded" />
              </div>
            </div>
          ))
        ) : articles && articles.length > 0 ? (
          articles.slice(0, 5).map((article: any, i: number) => (
            <a
              key={article.article_id}
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 px-4 py-3 hover:bg-muted/30 transition-colors cursor-pointer group"
            >
              <span className="text-lg font-bold text-muted-foreground/40 font-display w-6 flex-shrink-0">
                {i + 1}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-foreground line-clamp-2 leading-snug group-hover:text-primary transition-colors">
                  {article.title}
                </p>
                <span className="text-[10px] text-muted-foreground mt-0.5 block">{article.source_id}</span>
              </div>
            </a>
          ))
        ) : (
          <div className="px-4 py-6 text-center text-xs text-muted-foreground">
            No World Cup news at the moment.
          </div>
        )}
      </div>
    </div>
  );
};

export default TrendingWidget;
