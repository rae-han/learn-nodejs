const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { Post, User } = require('../models');

const router = express.Router();

router.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.followerCount = 0;
  res.locals.followingCount = 0;
  res.locals.followerIdList = [];
  next();
})

router.get('/profile', isLoggedIn, (req, res) => {
  res.render('profile', { title: '내 정보 - NodeBird' });
})

router.get('/join', isNotLoggedIn, (req, res) => {
  res.render('join', { title: '회원가입 - NodeBird' });
})

router.get('/', async (req, res, next) => {
  try {
    const posts = await Post.findAll({
      incldue: {
        model: User,
        attributes: ['id', 'nick'],
      },
      order: [['createAt', 'DESC']],
    })

    res.render('main', {
      title: 'NodeBird',
      twits: posts,
    });
  } catch (err) {
    console.errer(err);
    next(err)
  }

  
});

module.exports = router;