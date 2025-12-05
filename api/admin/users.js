const { sql } = require('@vercel/postgres');

module.exports = async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {
        // TODO: Verify requester is Owner (need to pass requester ID/Role in headers or body)
        // For now, we'll assume the client sends the requester's role or ID
        // In a real app, we'd verify the Firebase ID Token here.

        if (req.method === 'GET') {
            const { role } = req.query;
            let query;
            if (role) {
                query = await sql`SELECT id, display_name, google_email, phone_number, role, permissions, last_login FROM users WHERE role = ${role}`;
            } else {
                query = await sql`SELECT id, display_name, google_email, phone_number, role, permissions, last_login FROM users ORDER BY role, display_name`;
            }
            return res.status(200).json(query.rows);
        }

        if (req.method === 'POST') {
            const { display_name, email, phone, role, permissions, assigned_by } = req.body;

            // Basic validation
            if (!display_name || !role) {
                return res.status(400).json({ error: 'Missing required fields' });
            }

            // Create user (Note: This creates a record in our DB, but they still need to sign in with Google/Phone to link it)
            // We match by email or phone when they log in.
            const result = await sql`
                INSERT INTO users (display_name, google_email, phone_number, role, permissions, assigned_by)
                VALUES (${display_name}, ${email || null}, ${phone || null}, ${role}, ${JSON.stringify(permissions || {})}, ${assigned_by})
                RETURNING *
            `;
            return res.status(201).json(result.rows[0]);
        }

        if (req.method === 'PUT') {
            const { id, role, permissions } = req.body;
            const result = await sql`
                UPDATE users 
                SET role = ${role}, permissions = ${JSON.stringify(permissions)}
                WHERE id = ${id}
                RETURNING *
            `;
            return res.status(200).json(result.rows[0]);
        }

        if (req.method === 'DELETE') {
            const { id } = req.body;
            await sql`DELETE FROM users WHERE id = ${id}`;
            return res.status(200).json({ success: true });
        }

    } catch (error) {
        console.error('User management error:', error);
        return res.status(500).json({ error: error.message });
    }
};
