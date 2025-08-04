// backend/routes/sessions.js
const router = require('express').Router();
const auth = require('../middleware/auth');
const Session = require('../models/Session');

// GET /sessions - Public wellness sessions
router.get('/', async (req, res) => {
    try {
        const sessions = await Session.find({ status: 'published' }).populate('userId', 'email');
        res.json(sessions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET /my-sessions - User's own sessions (draft + published)
router.get('/my-sessions', auth, async (req, res) => {
    try {
        const sessions = await Session.find({ userId: req.user });
        res.json(sessions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET /my-sessions/:id - View a single user session
router.get('/my-sessions/:id', auth, async (req, res) => {
    try {
        const session = await Session.findOne({ _id: req.params.id, userId: req.user });
        if (!session) {
            return res.status(404).json({ message: 'Session not found' });
        }
        res.json(session);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST /my-sessions/save-draft - Save or update a draft session
router.post('/save-draft', auth, async (req, res) => {
    try {
        const { id, title, tags, jsonFileUrl } = req.body;
        let session;
        if (id) {
            // Update existing session
            session = await Session.findOneAndUpdate(
                { _id: id, userId: req.user },
                { title, tags, jsonFileUrl, status: 'draft', updatedAt: Date.now() },
                { new: true }
            );
            if (!session) {
                return res.status(404).json({ message: 'Session not found or not authorized' });
            }
        } else {
            // Create new draft
            session = new Session({
                userId: req.user,
                title,
                tags,
                jsonFileUrl,
                status: 'draft'
            });
            await session.save();
        }
        res.status(200).json({ message: 'Draft saved successfully', session });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST /my-sessions/publish - Publish a session
router.post('/publish', auth, async (req, res) => {
    try {
        const { id, title, tags, jsonFileUrl } = req.body;
        let session;

        if (id) {
            // Update existing session and publish
            session = await Session.findOneAndUpdate(
                { _id: id, userId: req.user },
                { title, tags, jsonFileUrl, status: 'published', updatedAt: Date.now() },
                { new: true }
            );
            if (!session) {
                return res.status(404).json({ message: 'Session not found or not authorized' });
            }
        } else {
            // Create new session and publish
            session = new Session({
                userId: req.user,
                title,
                tags,
                jsonFileUrl,
                status: 'published'
            });
            await session.save();
        }
        res.status(200).json({ message: 'Session published successfully', session });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;