import { Express } from 'express';
import {
  create,
  deleteTask,
  findAll,
  findTaskByUser,
  updateTask,
} from '../controllers/task.controller';
import { Authentication } from '../../middlewares/authentication.middleware';
import { TaskValidator } from '../../middlewares/task-validator.middleware';

export function taskRouter(route: Express) {
  route.get('/Task/findAllTask', Authentication.authenticateToken, findAll);
  route.get(
    '/Task/findTaskByUser',
    Authentication.authenticateToken,
    findTaskByUser
  );
  route.post(
    '/Task/createTask',
    Authentication.authenticateToken,
    TaskValidator.validate('create'),
    create
  );
  route.post(
    '/Task/deleteTaskByID',
    Authentication.authenticateToken,
    TaskValidator.validate('deleteTask'),
    deleteTask
  );
  route.post(
    '/Task/updateTaskByID',
    Authentication.authenticateToken,
    TaskValidator.validate('deleteTask'),
    updateTask
  );
}
