const { sql } = require('@vercel/postgres');

module.exports = async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    const { method, body } = req;

    try {
        if (method === 'POST') {
            // Check for DB Setup flag
            if (body && body.setup_db === true) {
                try {
                    await sql`
                        CREATE TABLE IF NOT EXISTS users (
                            id SERIAL PRIMARY KEY,
                            phone_number TEXT UNIQUE,
                            google_email TEXT UNIQUE,
                            google_id TEXT UNIQUE,
                            display_name TEXT NOT NULL,
                            avatar_url TEXT,
                            role TEXT DEFAULT 'customer',
                            permissions JSONB DEFAULT '{}',
                            assigned_by TEXT,
                            created_at TIMESTAMP DEFAULT NOW(),
                            last_login TIMESTAMP DEFAULT NOW()
                        )
                    `;
                    await sql`CREATE INDEX IF NOT EXISTS idx_users_phone ON users(phone_number)`;
                    await sql`CREATE INDEX IF NOT EXISTS idx_users_google_id ON users(google_id)`;
                    await sql`CREATE INDEX IF NOT EXISTS idx_users_email ON users(google_email)`;
                    await sql`CREATE INDEX IF NOT EXISTS idx_users_role ON users(role)`;

                    // Ensure columns exist (idempotent)
                    try { await sql`ALTER TABLE users ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'customer'`; } catch (e) { }
                    try { await sql`ALTER TABLE users ADD COLUMN IF NOT EXISTS permissions JSONB DEFAULT '{}'`; } catch (e) { }
                    try { await sql`ALTER TABLE users ADD COLUMN IF NOT EXISTS assigned_by TEXT`; } catch (e) { }

                    return res.status(200).json({ message: 'DB Setup Complete' });
                } catch (e) {
                    return res.status(500).json({ error: e.message });
                }
            }

            // Add new item
            const { name, description, price, category, image, allergens } = body;
            const result = await sql`
        INSERT INTO menu_items (name, description, price, category, image, allergens, options)
        VALUES (${name}, ${description}, ${price}, ${category}, ${image}, ${allergens || []}, ARRAY[]::TEXT[])
        RETURNING *
      `;
            return res.status(201).json(result.rows[0]);

        } else if (method === 'PUT') {
            // Update item
            const { id, name, description, price, category, image, allergens } = body;
            const result = await sql`
        UPDATE menu_items 
        SET name = ${name}, description = ${description}, price = ${price}, 
            category = ${category}, image = ${image}, allergens = ${allergens || []}
        WHERE id = ${id}
        RETURNING *
      `;
            return res.status(200).json(result.rows[0]);

        } else if (method === 'DELETE') {
            // Delete item
            const { id } = body;
            await sql`DELETE FROM menu_items WHERE id = ${id}`;
            return res.status(200).json({ message: 'Item deleted successfully' });

        } else {
            return res.status(405).json({ error: 'Method not allowed' });
        }
    } catch (error) {
        console.error('Error managing menu items:', error);
        return res.status(500).json({ error: 'Database operation failed' });
    }
};
