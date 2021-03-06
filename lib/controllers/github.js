const { Router } = require('express');
const jwt = require('jsonwebtoken');
const authenticate = require('../middleware/authenticate');
const UserService = require('../services/UserService.js');

module.exports = Router()
  .get('/login', async (req, res) => {
    res.redirect(
      `https://github.com/login/oauth/authorize?client_id=${process.env.GH_CLIENT_ID}&redirect_uri=${process.env.GH_REDIRECT_URI}&scope=user`
    )
  })
  .get('/login/callback', async (req, res, next) => {

    try {

      const { code } = req.query;
      const user = await UserService.create(code);
      const userToken = jwt.sign({ ...user }, process.env.JWT_SECRET, {
        expiresIn: '86400'
      });

      res
      .cookie(process.env.COOKIE_NAME, userToken, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,
      })
      .redirect('/api/v1/posts');

    } catch (error) {
      next(error);
    }

  })
  .get('/dashboard', authenticate, async (req, res) => {
    res.json(req.user);
  })
  .delete('/sessions', (req, res) => {
    res
      .clearCookie(process.env.COOKIE_NAME)
      .json({ success: true, message: 'Signed out successfully!' });
  });
