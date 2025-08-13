const jwt = require('jsonwebtoken');
require('dotenv').config();
const secret = process.env.JWT_SECRET || 'replace_me';

function auth(req, res, next) {
  const h = req.headers.authorization;
  if (!h) return res.status(401).json({error:'missing_authorization'});
  const token = h.replace('Bearer ', '');
  try {
    const payload = jwt.verify(token, secret);
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({error:'invalid_token'});
  }
}

module.exports = auth;
