import { supabase } from "@/integrations/supabase/client";

export interface AdminArticle {
    id?: string;
    title: string;
    description: string;
    content: string;
    image_url: string;
    category: "nigeria" | "africa" | "international" | "world_cup" | "transfers";
    author: string;
    published: boolean;
    created_at?: string;
    updated_at?: string;
}

const TABLE = "admin_articles";

export async function getArticles(category?: string): Promise<AdminArticle[]> {
    let query = supabase
        .from(TABLE)
        .select("*")
        .eq("published", true)
        .order("created_at", { ascending: false });

    if (category) {
        query = query.eq("category", category);
    }

    const { data, error } = await query;
    if (error) {
        console.error("[Admin] Failed to fetch articles:", error);
        return [];
    }
    return (data || []) as AdminArticle[];
}

export async function getAllArticles(): Promise<AdminArticle[]> {
    const { data, error } = await supabase
        .from(TABLE)
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        console.error("[Admin] Failed to fetch all articles:", error);
        return [];
    }
    return (data || []) as AdminArticle[];
}

export async function createArticle(article: Omit<AdminArticle, "id" | "created_at" | "updated_at">): Promise<AdminArticle | null> {
    const { data, error } = await supabase
        .from(TABLE)
        .insert([article])
        .select()
        .single();

    if (error) {
        console.error("[Admin] Failed to create article:", error);
        return null;
    }
    return data as AdminArticle;
}

export async function updateArticle(id: string, updates: Partial<AdminArticle>): Promise<AdminArticle | null> {
    const { data, error } = await supabase
        .from(TABLE)
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq("id", id)
        .select()
        .single();

    if (error) {
        console.error("[Admin] Failed to update article:", error);
        return null;
    }
    return data as AdminArticle;
}

export async function deleteArticle(id: string): Promise<boolean> {
    const { error } = await supabase
        .from(TABLE)
        .delete()
        .eq("id", id);

    if (error) {
        console.error("[Admin] Failed to delete article:", error);
        return false;
    }
    return true;
}
