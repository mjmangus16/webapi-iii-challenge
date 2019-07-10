const express = require("express");
const Posts = require("./postDb");

const router = express.Router();

router.get("/", (req, res) => {
  Posts.get()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res.status(400).json({ message: "Something went wrong!" });
    });
});

router.get("/:id", validatePostId, (req, res) => {
  const { id } = req.params;

  Posts.getById(id)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(err => {
      res.status(400).json({ message: "Something went wrong!" });
    });
});

router.delete("/:id", validatePostId, (req, res) => {
  const { id } = req.params;

  Posts.remove(id)
    .then(() => {
      res.status(200).json({ message: "Post has been deleted" });
    })
    .catch(err => {
      res.status(400).json({ message: "Something went wrong!" });
    });
});

router.put("/:id", validatePostId, (req, res) => {
  const { id } = req.params;
  const data = req.body;

  Posts.update(id, data).catch(err => {
    res.status(400).json({ message: "Something went wrong!" });
  });
});

// custom middleware

function validatePostId(req, res, next) {
  const { id } = req.params;
  Posts.getById(id)
    .then(post => {
      if (post) {
        next();
      } else {
        res.status(400).json({ message: "invalid post id" });
      }
    })
    .catch(err => console.log(err));
}

module.exports = router;
