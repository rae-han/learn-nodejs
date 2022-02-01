const http = require('http');
const fs = require('fs').promises;
const url = require('url');
const qs = require('querystring');

const parseCookies = (cookie = '') => {
  console.log('parseCookies: ', cookie)
  return cookie
    .split(';')
    .map(v => v.split('='))
    .reduce((acc, [k, v]) => {
      acc[k.trim()] = decodeURIComponent(v);
      return acc;
    }, {});
}

const session = {}

const app = http.createServer(async (req, res) => {
  const cookies = parseCookies(req.headers.cookie);

  // /login
  if(req.url.startsWith('/login')) {
    const { query } = url.parse(req.url);
    const { name } = qs.parse(query);
    const expires = new Date();

    expires.setMinutes(expires.getMinutes() + 5);

    const uniqueInt = Date.now();
    session[uniqueInt] = {
      name,
      expires,
    }

    res.writeHead(302, {
      Location: '/',
      'Set-Cookie': `session=${uniqueInt}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`,
    });

    res.end();
  } else if (cookies.session && session[cookies.session].expires > new Date()) {
    console.log(session[cookies.session].expires, '/', new Date());
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8'});
    res.end(`${session[cookies.session].name}님 안녕하세요`);
  } else {
    try {
      const data = await fs.readFile('./cookie2.html');
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(data);
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end(error.message);
    }
  }
})

app.listen(8085, () => {
  console.log('on 8085 port');
})