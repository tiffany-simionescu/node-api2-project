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
router.get("/:id", (req, res) => {
  const ID = req.params.id;

  db.findById(ID)
    .then(data => {
      if(data.length < 1) {
        res.status(404).json({
          errorMessage: "The post with the specified ID does not exist."
        })
      } else {
        res.status(200).json(data);
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
router.delete("/:id", (req, res) => {
  db.remove(req.params.id)
    .then(count => {
      if(count > 0) {
        res.status(200).json({
          message: "The post has been deleted from the database."
        })
      } else {
        res.status(404).json({
          errorMessage: "The post with the specified ID does not exist."
        })
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        errorMessage: "The post could not be removed."
      })
    })
});

// PUT - /api/posts/:id
router.put("/:id", (req, res) => {
  const changes = req.body;
  if(!req.body.title || !req.body.contents) {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    })
  }

  db.update(req.params.id, changes)
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
        errorMessage: "The post information could not be modified."
      })
    })
});

module.exports = router;