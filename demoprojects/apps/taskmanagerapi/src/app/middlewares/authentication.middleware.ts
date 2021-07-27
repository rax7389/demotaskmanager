import * as jsonwebtoken from 'jsonwebtoken';
import { TOKEN_SECRET } from '../../global';
import { CustomErrorHandler } from '../middlewares/custom-error-handler.middleware';

export class Authentication {
  public static authenticateToken(req, res, next) {
    // const authHeader = req.headers['authorization'];
    // const token = authHeader && authHeader.split(' ')[1];
    const token = Authentication.getTokenFromHeader(req);
    if (token == null)
      return next(CustomErrorHandler.customErrrMsg(401, 'Unauthorized'));

    jsonwebtoken.verify(token, TOKEN_SECRET as string, (err, user) => {
      if (err)
        return next(CustomErrorHandler.customErrrMsg(403, 'Forbidden', err));

      req.user = user;

      next();
    });
  }

  public static generateAccessToken(userdata) {
    return jsonwebtoken.sign(userdata, TOKEN_SECRET, { expiresIn: '1h' });
  }

  public static getUserDetailFromToken(req, key) {
    const token = Authentication.getTokenFromHeader(req);
    const decoded = jsonwebtoken.decode(token, { complete: true });
    return key && decoded && decoded?.payload ? decoded?.payload[key] : null;
  }

  private static getTokenFromHeader(req) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    return token;
  }
}
