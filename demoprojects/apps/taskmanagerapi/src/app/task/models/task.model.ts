import { dbConn } from '../../../config/db.config';

export class Task {
  private task_name: string;
  private user_id_fk: number;
  private task_id_pk: number;

  constructor();
  constructor(userId: number);
  constructor(userId: number, taskName: string);
  constructor(userId: number, taskName: string, taskId: number);
  constructor(userId?: number, taskName?: string, taskId?: number) {
    this.task_name = taskName || null;
    this.user_id_fk = userId || null;
    this.task_id_pk = taskId || null;
  }

  public static findAll = () => {
    return new Promise((resolve, reject) => {
      dbConn.query('Select * from task', (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  };

  public static findTaskByUser = (task) => {
    return new Promise((resolve, reject) => {
      dbConn.query(
        'Select * from task where user_id_fk = ?',
        [task.user_id_fk],
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

  public static create = (newTask) => {
    return new Promise((resolve, reject) => {
      dbConn.query('INSERT INTO task set ?', newTask, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res.insertId);
        }
      });
    });
  };

  public static findByTask = (newTask) => {
    return new Promise((resolve, reject) => {
      dbConn.query(
        'Select count(*) from task where task_name = ?',
        [newTask.task_name],
        (err, res) => {
          if (err) {
            reject(err);
          } else {
            const count = (res && res[0] && res[0]['count(*)']) || 0;
            resolve(count > 0);
          }
        }
      );
    });
  };

  public static delete = (task) => {
    return new Promise((resolve, reject) => {
      dbConn.query(
        'DELETE FROM task WHERE task_id_pk = ? and user_id_fk = ?',
        [task.task_id_pk, task.user_id_fk],
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

  public static update = (task) => {
    return new Promise((resolve, reject) => {
      dbConn.query(
        'UPDATE task SET task_name = ? WHERE task_id_pk = ?',
        [task.task_name, task.task_id_pk],
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
