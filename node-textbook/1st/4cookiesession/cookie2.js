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

const session = {};

http.createServer(async (req, res) => {
  console.log(req.headers.cookie);
  const cookies = parseCookies(req.headers.cookie); // { mycookie: 'test' }
  // 주소가 /login으로 시작하는 경우
  if (req.url.startsWith('/login')) {
    console.log('req.url', req.url)
    console.log('url', url)
    const { query } = url.parse(req.url);
    console.log('query', query)
    console.log('qs', qs)
    const { name } = qs.parse(query);
    console.log('name', name)
    console.log('new Date()', new Date())
    const expires = new Date();
    console.log('expires', expires)
    // 쿠키 유효 시간을 현재시간 + 5분으로 설정
    expires.setMinutes(expires.getMinutes() + 1);
    console.log('modified expries', expires)
    const uniqueInt = Date.now();
    console.log(uniqueInt);
    session[uniqueInt] = {
      name,
      expires
    }
    res.writeHead(302, {
      Location: '/',
      // 'Set-Cookie': `name=${encodeURIComponent(name)}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`,
      'Set-Cookie': `session=${uniqueInt}; Expires=${expires.toGMTString()}; trash=${encodeURIComponent('쓰레기')}; HttpOnly; Path=/`,
    });
    res.end();
  // name이라는 쿠키가 있는 경우
  // } else if (cookies.name) {
  } else if (cookies.session && session[cookies.session].expires > new Date()) {
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end(`${session[cookies.session].name}님 안녕하세요`);
  } else {
    try {
      const data = await fs.readFile('./cookie2.html');
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(data);
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end(err.message);
    }
  }
})
  .listen(8084, () => {
    console.log('8084번 포트에서 서버 대기 중입니다!');
  });
