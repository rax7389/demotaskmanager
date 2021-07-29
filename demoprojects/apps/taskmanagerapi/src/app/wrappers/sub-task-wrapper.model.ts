export class SubTaskWrapper {
  id: number;
  subtTaskName: string;
  taskId: number;
  constructor();
  constructor(id, subtTaskName, taskId);
  constructor(id?, subtTaskName?, taskId?) {
    this.id = id;
    this.subtTaskName = subtTaskName;
    this.taskId = taskId;
  }
}
