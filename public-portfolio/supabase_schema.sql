-- SQL Script to set up Supabase tables and storage

-- 1. Create Projects Table
CREATE TABLE public.projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    title TEXT NOT NULL,
    description TEXT,
    github_url TEXT,
    image_url TEXT
);

-- Enable RLS for Projects (Public Read)
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access on projects" ON public.projects FOR SELECT USING (true);

-- 2. Create Site Settings Table
CREATE TABLE public.site_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    profile_image_url TEXT,
    cv_url TEXT,
    privacy_policy TEXT,
    about_me TEXT
);

-- Enable RLS for Site Settings (Public Read)
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access on site_settings" ON public.site_settings FOR SELECT USING (true);

-- Insert a default settings row
INSERT INTO public.site_settings (profile_image_url, cv_url, privacy_policy, about_me) 
VALUES (NULL, NULL, 'Your Privacy Policy goes here.', 'Hello, I am a developer.');

-- 3. Set up Storage Buckets
-- Note: You might need to create these manually in the Supabase Dashboard if SQL execution doesn't support storage bucket creation directly, or use the storage schema.
INSERT INTO storage.buckets (id, name, public) VALUES ('images', 'images', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('documents', 'documents', true);

-- Enable storage policies (Public read)
CREATE POLICY "Public Access for images" ON storage.objects FOR SELECT USING (bucket_id = 'images');
CREATE POLICY "Public Access for documents" ON storage.objects FOR SELECT USING (bucket_id = 'documents');
