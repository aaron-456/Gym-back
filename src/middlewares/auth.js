const { verifyToken } = require('../utils/generateToken');

const checkAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ').pop();
    const miCookie = req.cookies[token];

    const tokenData = await verifyToken(token);
    // console.log(tokenData);
    if (tokenData.id && miCookie) {
      req.id=tokenData.id
      next();
    } else {
      return res.status(401).json({
        message: 'Please authenticate ',
      });
    }
  } catch (e) {
    console.log(e);
    res.status(401);
    res.send({ error: 'Please authenticate' });
  }
};

module.exports = checkAuth;
