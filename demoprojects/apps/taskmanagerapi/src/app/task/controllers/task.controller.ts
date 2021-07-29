import { Task } from '../models/task.model';
import { CustomErrorHandler } from '../../middlewares/custom-error-handler.middleware';
import { validationResult } from 'express-validator';
import { map, isEmpty } from 'lodash';
import { TaskWrapper } from '../../wrappers/task-wrapper.model';
import { Authentication } from '../../middlewares/authentication.middleware';

export async function findAll(req, res, next) {
  try {
    const task = await Task.findAll();
    const wrapper = map(task, (item) => {
      return new TaskWrapper(item.task_id_pk, item.task_name);
    });
    res.status(200).send({ result: wrapper });
  } catch (error) {
    next(CustomErrorHandler.customErrrMsg(500, 'Something went Wrong'), error);
  }
}

export async function findTaskByUser(req, res, next) {
  try {
    const task = new Task(
      Authentication.getUserDetailFromToken(req, 'user_id_pk')
    );
    const data = await Task.findTaskByUser(task);
    const wrapper = map(data, (item) => {
      return new TaskWrapper(item.task_id_pk, item.task_name);
    });
    res.status(200).send({ result: wrapper });
  } catch (error) {
    next(CustomErrorHandler.customErrrMsg(500, 'Something went Wrong'), error);
  }
}

export async function create(req, res, next) {
  const errors = validationResult(req);
  if (
    (req.body.constructor === Object && Object.keys(req.body).length === 0) ||
    !errors.isEmpty()
  ) {
    next(CustomErrorHandler.badRequest('Please provide all required field'));
  } else {
    try {
      const task = new Task(
        Authentication.getUserDetailFromToken(req, 'user_id_pk'),
        req.body.taskName
      );
      const isAreadyExist = await Task.findByTask(task);
      if (isAreadyExist) {
        res.status(200).send({ result: 'Task already exist' });
      } else {
        const taskId = await Task.create(task);
        if (taskId) {
          res.json({
            result: 'Task created successfully!',
          });
        } else {
          res.json({
            result: 'failure',
          });
        }
      }
    } catch (error) {
      next(
        CustomErrorHandler.customErrrMsg(500, 'Something went Wrong'),
        error
      );
    }
  }
}

export async function deleteTask(req, res, next) {
  const errors = validationResult(req);
  if (
    (req.body.constructor === Object && Object.keys(req.body).length === 0) ||
    !errors.isEmpty()
  ) {
    next(CustomErrorHandler.badRequest('Please provide all required field'));
  } else {
    try {
      const task = new Task(
        Authentication.getUserDetailFromToken(req, 'user_id_pk'),
        null,
        req.body.taskId
      );
      const taskDeleted = await Task.delete(task);
      if (taskDeleted) {
        res.json({
          result: 'Task deleted successfully!',
        });
      } else {
        res.json({
          result: 'failure',
        });
      }
    } catch (error) {
      next(
        CustomErrorHandler.customErrrMsg(500, 'Something went Wrong'),
        error
      );
    }
  }
}

export async function updateTask(req, res, next) {
  const errors = validationResult(req);
  if (
    (req.body.constructor === Object && Object.keys(req.body).length === 0) ||
    !errors.isEmpty()
  ) {
    next(CustomErrorHandler.badRequest('Please provide all required field'));
  } else {
    try {
      const subtask = new Task(null, req.body.taskName, req.body.taskId);
      const taskUpdated = await Task.update(subtask);
      if (taskUpdated) {
        res.json({
          result: 'Task Updated successfully!',
        });
      } else {
        res.json({
          result: 'failure',
        });
      }
    } catch (error) {
      next(
        CustomErrorHandler.customErrrMsg(500, 'Something went Wrong'),
        error
      );
    }
  }
}
