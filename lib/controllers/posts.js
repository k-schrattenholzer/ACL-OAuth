const { Router } = require('express');
const Post = require('../models/Post.js')
const authenticate = require('../middleware/authenticate');

module.exports = Router()
  .post('/', async (req, res, next) => {
      const post = await Post.insert({...req.body})
      res.json(post)
  })
  .get('/', async (req, res, next) => {
    const posts = await Post.getAll()
    res.json(posts)
  })