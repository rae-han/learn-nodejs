const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hello, User');
})
router.get('/like', (req, res) => {
  res.send('이 코드가 더 위에 있어야 실행');
})
router.get('/:id', (req, res) => {
  console.log(req.params, req.query); // /user/123?limit=5
  res.send('Hello, User');
})

module.exports = router;