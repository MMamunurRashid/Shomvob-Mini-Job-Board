const express = require('express');
const router = express.Router();
const Application = require('../models/Application');

router.post('/', async (req, res) => {
  try {
    const application = new Application(req.body);
    await application.save();
    res.status(201).json({ id: application._id });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;