import { Express } from 'express';
import { Authentication } from '../../middlewares/authentication.middleware';
import { UserValidator } from '../../middlewares/user-validator.middleware';

import {
  findAll,
  create,
  findByEmail,
  verifyUser,
} from '../controllers/user.controller';

export function userRouter(route: Express) {
  route.get('/User/findAllUser', Authentication.authenticateToken, findAll);
  route.post('/User/createUser', UserValidator.validate('create'), create);
  route.post(
    '/User/findByEmail',
    UserValidator.validate('findByEmail'),
    findByEmail
  );
  route.post(
    '/User/verifyUser',
    UserValidator.validate('verifyUser'),
    verifyUser
  );
}
