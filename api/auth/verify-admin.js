const { sql } = require('@vercel/postgres');

// This is a helper function, not an API endpoint itself, but can be used by other endpoints if we structure it right.
// However, Vercel Serverless Functions are isolated. 
// We will create this as an API endpoint that the frontend can call to "check my role".

module.exports = async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { uid, email, phone } = req.body;

    try {
        // Find user by UID (if already linked) or Email or Phone
        let user;

        if (uid) {
            const result = await sql`SELECT * FROM users WHERE google_id = ${uid}`;
            user = result.rows[0];
        }

        if (!user && email) {
            const result = await sql`SELECT * FROM users WHERE google_email = ${email}`;
            user = result.rows[0];
        }

        if (!user && phone) {
            const result = await sql`SELECT * FROM users WHERE phone_number = ${phone}`;
            user = result.rows[0];
        }

        if (user) {
            // If user exists but no UID linked yet, link it now (Lazy Linking)
            if (uid && !user.google_id) {
                await sql`UPDATE users SET google_id = ${uid} WHERE id = ${user.id}`;
            }

            return res.status(200).json({
                role: user.role || 'customer',
                permissions: user.permissions || {},
                is_admin: ['owner', 'chef', 'waiter'].includes(user.role)
            });
        } else {
            // User not found in DB, they are a new customer
            return res.status(200).json({
                role: 'customer',
                permissions: {},
                is_admin: false
            });
        }

    } catch (error) {
        console.error('Verify admin error:', error);
        return res.status(500).json({ error: error.message });
    }
};
