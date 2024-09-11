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

exports.registerTenant = catchAsync(async (req, res, nex) => {
  const { tenantData, userData } = req.body;

  const result = await authService.createTenantAndUser(tenantData, userData);

  return res.status(201).json({ message: 'Tenant and user created', result });
});
