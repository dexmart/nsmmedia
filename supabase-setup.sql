-- Run this SQL in your Supabase Dashboard > SQL Editor

-- Create admin_articles table
CREATE TABLE IF NOT EXISTS public.admin_articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  content TEXT,
  image_url TEXT,
  category TEXT NOT NULL DEFAULT 'nigeria' CHECK (category IN ('nigeria', 'africa', 'international', 'world_cup', 'transfers')),
  author TEXT DEFAULT 'NSM Media',
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.admin_articles ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read published articles
CREATE POLICY "Anyone can read published articles"
  ON public.admin_articles
  FOR SELECT
  USING (published = true);

-- Allow anyone to insert (protected by admin login in the app)
CREATE POLICY "Allow insert"
  ON public.admin_articles
  FOR INSERT
  WITH CHECK (true);

-- Allow anyone to update (protected by admin login in the app)
CREATE POLICY "Allow update"
  ON public.admin_articles
  FOR UPDATE
  USING (true);

-- Allow anyone to delete (protected by admin login in the app)
CREATE POLICY "Allow delete"
  ON public.admin_articles
  FOR DELETE
  USING (true);

-- Create index for faster category queries
CREATE INDEX idx_admin_articles_category ON public.admin_articles(category);
CREATE INDEX idx_admin_articles_published ON public.admin_articles(published);
CREATE INDEX idx_admin_articles_created_at ON public.admin_articles(created_at DESC);
