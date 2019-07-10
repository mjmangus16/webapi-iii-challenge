const express = "express";

const postsRouter = require("./posts/postRouter");
const usersRouter = require("./users/userRouter");

const server = express();

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {}

server.use("/posts", postsRouter);
server.user("/users", usersRouter);

module.exports = server;
