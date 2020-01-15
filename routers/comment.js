const express = require('express');
const db = require('../data/db');

const router = express.Router({
  mergeParams: true,
});

// === END POINTS === //

// POST - /api/posts/:id/comments
// Keep receiving a 500 error
router.post("/", (req, res) => {
  if(!req.body.text) {
    return res.status(400).json({
      errorMessage: "Please provide text for the comment."
    })
  }

  const payload = {
    text: req.body.text,
  }

  db.insertComment(req.params.id, payload)
    .then(data => {
      if(data) {
        res.status(201).json(data);
      } else {
        res.status(404).json({
          errorMessage: "The post with the specified ID does not exist."
        })
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        errorMessage: "There was an error while saving the comment to the database."
      })
    })
});

// GET - /api/posts/:id/comments
router.get("/", (req, res) => {
  db.findPostComments(req.params.id)
    .then(data => {
      if(data) {
        res.status(200).json(data);
      } else {
        res.status(404).json({
          message: "The post with the specified ID does not exist."
        })
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        errorMessage: "The comments information could not be retrieved."
      })
    })
});

module.exports = router;