const { Router } = require('express');
const Post = require('../models/Post.js')
const authenticate = require('../middleware/authenticate');

module.exports = Router()
  .post('/', async (req, res, next) => {
    console.log('_________REQ BODY___________', req.body)
      const post = await Post.insert({...req.body})
      res.json(post)
  })