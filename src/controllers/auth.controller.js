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
  const { first_name, last_name, email, password, schema_name } = req.body;

  const result = authService.createTenantAndUser({
    first_name,
    last_name,
    email,
    password,
    tenant_name,
  });

  return res.status().json({ message: 'Tenant and user created', result });
});
