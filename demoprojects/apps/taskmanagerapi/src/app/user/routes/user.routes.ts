import { Express } from 'express';
import { Authentication } from '../../middlewares/authentication.middleware';

import {
  findAll,
  create,
  findByEmail,
  verifyUser,
} from '../controllers/user.controller';

export function userRouter(route: Express) {
  route.get('/User/findAllUser', Authentication.authenticateToken, findAll);
  route.post('/User/createUser', create);
  route.post(
    '/User/findByEmail',
    Authentication.authenticateToken,
    findByEmail
  );
  route.post('/User/verifyUser', verifyUser);
}
