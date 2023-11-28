// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');

// Create express app
const app = express();

// Add body parser middleware
app.use(bodyParser.json());

// Add CORS middleware
app.use(cors());

// Create comments object
const commentsByPostId = {};

// Create endpoint to get comments for a post
app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

// Create endpoint to create a comment for a post
app.post('/posts/:id/comments', (req, res) => {
  // Create a random id for the comment
  const commentId = randomBytes(4).toString('hex');

  // Get the comment content from the request body
  const { content } = req.body;

  // Get the comments for the post
  const comments = commentsByPostId[req.params.id] || [];

  // Add the comment to the comments array
  comments.push({ id: commentId, content });

  // Store the comments array
  commentsByPostId[req.params.id] = comments;

  // Send the comment
  res.status(201).send(comments);
});

// Listen on port 4001
app.listen(4001, () => {
  console.log('Listening on 4001');
});