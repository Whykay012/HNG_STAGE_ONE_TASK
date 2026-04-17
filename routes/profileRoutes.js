const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');

// POST /api/profiles - Create a new profile (or return existing)
router.post('/', profileController.createProfile);

// GET /api/profiles - Get all profiles with optional filtering
router.get('/', profileController.getAllProfiles);

// GET /api/profiles/:id - Get a specific profile by UUID v7
router.get('/:id', profileController.getProfile);

// DELETE /api/profiles/:id - Delete a profile
router.delete('/:id', profileController.deleteProfile);

module.exports = router;