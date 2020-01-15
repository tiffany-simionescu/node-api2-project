const express = require('express');
const db = require('../data/db');

const router = express.Router({
  mergeParams: true,
});

// === END POINTS === //

// POST - /api/posts/:id/comments
router.post("/", (req, res) => {
  const id = req.params.id
  const text = req.body.text

  const comment = {
      text: text,
      post_id: id
  }

  if (!text) {
    res.status(400).json({ 
      errorMessage: "Please provide text for the comment." 
    })
  } else {
    db.insertComment(comment)
      .then(response => {
        if (response.length < 1) {
          res.status(404).json({ 
            message: "The post with the specified ID does not exist." 
          })
        } else {
          res.status(201).json({ 
            message: "Your comment has been posted.",
            post: comment
          })
        }
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({ 
          error: "There was an error while saving the comment to the database." 
        })
      })
  }
})

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
        error: "The comments information could not be retrieved."
      })
    })
});

module.exports = router;