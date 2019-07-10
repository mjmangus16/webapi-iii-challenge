const express = require("express");

const router = express.Router();

const Users = require("./userDb");
const Posts = require("../posts/postDb");

router.post("/", validateUser, (req, res) => {
  const data = req.body;

  Users.insert(data)
    .then(user => {
      res
        .status(200)
        .json({ message: `${user.name} has been added to the database!` });
    })
    .catch(err => {
      res.status(400).json({ message: "Something went wrong!" });
    });
});

router.post("/:id/posts", validateUserId, validatePost, (req, res) => {
  const { id } = req.params;
  const data = {
    user_id: id,
    text: req.body.text
  };

  Posts.insert(data)
    .then(post => {
      res.status(400).json(post);
    })
    .catch(err => {
      res.status(400).json({ message: "Something went wrong!" });
    });
});

router.get("/", (req, res) => {});

router.get("/:id", validateUserId, (req, res) => {
  const { id } = req.params;
  Users.getById(id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(() => {
      res.status(400).json({ message: "Something went wrong!" });
    });
});

router.get("/:id/posts", validateUserId, (req, res) => {
  const { id } = req.params;

  Users.getUserPosts(id)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res.status(400).json({ message: "Something went wrong!" });
    });
});

router.delete("/:id", validateUserId, (req, res) => {
  const { id } = req.params;

  Users.remove(id).catch(err => {
    res.status(400).json({ message: "Something went wrong!" });
  });
});

router.put("/:id", validateUserId, (req, res) => {
  const { id } = req.params;
  const data = req.body;

  Users.update(id, data).catch(err => {
    res.status(400).json({ message: "Something went wrong!" });
  });
});

//custom middleware

function validateUserId(req, res, next) {
  const { id } = req.params;
  Users.getById(id)
    .then(user => {
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(400).json({ message: "invalid user id" });
      }
    })
    .catch(err => console.log(err));
}

function validateUser(req, res, next) {
  const data = req.body;

  if (!data) {
    res.status(400).json({ message: "missing user data" });
  } else {
    if (!data.name) {
      res.status(400).json({ message: "missing required name field" });
    } else {
      next();
    }
  }
}

function validatePost(req, res, next) {
  const data = req.body;

  if (!data) {
    res.status(400).json({ message: "missing post data" });
  } else {
    if (!data.text) {
      res.status(400).json({ message: "missing required text field" });
    } else {
      next();
    }
  }
}

module.exports = router;
