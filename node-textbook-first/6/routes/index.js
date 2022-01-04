const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hello Express');
});

// router.get('/abc', (req, res) => {
//   res.send('GET /abc');
// })
// router.post('/abc', (req, res) => {
//   res.send('POST /abc');
// })
// const abc = router.route('/abc');
router.route('/abc')
  .get((req, res) => {
    console.log('app', req.app);
    console.log('body', req.body);
    console.log('cokkies', req.cokkies);
    console.log('ip', req.ip);
    console.log('params', req.params);
    console.log('query', req.query);
    console.log('signedCookies', req.signedCookies);
    console.log('get', req.get);
    // console.log('get()', req.get());

    // res.send('GET /abc');
    res.locals.title = 'Express'
    res.render('main', { content: 'Express' })
  })
  .post((req, res) => {
    res.send('POST /abc')
  })

module.exports = router;