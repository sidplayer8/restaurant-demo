const { sql } = require('@vercel/postgres');

module.exports = async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        console.log('Updating users table schema for RBAC...');

        // Add role column
        await sql`
            ALTER TABLE users 
            ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'customer'
        `;

        // Add permissions column
        await sql`
            ALTER TABLE users 
            ADD COLUMN IF NOT EXISTS permissions JSONB DEFAULT '{}'
        `;

        // Add assigned_by column
        await sql`
            ALTER TABLE users 
            ADD COLUMN IF NOT EXISTS assigned_by TEXT
        `;

        // Create index on role
        await sql`CREATE INDEX IF NOT EXISTS idx_users_role ON users(role)`;

        // Verify columns exist
        const check = await sql`
            SELECT column_name, data_type 
            FROM information_schema.columns 
            WHERE table_name = 'users'
        `;

        res.status(200).json({
            success: true,
            message: 'Users table schema updated successfully',
            columns: check.rows
        });

    } catch (error) {
        console.error('Error updating schema:', error);
        res.status(500).json({
            error: error.message,
            code: error.code
        });
    }
};
