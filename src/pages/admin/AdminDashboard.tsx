import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Trash2, Edit, Plus, LogOut } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { getAllArticles, deleteArticle, type AdminArticle } from "@/lib/adminApi";

const CATEGORY_LABELS: Record<string, string> = {
    nigeria: "Nigeria",
    africa: "Africa",
    international: "International",
    world_cup: "World Cup",
    transfers: "Transfers",
};

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [articles, setArticles] = useState<AdminArticle[]>([]);
    const [loading, setLoading] = useState(true);
    const [filterCategory, setFilterCategory] = useState<string>("");
    const [deleting, setDeleting] = useState<string | null>(null);

    useEffect(() => {
        if (sessionStorage.getItem("nsm_admin") !== "true") {
            navigate("/admin/login");
            return;
        }
        loadArticles();
    }, [navigate]);

    const loadArticles = async () => {
        setLoading(true);
        const data = await getAllArticles();
        setArticles(data);
        setLoading(false);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this article?")) return;
        setDeleting(id);
        const success = await deleteArticle(id);
        if (success) {
            setArticles(articles.filter(a => a.id !== id));
        }
        setDeleting(null);
    };

    const handleLogout = () => {
        sessionStorage.removeItem("nsm_admin");
        navigate("/admin/login");
    };

    const filtered = filterCategory
        ? articles.filter(a => a.category === filterCategory)
        : articles;

    return (
        <Layout>
            <div className="container py-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="font-display text-2xl md:text-3xl uppercase">Admin Dashboard</h1>
                        <p className="text-xs text-muted-foreground mt-1">{articles.length} total articles</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Link
                            to="/admin/new"
                            className="flex items-center gap-1.5 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors"
                        >
                            <Plus className="w-4 h-4" /> New Article
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-1.5 px-3 py-2 bg-muted text-muted-foreground rounded-lg text-sm font-semibold hover:bg-muted/80 transition-colors"
                        >
                            <LogOut className="w-4 h-4" /> Logout
                        </button>
                    </div>
                </div>

                {/* Category filter */}
                <div className="flex items-center gap-2 mb-6 overflow-x-auto scrollbar-hide">
                    <button
                        onClick={() => setFilterCategory("")}
                        className={`px-3 py-1.5 text-xs font-semibold rounded-full whitespace-nowrap transition-colors ${!filterCategory ? "bg-secondary text-secondary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
                            }`}
                    >
                        All
                    </button>
                    {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
                        <button
                            key={key}
                            onClick={() => setFilterCategory(key)}
                            className={`px-3 py-1.5 text-xs font-semibold rounded-full whitespace-nowrap transition-colors ${filterCategory === key ? "bg-secondary text-secondary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
                                }`}
                        >
                            {label}
                        </button>
                    ))}
                </div>

                {/* Articles list */}
                {loading ? (
                    <div className="space-y-3">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <div key={i} className="bg-card rounded-lg border border-border p-4 animate-pulse">
                                <div className="h-4 w-48 bg-muted rounded mb-2" />
                                <div className="h-3 w-32 bg-muted rounded" />
                            </div>
                        ))}
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-muted-foreground text-sm">No articles found.</p>
                        <Link to="/admin/new" className="text-primary text-sm hover:underline mt-2 inline-block">
                            Create your first article →
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {filtered.map((article) => (
                            <div
                                key={article.id}
                                className="bg-card rounded-lg border border-border p-4 flex items-start justify-between gap-4 hover:border-primary/30 transition-colors"
                            >
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="px-2 py-0.5 text-[10px] font-semibold bg-primary/10 text-primary rounded-full uppercase">
                                            {CATEGORY_LABELS[article.category] || article.category}
                                        </span>
                                        {!article.published && (
                                            <span className="px-2 py-0.5 text-[10px] font-semibold bg-yellow-500/10 text-yellow-600 rounded-full">Draft</span>
                                        )}
                                    </div>
                                    <h3 className="text-sm font-semibold text-foreground truncate">{article.title}</h3>
                                    <p className="text-xs text-muted-foreground truncate mt-0.5">{article.description || "No description"}</p>
                                    <p className="text-[10px] text-muted-foreground/60 mt-1">
                                        By {article.author} • {article.created_at ? new Date(article.created_at).toLocaleDateString() : "Unknown date"}
                                    </p>
                                </div>
                                <div className="flex items-center gap-1 shrink-0">
                                    <Link
                                        to={`/admin/edit/${article.id}`}
                                        className="p-2 rounded-md text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                                    >
                                        <Edit className="w-4 h-4" />
                                    </Link>
                                    <button
                                        onClick={() => article.id && handleDelete(article.id)}
                                        disabled={deleting === article.id}
                                        className="p-2 rounded-md text-muted-foreground hover:text-red-500 hover:bg-red-500/10 transition-colors disabled:opacity-50"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default AdminDashboard;
