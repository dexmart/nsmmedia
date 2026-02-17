
import { useNews } from "@/hooks/useNews";
import { useQuery } from "@tanstack/react-query";
import { getArticles, type AdminArticle } from "@/lib/adminApi";
import { Link } from "react-router-dom";

const CompactCard = ({ article }: { article: any }) => {
  const isAdmin = article.isAdmin;
  const isExternal = !!article.link;

  const content = (
    <>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-primary">{article.source_id}</span>
          {isAdmin && (
            <span className="text-[9px] font-bold uppercase px-1 py-0.5 bg-primary/10 text-primary rounded">NSM</span>
          )}
        </div>
        <h3 className="text-sm font-semibold leading-snug mt-0.5 group-hover:text-primary transition-colors line-clamp-2">
          {article.title}
        </h3>
        <span className="text-[11px] text-muted-foreground mt-1 block">
          {new Date(article.pubDate).toLocaleDateString()}
        </span>
      </div>
      {article.image_url && (
        <div className="w-20 h-16 rounded-md bg-muted flex-shrink-0 overflow-hidden">
          <img src={article.image_url} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
        </div>
      )}
    </>
  );

  const className = "flex gap-3 group py-3 border-b border-border last:border-0 cursor-pointer";

  if (isAdmin) {
    return <Link to={`/story/${article.article_id}`} className={className}>{content}</Link>;
  }
  if (isExternal) {
    return <a href={article.link} target="_blank" rel="noopener noreferrer" className={className}>{content}</a>;
  }
  return <div className={className}>{content}</div>;
};

const CATEGORY_MAP: Record<string, string> = {
  "Nigeria": "nigeria",
  "Premier League": "international",
  "World Soccer": "world_cup",
};

const NewsFeed = () => {
  const categories = [
    { name: "Nigeria", query: "Nigeria football" },
    { name: "Premier League", query: "Premier League" },
    { name: "World Soccer", query: "football news" }
  ];

  return (
    <div className="space-y-6">
      {categories.map((cat) => (
        <CategorySection key={cat.name} title={cat.name} query={cat.query} category={CATEGORY_MAP[cat.name]} />
      ))}
    </div>
  );
};

const CategorySection = ({ title, query, category }: { title: string; query: string; category?: string }) => {
  const { data: apiArticles, isLoading: loadingApi } = useNews(query);
  const { data: adminArticles, isLoading: loadingAdmin } = useQuery({
    queryKey: ["admin_articles_feed", category],
    queryFn: () => getArticles(category),
    enabled: !!category,
    retry: false,
  });

  const isLoading = loadingApi;

  // Normalize admin articles
  const normalizedAdmin = (adminArticles || []).map((a: AdminArticle) => ({
    article_id: a.id,
    title: a.title,
    link: null,
    description: a.description,
    pubDate: a.created_at || new Date().toISOString(),
    image_url: a.image_url,
    source_id: a.author || "NSM Media",
    isAdmin: true,
  }));

  const allArticles = [...normalizedAdmin, ...(apiArticles || [])];

  if (isLoading) {
    return (
      <section>
        <div className="h-6 w-24 bg-muted rounded mb-3 animate-pulse" />
        <div className="bg-card rounded-lg border border-border px-4 py-4 space-y-4">
          <div className="h-20 bg-muted rounded animate-pulse" />
          <div className="h-20 bg-muted rounded animate-pulse" />
        </div>
      </section>
    );
  }

  if (allArticles.length === 0) return null;

  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-display text-lg uppercase text-foreground">{title}</h2>
        <Link to="/" className="text-xs font-semibold text-primary hover:underline">
          View all →
        </Link>
      </div>
      <div className="bg-card rounded-lg border border-border px-4">
        {allArticles.slice(0, 4).map((article: any) => (
          <CompactCard key={article.article_id} article={article} />
        ))}
      </div>
    </section>
  );
};

export default NewsFeed;
