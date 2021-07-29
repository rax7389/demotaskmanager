export class TaskWrapper {
  id: number;
  taskName: string;
  constructor();
  constructor(id, taskName);
  constructor(id?, taskName?) {
    this.id = id;
    this.taskName = taskName;
  }
}
