import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { createArticle, updateArticle, type AdminArticle } from "@/lib/adminApi";
import { supabase } from "@/integrations/supabase/client";

const CATEGORIES = [
    { value: "nigeria", label: "Nigeria" },
    { value: "africa", label: "Africa" },
    { value: "international", label: "International" },
    { value: "world_cup", label: "World Cup" },
    { value: "transfers", label: "Transfers" },
];

const AdminArticleForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditing = Boolean(id);

    const [form, setForm] = useState({
        title: "",
        description: "",
        content: "",
        image_url: "",
        category: "nigeria" as AdminArticle["category"],
        author: "NSM Media",
        published: true,
        publish_date: new Date().toISOString().split("T")[0],
    });
    const [saving, setSaving] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (sessionStorage.getItem("nsm_admin") !== "true") {
            navigate("/admin/login");
            return;
        }
        if (id) {
            loadArticle(id);
        }
    }, [id, navigate]);

    const loadArticle = async (articleId: string) => {
        setLoading(true);
        const { data, error } = await supabase
            .from("admin_articles")
            .select("*")
            .eq("id", articleId)
            .single();

        if (error || !data) {
            setError("Article not found");
            setLoading(false);
            return;
        }

        setForm({
            title: data.title || "",
            description: data.description || "",
            content: data.content || "",
            image_url: data.image_url || "",
            category: (data.category as AdminArticle["category"]) || "nigeria",
            author: data.author || "NSM Media",
            published: data.published ?? true,
            publish_date: data.created_at ? new Date(data.created_at).toISOString().split("T")[0] : new Date().toISOString().split("T")[0],
        });
        setLoading(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.title.trim()) {
            setError("Title is required");
            return;
        }

        setSaving(true);
        setError("");

        let result;
        const { publish_date, ...formData } = form;
        const payload = { ...formData, created_at: new Date(publish_date + "T12:00:00").toISOString() };
        if (isEditing && id) {
            result = await updateArticle(id, payload);
        } else {
            result = await createArticle(payload);
        }

        setSaving(false);

        if (result) {
            navigate("/admin");
        } else {
            setError("Failed to save article. Make sure the Supabase table exists.");
        }
    };

    const updateField = (field: string, value: any) => {
        setForm(prev => ({ ...prev, [field]: value }));
        setError("");
    };

    if (loading) {
        return (
            <Layout>
                <div className="container py-12 text-center">
                    <p className="text-muted-foreground">Loading article...</p>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="container py-6 max-w-2xl">
                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                    <button
                        onClick={() => navigate("/admin")}
                        className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <h1 className="font-display text-2xl uppercase">
                        {isEditing ? "Edit Article" : "New Article"}
                    </h1>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Title */}
                    <div>
                        <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Title *</label>
                        <input
                            type="text"
                            value={form.title}
                            onChange={(e) => updateField("title", e.target.value)}
                            className="w-full px-4 py-2.5 bg-card border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                            placeholder="Article title"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Description</label>
                        <textarea
                            value={form.description}
                            onChange={(e) => updateField("description", e.target.value)}
                            rows={2}
                            className="w-full px-4 py-2.5 bg-card border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                            placeholder="Brief summary of the article"
                        />
                    </div>

                    {/* Content */}
                    <div>
                        <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Content</label>
                        <textarea
                            value={form.content}
                            onChange={(e) => updateField("content", e.target.value)}
                            rows={8}
                            className="w-full px-4 py-2.5 bg-card border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-y"
                            placeholder="Full article content..."
                        />
                    </div>

                    {/* Image URL */}
                    <div>
                        <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Image URL</label>
                        <input
                            type="url"
                            value={form.image_url}
                            onChange={(e) => updateField("image_url", e.target.value)}
                            className="w-full px-4 py-2.5 bg-card border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                            placeholder="https://example.com/image.jpg"
                        />
                        {form.image_url && (
                            <img src={form.image_url} alt="Preview" className="mt-2 rounded-lg max-h-40 object-cover" onError={(e) => (e.currentTarget.style.display = "none")} />
                        )}
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Category *</label>
                        <select
                            value={form.category}
                            onChange={(e) => updateField("category", e.target.value)}
                            className="w-full px-4 py-2.5 bg-card border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                        >
                            {CATEGORIES.map(c => (
                                <option key={c.value} value={c.value}>{c.label}</option>
                            ))}
                        </select>
                    </div>

                    {/* Publish Date + Author row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Publish Date</label>
                            <input
                                type="date"
                                value={form.publish_date}
                                onChange={(e) => updateField("publish_date", e.target.value)}
                                className="w-full px-4 py-2.5 bg-card border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Author</label>
                            <input
                                type="text"
                                value={form.author}
                                onChange={(e) => updateField("author", e.target.value)}
                                className="w-full px-4 py-2.5 bg-card border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                                placeholder="Author name"
                            />
                        </div>
                    </div>

                    {/* Published toggle */}
                    <div className="flex items-center gap-3">
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={form.published}
                                onChange={(e) => updateField("published", e.target.checked)}
                                className="sr-only peer"
                            />
                            <div className="w-9 h-5 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-primary after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
                        </label>
                        <span className="text-sm text-foreground">{form.published ? "Published" : "Draft"}</span>
                    </div>

                    {error && (
                        <div className="bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2">
                            <p className="text-xs text-red-500">{error}</p>
                        </div>
                    )}

                    {/* Submit */}
                    <div className="flex items-center gap-3 pt-2">
                        <button
                            type="submit"
                            disabled={saving}
                            className="flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50"
                        >
                            <Save className="w-4 h-4" />
                            {saving ? "Saving..." : isEditing ? "Update Article" : "Create Article"}
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate("/admin")}
                            className="px-6 py-2.5 bg-muted text-muted-foreground rounded-lg text-sm font-semibold hover:bg-muted/80 transition-colors"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </Layout>
    );
};

export default AdminArticleForm;
