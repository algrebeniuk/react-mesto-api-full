import jwt from 'jsonwebtoken';
import UnauthorizedError from '../errors/unauthorized-error.js';

// eslint-disable-next-line consistent-return
export default function tokenVerification(req, res, next) {
  const { authorization } = req.headers;
  let payload;

  try {
    if (!authorization || !authorization.startsWith('Bearer ')) {
      throw new UnauthorizedError('Необходима авторизация');
    } else {
      const token = authorization.replace('Bearer ', '');
      payload = jwt.verify(token, 'some-secret-key');
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err.name);
    next(new UnauthorizedError('Необходима авторизация'));
  }

  req.user = payload;

  next();
}
