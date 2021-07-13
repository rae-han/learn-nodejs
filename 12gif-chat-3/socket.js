const SocketIO = require('socket.io');

module.exports = (server) => {
  const io = SocketIO(server, { path: '/socket.io' }); 
  // # option
  // - path: 클라이언트가 접속할 경로, 클라이언트에서도 이 경로와 일치하는 path를 넣어야 한다.

  io.on('connection', (socket) => {
    const req = socket.request; 
    // 요청 객체에 접근
    // 응갑 객체는 socket.request.res 로 접근
    // socket.id로 소켓 고유의 아이디를 가져올 수 있다.
    // console.log('req: ', req);
    // console.log(req.res);
    console.log(socket.id)
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log('req.headers["x-forwarded-for"], req.connection.remoteAddress', req.headers['x-forwarded-for'], req.connection.remoteAddress)
    console.log('ip: ', ip)

    console.log('새로운 클라이언트 접속!', ip, socket.id, req.ip);

    socket.on('disconnect', () => {
      console.log('클라이언트 접속 해제', ip, socket.id);
      clearInterval(socket.interval);
    })

    socket.on('reply', (data) => { // reply는 사용자가 직접 만든 이벤트.
      console.log(data);
      console.log(new Date().getTime());
    })

    socket.interval = setInterval(() => {
      socket.emit('news', 'Hello Socket.IO')
    }, 4000)
  })
};
