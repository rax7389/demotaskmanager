import {Express}  from 'express';
import {findAll}  from '../controllers/task.controller';

export function taskRouter (route:Express){
  route.get('/task', findAll);
}
