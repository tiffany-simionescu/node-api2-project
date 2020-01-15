const express = require('express');
const db = require('../data/db');

const router = express.Router({
  mergeParams: true,
});

// === END POINTS === //

// POST - /api/posts/:id/comments
// GET - /api/posts/:id/comments

module.exports = router;