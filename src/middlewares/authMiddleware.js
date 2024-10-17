const jwt = require('jsonwebtoken');

function verifyAdmin(req, res, next) {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ message: 'Tu token esta incorrecto Bro ;)' });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Tu token esta incorrecto Bro ;)' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    if (req.user.role !== 'Admin') {
      return res.status(403).json({ message: 'Acceso denegado no eres Admin ;)' });
    }

    console.log('Token:', token);
    console.log('Decoded:', decoded);

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido o ha expirado :(' });
  }
}

module.exports = verifyAdmin;
