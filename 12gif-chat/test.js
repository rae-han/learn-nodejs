const express = require('express');

const router = express.Router();

router.get('/socket', (req, res) => {
  console.log('Test socket');

  res.send('Test Socket');
})

module.exports = router;