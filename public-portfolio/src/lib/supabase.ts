import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Project = {
  id: string;
  title: string;
  description: string;
  github_url: string;
  image_url: string;
};

export type SiteSettings = {
  id: string;
  profile_image_url: string;
  cv_url: string;
  privacy_policy: string;
  about_me: string;
};
