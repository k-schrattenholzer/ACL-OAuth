const { Router } = require('express');
const Post = require('../models/Post.js')
const authenticate = require('../middleware/authenticate');

module.exports = Router()
  .get('/posts', async (req, res, next) => {
      const posts = Post.insert({...req.body, username: req.user.id})
      res.json(newSecret)
  })