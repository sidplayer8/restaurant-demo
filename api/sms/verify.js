export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { phoneNumber, code } = req.body;

    if (!phoneNumber || !code) {
        return res.status(400).json({ error: 'Phone number and code are required' });
    }

    // Check stored code
    global.smsCodes = global.smsCodes || {};
    const stored = global.smsCodes[phoneNumber];

    if (!stored) {
        return res.status(400).json({ error: 'No code found for this number. Request a new code.' });
    }

    if (Date.now() > stored.expires) {
        delete global.smsCodes[phoneNumber];
        return res.status(400).json({ error: 'Code expired. Request a new code.' });
    }

    if (stored.code !== code) {
        return res.status(400).json({ error: 'Invalid code. Please try again.' });
    }

    // Code is valid!
    delete global.smsCodes[phoneNumber];
    console.log(`✅ Verified ${phoneNumber}`);
    res.status(200).json({ success: true, verified: true });
}
