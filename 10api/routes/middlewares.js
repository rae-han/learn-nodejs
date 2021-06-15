exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) { // passport에서 req객체에 추가하는 메서드, 로그인 상태 유무를 확인 시켜준다.
    next();
  } else {
    res.status(403).send('로그인 필요');
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    const message = encodeURIComponent('로그인한 상태입니다.');
    res.redirect(`/?error=${message}`);
  }
};
