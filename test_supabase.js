const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://xrcfvfnryassnbmbwtgi.supabase.co';
const SUPABASE_KEY = 'sb_publishable_ltaNA7nnVozoSCOcZIjg';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function testFetch() {
    console.log("Testing Supabase Connection...");
    try {
        const { data, error } = await supabase
            .from('menu_items')
            .select('*');

        if (error) {
            console.error("❌ Error fetching data:", error);
        } else {
            console.log("✅ Data fetched successfully. Count:", data.length);
            if (data.length === 0) {
                console.log("⚠️ Table is empty.");
            } else {
                console.log("Sample item:", data[0]);
            }
        }
    } catch (e) {
        console.error("❌ Unexpected error:", e);
    }
}

testFetch();
