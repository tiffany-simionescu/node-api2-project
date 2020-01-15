const express = require('express');
const db = require('../data/db');

const router = express.Router({
  mergeParams: true,
});

// === END POINTS === //

// POST - /api/posts/:id/comments
// POST is working, but I can't GET the new Comment
router.post("/", (req, res) => {
  const newComment = req.body;
  db.insertComment(newComment);

  const ID = req.params.id;

  if (newComment.length === 0) {
    res.status(404).json({
      message: "The post with the specific ID does not exist"
    });
  }

  db.findById(ID)
    .then(newCom => {
       if (!newCom) {
        res.status(400).json({
          errorMessage: "Please provide text for the comment"
        });
      } else {
        res.status(201).json({ newCom });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        errorMessage: "There was an error while saving the post to the database"
      });
    });
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