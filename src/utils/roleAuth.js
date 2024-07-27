const { verifyToken } = require('../utils/generateToken');
const db = require('../../database/models/index');

const checkRoleAuth = (roles) => async (req, res, next) => {
  /*Verifica que sean Usuarios con rol[admin] y si es asi permite el acceso  */
  try {
    const token = req.headers.authorization.split(' ').pop();
    const tokenData = await verifyToken(token);
    const userData = await db.users.findByPk(tokenData.id);

    if ([].concat(roles).includes(userData.role)) {
      next();
    } else {
      return res.status(401).json({
        message: 'You dont have permissions',
      });
    }
  } catch (e) {
    console.log(e);
    res.status(401);
    res.send({ error: 'You dont have permissions' });
  }
};

module.exports = checkRoleAuth;
