import session from 'express-session';

export default session({
  secret: '59214b107dbb496607c1ea8f',
  resave: false,
  saveUninitialized: false,
  cookie: {
    path: '/',
    httpOnly: true,
    secure: false,
    maxAge: 3600000
  },
});
