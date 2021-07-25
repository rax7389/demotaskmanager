import * as jsonwebtoken from 'jsonwebtoken';
import { TOKEN_SECRET } from '../../global';

export class Authentication {
  public static authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    jsonwebtoken.verify(token, TOKEN_SECRET as string, (err, user) => {
      console.log(err);

      if (err) return res.sendStatus(403);

      req.user = user;

      next();
    });
  }

  public static generateAccessToken(userdata) {
    return jsonwebtoken.sign(userdata, TOKEN_SECRET, { expiresIn: '1h' });
  }
}
