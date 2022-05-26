# 4. http 모듈로 서버 만들기

# 4.1. 요청과 응답 이해하기

서버는 클라이언트가 있기에 동작한다. 클라이언트에서 서버로 요청(request)을 보내고, 서버에서는 요청의 내용을 읽고 처리한 뒤 클라이언트아 응답(response)을 보낸다.

따라서 서버에는 요청을 받는 부분과 응답을 보내는 부분이 있어야한다. 요청과 응답은 이벤트 방식이라 생각하면 된다. 요청이 왔을 때 어떤 작업을 수행할지 이벤트 리스너를 미리 등록해 둬야한다.

```jsx
const http = require('http');

http.createServer((req, res) => {
  // 어떻게 응답할지 적는다.  
})
```

http 서버가 있어야 웹 브라우저의 요청을 처리할 수 있으므로 http 모듈을 사용해야 한다. http 모듈에는 createServer 메소드가 있는데, 인수로 요청에 대한 콜백 함수를 넣을 수 있으며, 요청이 들어올 때마다 매번 콜백 함수가 실행된다.

createServer의 콜백 함수에는 req(request)와 res(response) 매개 변수가 들어오며, req 객체는 요청에 관한 정보들을, res 객체는 응답에 관한 정보를 담고 있다.

위 코드로는 요청에 대한 응답도 없고 서버와 연결하지도 않았기 때문에 아무 일도 일어나지 않는다.

createServer 메서드 뒤에 listen 메서드를 붙이고 클라이언트에 공개할 포트 번호와 연결 완료 후 실행될 콜백 함수를 넣으면 아래와 같다.

```jsx
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.write('<h1>Hello Node!</h1>');
  res.end('<p>Hello Server!</p>');
});

server.listen(8080, () => {
  console.log('running server on port 8080');
});
```

res 객체에 있는 writeHead, write, end 메서드를 사용했다. 
writeHead는 응답에 대한 정보를 기록하는 메서드로 첫 번째 인수로 성공적인 요청을 의미하는 200을, 두 번째 인수로 응답에 대한 정보를 보내는데 콘텐츠 형식이 HTML임을 알리고 있다. 추가로 한글 표시를 위해 charset 속성을 지정해줬다.
write 메서드의 첫 번째 인수는 클라이언트로 보낼 데이터이다. 예제 코드에서는 HTML 모양의 문자열을 보냈지만 버퍼를 보낼 수도 있고, 여러 번 호출해서 데이터를 여러 개 보내도 된다. 데이터가 기록되는 부분을 본문(Body)라 부른다.
end는 응답을 종료하는 메서드이다. 만약 인수가 있다면 그 데이터도 클라이언트로 보내고 응답을 종료한다. 따러서 위 예제는 write와 end에서 각각 문자열을 클라이언트로 보낸 후 응답이 종료되고 브라우저는 응답 내용을 받아서 렌더링한다.

추가로 listen 메서드에 바로 콜백 함수를 넣는 대신, listening 이벤트 리스너를 붙여도 된다.

```jsx
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.write('<h1>Hello Node!</h1>');
  res.end('<p>Hello Server!</p>');
});

server.listen(8080);

server.on('listening', () => {
  console.log('8080번 포트에서 서버 대기 중입니다.');
})
server.on('error', (error) => {
  console.error(error)
})
```

<aside>
💡 localhost와 포트란?

