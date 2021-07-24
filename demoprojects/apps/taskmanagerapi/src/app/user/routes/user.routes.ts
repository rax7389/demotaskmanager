import { Express } from 'express';
import { findAll, create } from '../controllers/user.controller';

export function userRouter(route: Express) {
  route.get('/User/findAllUser', findAll);
  route.post('/User/createUser', create);
}
