const SocketIO = require('socket.io');
const axios = require('axios');
const cookieParser = require('cookie-parser');

module.exports = (server, app, sessionMiddleware) => {
  const io = SocketIO(server, { 
    path: '/socket.io',
  }); 
  // # option
  // - path: 클라이언트가 접속할 경로, 클라이언트에서도 이 경로와 일치하는 path를 넣어야 한다.

  app.set('io', io);
  // 라우터에서 io 객체를 쓸 수 있게 저장

  const room = io.of('/room');
  const chat = io.of('/chat');
  // Socket.IO에 네임스페이스를 부여하는 메서드.

  io.use((socket, next) => { 
    cookieParser(process.env.COOKIE_SECRET)(socket.request, socket.request.res, next);
    // io.use 메서드에 미들웨어 장착
    // 모든 웹 소켓 연결 시마다 실행
    sessionMiddleware(socket.request, socket.request.res, next);
  })

  room.on('connection', (socket) => {
    console.log('room 네임스페이스 접속');
    socket.on('disconnect', () => {
      console.log('room 네임스페이스 해제');
    })
  });

  chat.on('connection', (socket) => {
    console.log('chat 네임스페이스 접속');

    const req = socket.request;
    const { headers: { referer }} = req;
    const roomId = referer
      .split('/')[referer.split('/').length -1]
      .replace(/\?.+/, '');
    
    socket.join(roomId);

    socket.to(roomId).emit('join', {
      user: 'system',
      chat: `${req.session.color}님이 입장`
    })

    socket.on('disconnect', () => {
      console.log('chat 네임스페이스 접속 해제');
      
      socket.leave(roomId)

      socket.leave(roomId);
      const currentRoom =socket.adapter.rooms[roomId];
      const userCount = currentRoom ? currentRoom.length : 0;
      if(userCount === 0) { // 접속자가 0명이면 방 삭제
        axios.delete(`http://localhost:8005/room/${roomId}`)
          .then(() => {
            console.log('방 제거 요청 성공')
          })
          .catch((error) => {
            console.error(error)
          });
      } else {
        socket.to(roomId).emit('exit', {
          user: 'system',
          chat: `${req.session.color}님이 퇴장`
        })
      }
    })

  })

  // io.on('connection', (socket) => {
    
  //   const req = socket.request; 
  //   // 요청 객체에 접근
  //   // 응갑 객체는 socket.request.res 로 접근
  //   // socket.id로 소켓 고유의 아이디를 가져올 수 있다.
  //   // console.log('req: ', req);
  //   // console.log(req.res);
  //   console.log(socket.id)
  //   const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  //   console.log('req.headers["x-forwarded-for"], req.connection.remoteAddress', req.headers['x-forwarded-for'], req.connection.remoteAddress)
  //   console.log('ip: ', ip)

  //   console.log('새로운 클라이언트 접속!', ip, socket.id, req.ip);

  //   socket.on('disconnect', () => {
  //     console.log('클라이언트 접속 해제', ip, socket.id);
  //     clearInterval(socket.interval);
  //   })

  //   socket.on('reply', (data) => { // reply는 사용자가 직접 만든 이벤트.
  //     console.log(data);
  //     console.log(new Date().getTime());
  //   })

  //   socket.interval = setInterval(() => {
  //     socket.emit('news', 'Hello Socket.IO')
  //   }, 4000)
  // })
};

// 130 36 25820
// 210 24 22330
// 210 36 31770