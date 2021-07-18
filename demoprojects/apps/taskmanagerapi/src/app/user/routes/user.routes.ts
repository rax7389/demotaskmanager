import {Express}  from 'express';
import {findAll}  from '../controllers/user.controller';

export function userRouter (route:Express){
  route.get('/user', findAll);
}
