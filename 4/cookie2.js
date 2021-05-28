const http = require('http');
const fs = require('fs').promises;
const url = require('url');
const qs = require('querystring');

const parseCookies = (cookie = '') => 
  cookie
    .split(';')
    .map(v => v.split('='))
    .reduce((acc, [k, v]) => {
      acc[k.trim()] = decodeURIComponent(v);
      return acc;
    }, {});

http.createServer(async (req, res) => {
  const cookies = parseCookies(req.headers.cookie)

  if(req.url.startsWith('/login')) {
    const query = url.parse(req.url);
    const { name } = qs.parse(query);
    const expires = new Date();

    expires.setMinutes(expries.getMinutes() + 5);
    res.writeHead(302, {
      Location: '/',
      'Set-Cookie': `name=${encodeURIComponent(name)}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`
    });
    res.end();
  }
}).listen(8084, () => {
  console.log('on 8084')
})
