
// Supabase Configuration
const SUPABASE_URL = 'https://xrcfvfnryassnbmbwtgi.supabase.co';
const SUPABASE_KEY = 'sb_publishable_J0eogRMmmGuRZIxF_ieizA_1P8MXnK_'; // Public Key

// Initialize Supabase Client
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

console.log("🔥 Supabase Client Initialized");
