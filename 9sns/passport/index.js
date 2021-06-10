const passport = require('passport');
const local = require('./localStrategy');
// const kakao = require('./kakaoStrategy');
const User = require('../models/user');

module.exports = () => {
  // 로그인시 실행
  // req.session 객체에 어떤 데이터를 저장할지 정하는 메서드
  passport.serializeUser((user, done) => { 
    done(null, user.id) // 첫 번째 인수는 에러 발생 시 사용, 두 번재 인수는 저장하고 싶은 데이터
  });

  // 매 요청 시 실행
  // passport.session 미들웨어가 이 메서드를 호출
  // serializeUser의 done의 두 번째 인수로 넣었던 데이터가 이 함수의 매개변수가 된다.
  passport.deserializeUser((id, done) => {
    User.findOne({ where: { id } })
      .then(user => done(null, user))
      .catch(err => done(err))
  });

  // serializeUser는 사용자 정보 객체를 세션에 아이디로 저장
  // deserializeUser는 세션에 저장한 아이디를 통해 사용자 정보 객체를 불러오는 것
  // 세션에 불필요한 데이터를 담아두지 않기 위한 과정

  local();
  // kakao();
}