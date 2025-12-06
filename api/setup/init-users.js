const { sql } = require('@vercel/postgres');

const OWNER_PERMISSIONS = {
    menu: { view: true, create: true, edit: true, delete: true },
    orders: { view: true, create: true, edit: true, delete: true, assign: true },
    users: { view: true, create: true, edit: true, delete: true },
    analytics: { view: true },
    settings: { view: true, edit: true }
};

const CHEF_PERMISSIONS = {
    menu: { view: true },
    orders: { view: true, edit: true },
    users: { view: false },
    analytics: { view: false }
};

const WAITER_PERMISSIONS = {
    menu: { view: true },
    orders: { view: true, create: true, edit: true },
    users: { view: false },
    analytics: { view: false }
};

module.exports = async function handler(req, res) {
    try {
        // Check if owner already exists
        const existingOwner = await sql`SELECT id FROM users WHERE role = 'owner' LIMIT 1`;

        if (existingOwner.rows.length > 0) {
            return res.status(200).json({
                message: 'Owner account already exists',
                ownerId: existingOwner.rows[0].id
            });
        }

        // Create owner account
        const owner = await sql`
            INSERT INTO users (display_name, role, permissions, is_active, created_by)
            VALUES ('Restaurant Owner', 'owner', ${JSON.stringify(OWNER_PERMISSIONS)}::jsonb, true, 'system')
            RETURNING id, display_name, role
        `;

        // Create sample chef account
        const chef = await sql`
            INSERT INTO users (display_name, role, permissions, is_active, created_by)
            VALUES ('Head Chef', 'chef', ${JSON.stringify(CHEF_PERMISSIONS)}::jsonb, true, 'system')
            RETURNING id, display_name, role
        `;

        // Create sample waiter account
        const waiter = await sql`
            INSERT INTO users (display_name, role, permissions, is_active, created_by)
            VALUES ('Waiter', 'waiter', ${JSON.stringify(WAITER_PERMISSIONS)}::jsonb, true, 'system')
            RETURNING id, display_name, role
        `;

        return res.status(200).json({
            message: 'Default accounts created successfully',
            accounts: {
                owner: owner.rows[0],
                chef: chef.rows[0],
                waiter: waiter.rows[0]
            },
            instructions: 'Use these IDs in the setup-auth.html page'
        });
    } catch (e) {
        return res.status(500).json({ error: e.message, stack: e.stack });
    }
};