[l](http://localhost)ocalhost는 현재 컴퓨터의 내부 주소를 가리킨다. 외부에서는 접근할 수 없고 자신의 컴퓨터에서만 접근할 수 있으므로, 개발 시 테스트용으로 많이 사용된다. localhost 대신 127.0.0.1을 주소로 사용해도 같다. 이러한 숫자 주소를 IP(Internet Protocol)라고 부른다.

포트는 서버 내에서 프로세스를 구분하는 번호이다. 서버는 HTTP 요청을 대기하는 것 외에도 다양한 작업을 한다. 데이터베이스와 통신하거나, FTP 요청을 처리하기도 한다. 따라서 서버는 프로세스에 포트를 다르게 할당하여 들어오는 요청을 구분한다. 유명한 포트 번호로는 21(FTP), 80(HTTP), 443(HTTPS), 3306(MYSQL)이 있다.

http://address.co.kr처럼 포트 번호를 따로 표시하지 않는 주소는 80번 포트를 사용하기때문이다. 80번 포트를 사용하면 주소에서 포트를 생략할 수 있다. https의 경우에는 443번 포트를 생략할 수 있다. http://address.co.kr과 http://address.co.kr:80은 같은 동작을 한다.

80번 처럼 유명한 포트들은 이미 다른 서비스가 사용하고 있을 확률이 크다. 보통 포트 하나에 서비스를 하나만 사용할 수 있으므로 다른 서비스가 사용하고 있는 포트를 사용하려 하면 에러가 발생한다. 따라서 개발할 때는 다른 포트 번호들을 사용하고, 실제로 배포할 때는 80번 또는 443번 포트를 사용한다.

한가지 더 알아둘 점이 있다면 리눅스와 맥에서는 1024번 이하의 포트에 연결할 때 관리자 권한이 필요하다. 따라서 명령어 앞에 sudo를 붙여야한다.

</aside>

createServer를 여러개 호출해서 한 번에 여러 서버를 실행할 수도 있다. 사실 실무에서 쓸 일은 드물다.

```jsx
const http = require('http');

http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.write('<h1>Hello Node!</h1>');
  res.end('<p>Hello Server! - 1</p>');
}).listen(8081, () => {
  console.log('server 1');
});

http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.write('<h1>Hello Node!</h1>');
  res.end('<p>Hello Server! - 2</p>');
}).listen(8082, () => {
  console.log('server 2');
});
```

res객체의 write와 end 메서드에 일일이 HTML을 적는 것은 비효율 적이므로, 미리 HTML 파일을 만들어 fs 모듈로 읽어서 전송할 수 있다.

파일을 읽은 버퍼를 문자열로 변경할 필요 없이 그대로 클라이언트에 보내면 된다. 만약 에러 메세지로 일반 문자열을 보낸다면 text/plain을 사용해준다.

```jsx
const http = require('http');
const fs = require('fs').promises;

const server = http.createServer(async (req, res) => {
  try {
    const data = await fs.readFile('./index.html');
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(data);
  } catch (err) {
    console.error(err);
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end(err.message);
  }
});

server.listen(8080, () => {
  console.log('running server on port 8080');
});
```

<aside>
💡 Note: HTTP 상태코드
위 코드에서 200, 500 같은 숫자는 HTTP 상태 코드이다. 브라우저는 서버에서 보내주는 상태 코드를 보고 요청이 성공했는지 실패했는지를 판단한다.
- 2XX: 성공을 알리는 상태코드로 200(성공), 201(작성돔)이 많이 사용된다.
- 3XX: 리다이렉션(다른 페이지로 이동)을 알리는 상태 코드이다. 어떤 주소를 입력했는데 다른 주소의 페이지로 넘어갈 때 이 코드가 사용된다. 대포적으로 301(영구 이동), 302(임시 이동)가 있다. 304(수정되지 않음)는 요청의 응답으로 캐시를 사용했다는 뜻이다.
- 4XX: 요청 오류를 나타낸다. 요청 자체가 오류가 있을 때 표시된다. 대표적으로 400(잘못된 요청), 401(권한 업음), 403(금지됨), 404(찾을 수 없음)이 자주 사용된다.
-5XX: 서버 오류를 나타낸다. 요청은 제대로 왔지만 서버에 오류가 생겼을 때 발생한다. 이 오류는 클라이언트에 직접 보내는 경우는 거의 없고 예기치 못한 에러 발생 시 서버가 알아서 5XX대 코드를 보낸다., 500(내부 서버 오류), 502(불량 게이트웨이), 503(서비스를 사용할 수 없음)이 자주 사용된다.

</aside>

# 4.2. REST와 라우팅 사용하기

서버에 요청을 보낼 때는 주소를 통해 요청의 내용을 표현한다. 요청의 내용이 주소를 통해 표현되므로 서버가 이해하기 쉬운 주소를 사용하는 것이 좋은데, 여기서 REST가 등장한다.

REST는 REpresentational State Transfer의 줄임말이며, 서버의 자원을 정의하고 자원에 대한 주소를 지정하는 방법을 가리킨다. 일종의 약속이다. 자원이라고 해서 꼭 파일일 필요는 없고 서버가 행할 수 있는 것들을 통틀어 의미한다고 보면 된다. REST API에는 많은 규칙들이 있는데 모든 규칙을 지키는 것은 현실적으로 어렵다.

[REST API](https://www.notion.so/REST-API-328e6ad715074bf1a2350d8bb00f2121)

- GET: 서버 자원을 가져오고자 할 때 사용되며 요청의 본문에 데이터를 넣지 않는다. 데이터를 서버로 보내야 한다면 쿼리스트링을 사용한다.
- POST: 서버에 자원을 새로 등록하고자 할 때, 요청의 본문에 데이터를 넣어 보낸다.
- PUT: 서버의 자원을 요청의 본문에 들어 있는 자원으로 치환하고자 할 때 사용한다.
- PATCH: 서버의 자원의 일부만 수정하고자 할 때  요청의 본문에 일부 수정할 데이터를 넣어 보낸다.
- DELETE: 서버의 자원을 삭제하고자 할 때 사용하며 요청의 본문에 데이터를 넣지 않는다.
- OPTIONS: 요청을 하기 전에 통신 옵션을 설명하기 위해 사용한다. 주로 웹소켓을 사용할 때 사용된다.

주소 하나가 요청 메서드를 여러 개 가질 수 있다. 같은 주소라도 /user에 GET 메서드로 요청을 보내면 사용자 정보를 가져오는 요청이라는 것을 알 수 있고, POST 메서드로 요청을 보내면 새로운 사용자를 등록하려 한다는 것을 알 수 있다.

또한 GET 메서드 같은 경우 브라우저에서 캐싱할 수 도 있으므로 서버에서 가져오는 것이 아니라 캐시에서 가져올 수도 있고, 성능 향상으로 이어진다.

또한 HTTP 통신을 사용하면 클라이언트가 누구든 상관없이 같은 방식으로 서버와 소통할 수 있고 이는 서버와 클라이언트가 분리되어 있다는 뜻이다.

노드에서는 req  객체의 method, url 프로퍼트로 각각 메서드와 주소 값을 구할수 있고 이 값을 이용하여 각기 다른 작업을 실행할 수 있다.

```jsx
const http = require('http');

const server = http.createServer(async (req, res) => {
  console.log(req.method, req.url)
});

server.listen(8080);
```

<aside>
💡 헤더와 본문
요청과 응답은 모두 헤더와 본문을 가지고 있다. 헤더는 요청 또는 응답에 대한 정보를 가지고 있는 곳이고, 본문은 서버와 클라이언트 간에 주고받을 실제 데이터를 담아두는 공간이다.
개발자 도구의 Network 탭에서 요청 중 하나를 클릭해보면 더 상세하게 요청과 응답을 살펴볼 수 있다.

</aside>