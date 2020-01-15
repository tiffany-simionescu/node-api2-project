const express = require('express');
const postRouter = require('./routers/post');
const server = express();

server.use(express.json());
server.use('/api/posts', postRouter);

server.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});