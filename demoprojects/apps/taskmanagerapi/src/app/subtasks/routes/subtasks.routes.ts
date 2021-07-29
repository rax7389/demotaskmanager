import { Express } from 'express';
import {
  findAll,
  deleteSubtask,
  updateSubtask,
  create,
  findSubTaskByTask,
} from '../controllers/subtask.controller';
import { Authentication } from '../../middlewares/authentication.middleware';
import { SubTaskValidator } from '../../middlewares/sub-task-validator.middleware';

export function subTaskRouter(route: Express) {
  route.post(
    '/SubTask/deleteSubTaskById',
    Authentication.authenticateToken,
    SubTaskValidator.validate('deleteSubtask'),
    deleteSubtask
  );
  route.post(
    '/SubTask/updateSubtaskById',
    Authentication.authenticateToken,
    SubTaskValidator.validate('updateSubtask'),
    updateSubtask
  );
  route.post(
    '/SubTask/createSubtask',
    Authentication.authenticateToken,
    SubTaskValidator.validate('create'),
    create
  );
  route.post(
    '/SubTask/findSubTaskByTaskName',
    Authentication.authenticateToken,
    SubTaskValidator.validate('findSubTaskByTask'),
    findSubTaskByTask
  );
  route.get(
    '/SubTask/findAllSubTask',
    Authentication.authenticateToken,
    findAll
  );
}
