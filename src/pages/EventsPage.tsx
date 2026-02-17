import Layout from "@/components/layout/Layout";
import { useNews } from "@/hooks/useNews";
import { useQuery } from "@tanstack/react-query";
import { getArticles, type AdminArticle } from "@/lib/adminApi";
import { Link } from "react-router-dom";

interface EventsPageProps {
    title: string;
    subtitle: string;
    query: string;
    category?: string;
    accentColor?: string;
}

const EventsPage = ({ title, subtitle, query, category, accentColor = "text-primary" }: EventsPageProps) => {
    const { data: apiArticles, isLoading: loadingApi } = useNews(query);
    const { data: adminArticles, isLoading: loadingAdmin } = useQuery({
        queryKey: ["admin_articles", category],
        queryFn: () => getArticles(category),
        enabled: !!category,
        retry: false,
    });

    const isLoading = loadingApi;

    // Normalize admin articles to match API article shape
    const normalizedAdmin = (adminArticles || []).map((a: AdminArticle) => ({
        article_id: a.id,
        title: a.title,
        link: null, // Admin articles don't have external links
        description: a.description,
        pubDate: a.created_at || new Date().toISOString(),
        image_url: a.image_url,
        source_id: a.author || "NSM Media",
        isAdmin: true,
    }));

    // Merge: admin articles first, then API articles
    const allArticles = [...normalizedAdmin, ...(apiArticles || [])];

    return (
        <Layout>
            <div className="container py-8">
                <div className="mb-6">
                    <h1 className="font-display text-2xl md:text-3xl uppercase text-foreground">
                        {title}
                    </h1>
                    <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
                </div>

                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className="bg-card rounded-lg border border-border p-4 animate-pulse">
                                <div className="h-40 bg-muted rounded mb-3" />
                                <div className="h-4 w-3/4 bg-muted rounded mb-2" />
                                <div className="h-3 w-1/2 bg-muted rounded" />
                            </div>
                        ))}
                    </div>
                ) : allArticles.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {allArticles.map((article: any) => {
                            const isAdmin = article.isAdmin;
                            const isExternal = !!article.link;

                            const cardContent = (
                                <>
                                    {article.image_url && (
                                        <div className="h-44 overflow-hidden">
                                            <img
                                                src={article.image_url}
                                                alt=""
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        </div>
                                    )}
                                    <div className="p-4">
                                        <div className="flex items-center gap-2">
                                            <span className={`text-[10px] font-bold uppercase tracking-wider ${accentColor}`}>
                                                {article.source_id}
                                            </span>
                                            {isAdmin && (
                                                <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 bg-primary/10 text-primary rounded">
                                                    NSM
                                                </span>
                                            )}
                                        </div>
                                        <h3 className="text-sm font-semibold text-foreground mt-1 line-clamp-2 group-hover:text-primary transition-colors">
                                            {article.title}
                                        </h3>
                                        {article.description && (
                                            <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{article.description}</p>
                                        )}
                                        <span className="text-[10px] text-muted-foreground mt-2 block">
                                            {new Date(article.pubDate).toLocaleDateString()}
                                        </span>
                                    </div>
                                </>
                            );

                            const cardClass = "bg-card rounded-lg border border-border overflow-hidden group hover:border-primary/30 transition-colors";

                            if (isAdmin) {
                                return (
                                    <Link key={article.article_id} to={`/story/${article.article_id}`} className={cardClass}>
                                        {cardContent}
                                    </Link>
                                );
                            }
                            if (isExternal) {
                                return (
                                    <a key={article.article_id} href={article.link} target="_blank" rel="noopener noreferrer" className={cardClass}>
                                        {cardContent}
                                    </a>
                                );
                            }
                            return <div key={article.article_id} className={cardClass}>{cardContent}</div>;
                        })}
                    </div>
                ) : (
                    <div className="text-center py-16 text-muted-foreground">
                        <p className="text-sm">No events found at the moment. Check back soon!</p>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default EventsPage;
