const express = require('express');
const commentRouter = require('./comment');
const db = require('../data/db');

const router = express.Router();

router.use('/:id/comments', commentRouter);

// === END POINTS === //

// POST - /api/posts
router.post('/', (req, res) => {
  if(!req.body.title || !req.body.contents) {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    })
  }

  db.insert(req.body)
    .then(data => {
      res.status(201).json(data)
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        errorMessage: "There was an error while saving the post to the database."
      });
    })
});

// GET - /api/posts
router.get("/", (req, res) => {
  db.find(req.body)
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        errorMessage: "The posts information could not be retrieved."
      })
    })
});

// GET - /api/posts/:id
// Will not show error messages with invalid id parameter
router.get("/:id", (req, res) => {
  db.findById(req.params.id)
    .then(data => {
      if(data) {
        res.status(200).json(data);
      } else {
        res.status(404).json({
          errorMessage: "The post with the specified ID does not exist."
        })
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
          errorMessage: "The post information could not be retrieved."
        })
    })
})

// DELETE - /api/posts/:id
// PUT - /api/posts/:id

module.exports = router;