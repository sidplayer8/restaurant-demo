const { sql } = require('@vercel/postgres');

module.exports = async function handler(req, res) {
    try {
        // Step 1: Check if table exists
        const tableCheck = await sql`SELECT to_regclass('users')`;
        if (!tableCheck.rows[0].to_regclass) {
            return res.status(400).json({ error: 'Users table does not exist' });
        }

        // Step 2: Add role column
        try {
            await sql`ALTER TABLE users ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'customer'`;
        } catch (e) {
            console.error('Role column error:', e);
            // Continue, maybe it exists
        }

        // Step 3: Add permissions column
        try {
            await sql`ALTER TABLE users ADD COLUMN IF NOT EXISTS permissions JSONB DEFAULT '{}'`;
        } catch (e) {
            console.error('Permissions column error:', e);
        }

        // Step 4: Add assigned_by column
        try {
            await sql`ALTER TABLE users ADD COLUMN IF NOT EXISTS assigned_by TEXT`;
        } catch (e) {
            console.error('Assigned_by column error:', e);
        }

        res.status(200).json({ success: true, message: 'Migration attempted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
