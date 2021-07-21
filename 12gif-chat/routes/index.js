const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const Room = require('../schemas/room');
const Chat = require('../schemas/chat');

const router = express.Router();

try {
  console.log('uploads 폴더 존재')
  fs.readdirSync('uploads');
} catch (error) {
  console.error(error);
  console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
  fs.mkdirSync('uploads')
}

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, 'uploads/');
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      done(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSzie: 5 * 1024 * 1024 },
});

router.get('/', async (req, res, next) => {
  console.log(0, '채팅방 랜더')
  try {
    const rooms = await Room.find({});
    console.log(7, '채팅방 목록 호출');
    console.log(7, rooms)

    res.render('main', { rooms, title: 'GIF 채팅방' });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get('/room', (req, res) => {
  console.log(7.2, 'GIF 채팅방 생성')
  res.render('room', { title: 'GIF 채팅방 생성' })
})

router.post('/room', async (req, res, next) => {
  try {
    const newRoom = await Room.create({
      title: req.body.title,
      max: req.body.max,
      owner: req.session.color,
      password: req.body.password,
    });
    const io = req.app.get('io');
    io.of('/room').emit('newRoom', newRoom);
    console.log(7.2, 'newRoom', newRoom)
    res.redirect(`/room/${newRoom._id}?password=${req.body.password}`);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get('/room/:id', async (req, res, next) => {
  try {
    const room = await Room.findOne({ _id: req.params.id });
    const io = req.app.get('io');
    if (!room) {
      return res.redirect('/?error=존재하지 않는 방입니다.');
    }
    if (room.password && room.password !== req.query.password) {
      return res.redirect('/?error=비밀번호가 틀렸습니다.');
    }
    const { rooms } = io.of('/chat').adapter;
    console.log(7.4, room)
    console.log(7.4, `io.of('/chat').adapter.rooms 에 방 목록이 있다.`)
    console.log(7.4, rooms)
    // ?
    // {
    //   '60f80d413866134c8bf13731': Room { sockets: { '/chat#vCHCFxrTpPU4nm8pAAAD': true }, length: 1 },
    //   '/chat#vCHCFxrTpPU4nm8pAAAD': Room { sockets: { '/chat#vCHCFxrTpPU4nm8pAAAD': true }, length: 1 }
    // }
    // 2명일때
    // {
    //   '60f80d413866134c8bf13731': Room {
    //     sockets: {
    //       '/chat#rnqV0disDIsOiNr3AAAC': true,
    //       '/chat#CBi2h6pF4VayataKAAAH': true
    //     },
    //     length: 2
    //   },
    //   '/chat#rnqV0disDIsOiNr3AAAC': Room { sockets: { '/chat#rnqV0disDIsOiNr3AAAC': true }, length: 1 },
    //   '/chat#CBi2h6pF4VayataKAAAH': Room { sockets: { '/chat#CBi2h6pF4VayataKAAAH': true }, length: 1 }
    // }
    // 3명일때
    // {
    //   '60f80d413866134c8bf13731': Room {
    //     sockets: {
    //       '/chat#PojUPhA8NFLFEuUtAAAc': true,
    //       '/chat#d5cYzQFAQ6zjzUaNAAAd': true,
    //       '/chat#y20bANT_c7uXJVLYAAAv': true
    //     },
    //     length: 3
    //   },
    //   '/chat#PojUPhA8NFLFEuUtAAAc': Room { sockets: { '/chat#PojUPhA8NFLFEuUtAAAc': true }, length: 1 },
    //   '/chat#d5cYzQFAQ6zjzUaNAAAd': Room { sockets: { '/chat#d5cYzQFAQ6zjzUaNAAAd': true }, length: 1 },
    //   '/chat#y20bANT_c7uXJVLYAAAv': Room { sockets: { '/chat#y20bANT_c7uXJVLYAAAv': true }, length: 1 }
    // }
    console.log(7.4, req.params.id)
    if (rooms && rooms[req.params.id] && room.max <= rooms[req.params.id].length) {
      return res.redirect('/?error=허용 인원이 초과하였습니다.');
    }

    const chats = await Chat.find({ room: room._id }).sort('createAt');

    return res.render('chat', {
      room,
      title: room.title,
      chats,
      user: req.session.color,
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

router.delete('/room/:id', async (req, res, next) => {
  console.log(7.3, 'GIF 채팅팡 삭제')
  try {
    await Room.remove({ _id: req.params.id });
    await Chat.remove({ room: req.params.id });
    res.send('ok');
    setTimeout(() => {
      req.app.get('io').of('/room').emit('removeRoom', req.params.id);
    }, 2000);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post('/room/:id/chat', async (req, res, next) => {
  try {
    const chat = await Chat.create({
      room: req.params.id,
      user: req.session.color,
      chat: req.body.chat,
    });

    req.app.get('io').of('/chat').to(req.params.id).emit('chat', chat);
    res.send('ok');
  } catch (error) {
    console.error(error);
    next(error);
  }
})

router.post('/room/:id/gif', upload.single('gif'), async (req, res, next) => {
  try {
    const chat = await Chat.create({
      room: req.params.id,
      user: req.session.color,
      gif: req.file.filename,
    });
    req.app.get('io').of('/chat').to(req.params.id).emit('chat', chat);
    res.send('ok');
  } catch (error) {
    console.error(error);
    next(error);
  }
})

const test = require('../websocket');
router.use('/test', test);

module.exports = router;
