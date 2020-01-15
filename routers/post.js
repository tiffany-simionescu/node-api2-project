const express = require('express');
const commentRouter = require('./comment');
const db = require('../data/db');

const router = express.Router();

router.use('/:id/comments', commentRouter);

// === END POINTS === //

// POST - /api/posts
// GET - /api/posts
// GET - /api/posts/:id
// DELETE - /api/posts/:id
// PUT - /api/posts/:id

module.exports = router;