const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const url = require('url');

const { verifyToken, apiLimiter } = require('./middlewares');
const { Domain, User, Post, Hashtag } = require('../models');

const router = express.Router();

// router.use(cors({
//   credentials: true
// }))
router.use(async (req, res, next) => {
  const domain = await Domain.findOne({
    where: { host: url.parse(req.get('origin')).host },
  });

  if(domain) {
    cors({
      origin: req.get('origin'),
      credentials: true,
    })(req, res, next)
  } else {
    next();
  }
})

router.post('/token', apiLimiter, async (req, res) => {
  // 전달받은 클라이언트 비밀 키로 도메인이 등록된 것인지를 먼저 확인.
  // 등록 되지 않았다면 에러를 보내고 등록된 도메인이면 토큰을 발급해 응답한다. 

  const { clientSecret } = req.body;

  try {
    const domain = await Domain.findOne({
      where: { clientSecret },
      include: {
        model: User,
        attribute: ['nick', 'id'],
      }
    });

    if(!domain) {
      return res.status(401).json({
        code: 401,
        message: '등록되지 않은 도메인입니다. 먼저 도메인을 등록하세요.',
      });
    }

    const token = jwt.sign({
      id: domain.User.id,
      nick: domain.User.nick
    }, process.env.JWT_SECRET, {
      expiresIn: '30m',
      issuer: 'nodebird',
    });
    // sign 의 첫 번째 인수는 토큰의 내용
    // 두 번째 인수는 토큰의 비밀 키 이 비밀 키는 유출되선 안된다.
    // 세 번째 인수는 토큰의 설정

    return res.json({
      code: 200,
      message: '토큰이 발급되었습니다.',
      token,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      code: 500,
      message: '서버 에러'
    });
  }
})

router.get('/posts/my', apiLimiter, verifyToken, (req, res) => {
  Post.findAll({ where: { userId: req.decoded.id } })
    .then((posts) => {
      console.log(posts);
      res.json({
        code: 200,
        payload: posts,
      });
    })
    .catch((error) => {
      console.error(error)
      return res.status(500).json({
        code: 500,
        message: 'Server Error',
      });
    });
});

router.get('/posts/hashtag/:title', verifyToken, apiLimiter, async (req, res) => {
  try {
    const hashtag = await Hashtag.findOne({ where: { title: req.params.title } });
    if(!hashtag) {
      return res.status(404).json({
        code: 404,
        message: 'No result to search',
      });
    }
    console.log(hashtag);

    const posts = await hashtag.getPosts();

    return res.json({
      code: 200,
      payload: posts,
    })
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      message: 'Server Error'
    })
  }
})

// 토큰을 검증하는 미들웨어를 거친 후, 검증이 성공하면 토큰의 내용물을 응답하는 라우터
router.get('/test', verifyToken, apiLimiter, (req, res) => {
  console.log('req.decoded', req.decoded)
  res.json(req.decoded);
})

module.exports = router;
