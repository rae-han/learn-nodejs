// const WebSocket = require('ws');
const SocketIO = require('socket.io');
// const { default: axios } = require('axios');
const cookie = require('cookie-signature');
const cookieParser = require('cookie-parser');
const axios = require('axios');

const CONNECTION = 'connection';
const DISCONNECT = 'disconnect';

module.exports = (server, app, sessionMiddleware) => {
  // console.log(server)
  // console.log(app)
  // console.log(sessionMiddleware)
  const io = SocketIO(server, { path: '/socket.io' });

  app.set('io', io);

  const room = io.of('/room');
  const chat = io.of('/chat');

  io.use((socket, next) => {
    // sessionMiddleware(socket.request, socket.request.res, next);
    cookieParser(process.env.COOKIE_SECRET)(socket.request, socket.request.res, next);
    sessionMiddleware(socket.request, socket.request.res, next);
  })

  room.on(CONNECTION, (socket) => {
    console.log('room 네임스페이스에 접속');

    socket.on(DISCONNECT, () => {
      console.log('room 네임스페이스 접속 해제');
    });
  });

  chat.on(CONNECTION, (socket) => {
    console.log('chat 네임스페이스에 접속');
    const req = socket.request;
    const { headers: { referer } } = req;
    const roomId = referer
      .split('/')[referer.split('/').length -1]
      .replace(/\?.+/, '');
    socket.join(roomId);

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