const { sql } = require('@vercel/postgres');

RETURNING *
    `;

    return res.status(201).json(result.rows[0]);

} else {
    return res.status(405).json({ error: 'Method not allowed' });
}
    } catch (error) {
    console.error('Error with orders:', error);
    return res.status(500).json({ error: 'Database operation failed' });
}
};
