const UsersService = require('../services/users.service');
const catchAsync = require('../utils/cachAsync');

const usersService = new UsersService();

exports.findAllUsers = catchAsync(async (req, res, next) => {
  const users = await usersService.findAll();

  return res.status(200).json({
    users: users,
  });
});

exports.findOneUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const user = await usersService.findOne(id);

  return res.status(200).json({
    user,
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { name, password } = req.body;

  const user = await usersService.findOne(id);

  const userUpdated = await usersService.update(user, {
    name,
    password,
  });

  return res.status(200).json({
    userUpdated,
  });
});

exports.deletedUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const user = await usersService.findOne(id);

  const userDeleted = usersService.deleted(user);

  return res.status(200).json({
    message: 'The user has been deleted!',
  });
});
