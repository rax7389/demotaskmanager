import { SubTaskWrapper } from '../../wrappers/sub-task-wrapper.model';
import { SubTask } from '../models/subtasks.model';
import { map, isEmpty } from 'lodash';
import { CustomErrorHandler } from '../../middlewares/custom-error-handler.middleware';
import { Authentication } from '../../middlewares/authentication.middleware';
import { validationResult } from 'express-validator';

export async function findAll(req, res, next) {
  try {
    const subtasks = await SubTask.findAll();
    const wrapper = map(subtasks, (item) => {
      return new SubTaskWrapper(
        item.sub_task_id_pk,
        item.sub_task_name,
        item.task_id_fk
      );
    });
    res.status(200).send({ result: wrapper });
  } catch (error) {
    next(CustomErrorHandler.customErrrMsg(500, 'Something went Wrong'), error);
  }
}

export async function findSubTaskByTask(req, res, next) {
  const errors = validationResult(req);
  if (
    (req.body.constructor === Object && Object.keys(req.body).length === 0) ||
    !errors.isEmpty()
  ) {
    next(CustomErrorHandler.badRequest('Please provide all required field'));
  } else {
    try {
      const userId = Authentication.getUserDetailFromToken(req, 'user_id_pk');
      const subTask = new SubTask(req.body.taskId, userId);
      const data = await SubTask.findSubTaskByTask(subTask);
      const wrapper = map(data, (item) => {
        return new SubTaskWrapper(
          item.sub_task_id_pk,
          item.sub_task_name,
          item.task_id_fk
        );
      });
      res.status(200).send({ result: wrapper });
    } catch (error) {
      next(
        CustomErrorHandler.customErrrMsg(500, 'Something went Wrong'),
        error
      );
    }
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
      const subtask = new SubTask(
        req.body.subTaskName,
        req.body.taskId,
        Authentication.getUserDetailFromToken(req, 'user_id_pk')
      );
      const subTaskId = await SubTask.create(subtask);
      if (subTaskId) {
        res.json({
          result: 'SubTask created successfully!',
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

export async function deleteSubtask(req, res, next) {
  const errors = validationResult(req);
  if (
    (req.body.constructor === Object && Object.keys(req.body).length === 0) ||
    !errors.isEmpty()
  ) {
    next(CustomErrorHandler.badRequest('Please provide all required field'));
  } else {
    try {
      const subtask = new SubTask(
        null,
        req.body.taskId,
        Authentication.getUserDetailFromToken(req, 'user_id_pk'),
        req.body.subtaskId
      );
      const subTaskDeleted = await SubTask.delete(subtask);
      if (subTaskDeleted) {
        res.json({
          result: 'SubTask deleted successfully!',
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

export async function updateSubtask(req, res, next) {
  const errors = validationResult(req);
  if (
    (req.body.constructor === Object && Object.keys(req.body).length === 0) ||
    !errors.isEmpty()
  ) {
    next(CustomErrorHandler.badRequest('Please provide all required field'));
  } else {
    try {
      const subtask = new SubTask(
        req.body.subTaskName,
        null,
        null,
        req.body.subtaskId
      );
      const subTaskUpdated = await SubTask.update(subtask);
      if (subTaskUpdated) {
        res.json({
          result: 'SubTask Updated successfully!',
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
