import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { supabase } from "@/integrations/supabase/client";
import type { AdminArticle } from "@/lib/adminApi";

const CATEGORY_LABELS: Record<string, string> = {
    nigeria: "Nigeria",
    africa: "Africa",
    international: "International",
    world_cup: "World Cup",
    transfers: "Transfers",
};

const AdminArticleView = () => {
    const { id } = useParams();
    const [article, setArticle] = useState<AdminArticle | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;
        (async () => {
            const { data, error } = await supabase
                .from("admin_articles")
                .select("*")
                .eq("id", id)
                .single();

            if (!error && data) {
                setArticle(data as AdminArticle);
            }
            setLoading(false);
        })();
    }, [id]);

    if (loading) {
        return (
            <Layout>
                <div className="container py-12 max-w-3xl">
                    <div className="animate-pulse space-y-4">
                        <div className="h-6 w-48 bg-muted rounded" />
                        <div className="h-64 bg-muted rounded-lg" />
                        <div className="h-4 w-full bg-muted rounded" />
                        <div className="h-4 w-3/4 bg-muted rounded" />
                    </div>
                </div>
            </Layout>
        );
    }

    if (!article) {
        return (
            <Layout>
                <div className="container py-12 text-center">
                    <h1 className="text-xl font-semibold text-foreground mb-2">Article Not Found</h1>
                    <p className="text-sm text-muted-foreground mb-4">This article may have been removed or doesn't exist.</p>
                    <Link to="/" className="text-primary text-sm hover:underline">← Back to Home</Link>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <article className="container py-8 max-w-3xl">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-6">
                    <Link to="/" className="hover:text-primary transition-colors">Home</Link>
                    <span>/</span>
                    <span className="text-primary font-semibold">{CATEGORY_LABELS[article.category] || article.category}</span>
                </div>

                {/* Header */}
                <header className="mb-6">
                    <div className="flex items-center gap-2 mb-3">
                        <span className="px-2.5 py-1 text-[10px] font-bold bg-primary/10 text-primary rounded-full uppercase">
                            {CATEGORY_LABELS[article.category] || article.category}
                        </span>
                        <span className="px-2 py-0.5 text-[9px] font-bold bg-primary/10 text-primary rounded">NSM Media</span>
                    </div>
                    <h1 className="font-display text-2xl md:text-3xl lg:text-4xl text-foreground leading-tight">
                        {article.title}
                    </h1>
                    {article.description && (
                        <p className="text-base text-muted-foreground mt-3 leading-relaxed">{article.description}</p>
                    )}
                    <div className="flex items-center gap-3 mt-4 text-xs text-muted-foreground">
                        <span>By <strong className="text-foreground">{article.author || "NSM Media"}</strong></span>
                        <span>•</span>
                        <span>{article.created_at ? new Date(article.created_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) : ""}</span>
                    </div>
                </header>

                {/* Image */}
                {article.image_url && (
                    <div className="rounded-xl overflow-hidden mb-8">
                        <img src={article.image_url} alt="" className="w-full h-auto max-h-[400px] object-cover" />
                    </div>
                )}

                {/* Content */}
                <div className="prose prose-sm max-w-none text-foreground leading-relaxed whitespace-pre-line">
                    {article.content}
                </div>

                {/* Footer */}
                <div className="mt-10 pt-6 border-t border-border">
                    <Link to="/" className="text-sm text-primary hover:underline font-semibold">← Back to Home</Link>
                </div>
            </article>
        </Layout>
    );
};

export default AdminArticleView;
