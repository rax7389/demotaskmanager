import { body } from 'express-validator';

export class SubTaskValidator {
  public static validate(method) {
    switch (method) {
      case 'findSubTaskByTask': {
        return [body('taskId', "TaskId doesn't Exist").exists()];
        break;
      }
      case 'create': {
        return [
          body('subTaskName', "TaskName doesn't Exist").exists(),
          body('taskId', "TaskId doesn't Exist").exists(),
        ];
        break;
      }
      case 'deleteSubtask': {
        return [
          body('taskId', "TaskId doesn't Exist").exists(),
          body('subtaskId', "SubTaskID doesn't Exist").exists(),
        ];
        break;
      }
      case 'updateSubtask': {
        return [
          body('subTaskName', "SubTaskName doesn't Exist").exists(),
          body('subtaskId', "SubTaskID doesn't Exist").exists(),
        ];
        break;
      }
    }
  }
}
