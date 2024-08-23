const AuthService = require('../services/auth.service');
const { encrypt, compare } = require('../utils/handleBcrypt');
const catchAsync = require('../utils/cachAsync');
const db = require('../../database/models/index');
const { tokenSign } = require('../utils/generateToken');
// const bcrypt = require('bcrypt');

const authService = new AuthService();

exports.registerUsers = catchAsync(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  const passwordHash = await encrypt(password);
  const user = await authService.register({
    name,
    email,
    role,
    password: passwordHash,
  });

  return res.status(201).json({
    user,
  });
});

exports.loginUsers = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await db.users.findOne({
    where: {
      email,
    },
  });

  if (!user) {
    return res.status(401).json({
      message: 'Administrator not found',
    });
  }

  const checkPassword = await compare(password, user.password);
  const tokenSession = await tokenSign(user);

  if (checkPassword) {
    res.cookie(tokenSession, 'usuario_autenticado', { maxAge: 900000, httpOnly: true });
    return res.status(200).json({
      user,
      tokenSession,
      role: user.role,
    });
  } else {
    return res.status(401).json({
      message: 'Incorrect email or password',
    });
  }
});

exports.loginSuper_admin = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await db.SuperAdmin.findOne({
    where: {
      email,
    },
  });

  if (!user) {
    return res.status(401).json({
      message: 'User not found',
    });
  }

  const checkPassword = await compare(password, user.password);
  const tokenSession = await tokenSign(user);

  if (checkPassword) {
    res.cookie(tokenSession, 'usuario_autenticado', { maxAge: 900000, httpOnly: true });
    return res.status(200).json({
      user,
      tokenSession,
    });
  } else {
    return res.status(401).json({
      message: 'Incorrect email or password',
    });
  }
});

exports.logoutUser = catchAsync(async (req, res, next) => {
  const token = req.headers.authorization.split(' ').pop();
  // const miCookie = req.cookies[token];
  res.clearCookie(token);
  return res.status(401).json({
    message: 'sesion cerrada con exito',
  });
});
