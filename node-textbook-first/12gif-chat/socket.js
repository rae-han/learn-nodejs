// const WebSocket = require('ws');
const SocketIO = require('socket.io');
// const { default: axios } = require('axios');
const cookie = require('cookie-signature');
const cookieParser = require('cookie-parser');
const axios = require('axios');

const CONNECTION = 'connection';
const DISCONNECT = 'disconnect';
const EVENT = 'event';

module.exports = (server, app, sessionMiddleware) => {
  // console.log(server)
  // console.log(app)
  // console.log(sessionMiddleware)
  const io = SocketIO(server, { path: '/socket.io' });
  console.log(3, 'socket.io 패키지를 불러와서 익스프레스 서버와 연결')


  app.set('io', io);
  console.log(3, 'io 객체를 ')

  const room = io.of('/room');
  const chat = io.of('/chat');

  io.use((socket, next) => {
    // sessionMiddleware(socket.request, socket.request.res, next);
    cookieParser(process.env.COOKIE_SECRET)(socket.request, socket.request.res, next);
    sessionMiddleware(socket.request, socket.request.res, next);
    console.log(4, 'socket.request 속성으로 요청 객체에, socket.request.res로 응답 객체에 접근할 수 있다.')
  })

  room.on(CONNECTION, (socket) => {
    const req = socket.request;
    const { headers: { referer } } = req;
    const chatId = referer

    console.log(5, 'room 네임스페이스에 접속');
    console.log(5, '연결 후에는 이벤트 리스너를 붙인다.')
    console.log(5, 'connection 이벤트는 클라이언트가 접속했을 때 발생하고 콜백으로 소켓 객체(socket)을 제공한다.')
    console.log(5, 'io 객체와 socket 객체가 Socket.IO의 핵심')

    socket.on(EVENT, data => {
      console.log(6, 'room 네임스페이스 이벤트 발생')
      console.log(data)
    })

    socket.on(DISCONNECT, () => {
      console.log(6, 'room 네임스페이스 접속 해제');
    });

    socket.on('clientAlarm', () => {
      console.log('clientAlarm');
      // socket.emit('serverAlarm', 'data');
      room.emit('serverAlarm', 'data');
    })
  });

  chat.on(CONNECTION, (socket) => {
    console.log('chat 네임스페이스에 접속');
    const req = socket.request;
    const { headers: { referer } } = req;
    const roomId = referer
      .split('/')[referer.split('/').length -1]
      .replace(/\?.+/, '');
    socket.join(roomId);
    console.log(8, referer)
    console.log(8, roomId)

    socket.to(roomId).emit('join', {
      user: 'system',
      chat: `${req.session.color}님이 입장.`
    });

    socket.on(DISCONNECT, () => {
      console.log('chat 네임스페이스 접속 해제');
      socket.leave(roomId)

      const currentRoom = socket.adapter.rooms[roomId];
      const userCount = currentRoom ? currentRoom.length : 0;
      if(userCount === 0) {
        const signedCookie = req.signedCookies['connect.sid'];
        const connectSID = cookie.sign(signedCookie, process.env.COOKIE_SECRET);
        axios.delete(`http://localhost:8005/room/${roomId}`, {
          headers: {
            Cookie: `connect.sid=s%3A${connectSID}`
          },
        })
          .then(() => {
            console.log('방 제거 요청 성공')
          })
          .catch((error) => {
            console.error(error);
          })
      } else {
        socket.to(roomId).emit('exit', {
          user: 'system',
          chat: `${req.session.color}님이 퇴장.`
        })
      }
    });
  });
};