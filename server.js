const express = require("express");

const postsRouter = require("./posts/postRouter");
const usersRouter = require("./users/userRouter");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  console.log(req.method);
  console.log(req.path);
  console.log(new Date().getTime());

  next();
}

server.use(logger);

server.use("/posts", postsRouter);
server.use("/users", usersRouter);

module.exports = server;
