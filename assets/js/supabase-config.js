// ضع بيانات مشروعك هنا. استخدم Publishable/anon key فقط؛ ممنوع وضع service_role أو secret key في المتصفح.
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
export const SUPABASE_URL = 'PASTE_SUPABASE_PROJECT_URL_HERE';
export const SUPABASE_PUBLISHABLE_KEY = 'PASTE_SUPABASE_PUBLISHABLE_KEY_HERE';
export const supabaseConfigured = SUPABASE_URL.startsWith('https://') && !SUPABASE_URL.includes('PASTE_') && !SUPABASE_PUBLISHABLE_KEY.includes('PASTE_');
export const supabase = createClient(
  supabaseConfigured ? SUPABASE_URL : 'https://placeholder.supabase.co',
  supabaseConfigured ? SUPABASE_PUBLISHABLE_KEY : 'placeholder-publishable-key',
  { auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }, global: { headers: { 'X-Client-Info': 'harfety-admin-html' } } }
);
