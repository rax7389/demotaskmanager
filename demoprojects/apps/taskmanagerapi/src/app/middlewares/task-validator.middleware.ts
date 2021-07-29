import { body } from 'express-validator';

export class TaskValidator {
  public static validate(method) {
    switch (method) {
      case 'updateTask': {
        return [
          body('taskName', "TaskName doesn't Exist").exists(),
          body('taskId', "TaskId doesn't Exist").exists(),
        ];
        break;
      }
      case 'create': {
        return [body('taskName', "TaskName doesn't Exist").exists()];
        break;
      }
      case 'deleteTask': {
        return [body('taskId', "TaskId doesn't Exist").exists()];
        break;
      }
    }
  }
}
