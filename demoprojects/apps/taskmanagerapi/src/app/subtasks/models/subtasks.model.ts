import { dbConn } from '../../../config/db.config';

interface SubTaskData {
  subTaskName: string;
  taskId: number;
  userId: number;
}

export class SubTask {
  private sub_task_name: string;
  private task_id_fk: number;
  private user_id_fk: number;
  private sub_task_id_pk: number;

  constructor(taskId, userId);
  constructor(subTaskName, taskId, userId);
  constructor(subTaskName, taskId, userId, subtaskId);
  constructor(subTaskName?, taskId?, userId?, subtaskId?) {
    this.sub_task_name = subTaskName || null;
    this.task_id_fk = taskId || null;
    this.user_id_fk = userId || null;
    this.sub_task_id_pk = subtaskId || null;
  }

  public static findAll = () => {
    return new Promise((resolve, reject) => {
      dbConn.query('Select * from subtask', (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  };

  public static findSubTaskByTask = (subTask) => {
    return new Promise((resolve, reject) => {
      dbConn.query(
        'Select * from subtask where task_id_fk = ? and user_id_fk = ? ',
        [subTask.task_id_fk, subTask.user_id_fk],
        (err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(res);
          }
        }
      );
    });
  };

  public static create = (subTask) => {
    return new Promise((resolve, reject) => {
      dbConn.query('INSERT INTO subtask set ?', subTask, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res.insertId);
        }
      });
    });
  };

  public static delete = (subTask) => {
    return new Promise((resolve, reject) => {
      dbConn.query(
        'DELETE FROM subtask WHERE sub_task_id_pk = ? and task_id_fk = ? and user_id_fk = ?',
        [subTask.sub_task_id_pk, subTask.task_id_fk, subTask.user_id_fk],
        (err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(res?.affectedRows > 0);
          }
        }
      );
    });
  };

  public static update = (subTask) => {
    return new Promise((resolve, reject) => {
      dbConn.query(
        'UPDATE subtask SET sub_task_name = ? WHERE sub_task_id_pk = ?',
        [subTask.sub_task_name, subTask.sub_task_id_pk],
        (err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(res?.affectedRows > 0 && res?.changedRows > 0);
          }
        }
      );
    });
  };
}
