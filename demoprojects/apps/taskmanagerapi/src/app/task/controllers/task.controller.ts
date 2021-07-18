import {Task}  from '../models/task.model';
export function findAll(req, res) {
  Task.findAll(function(err, task) {
    if (err)
      res.send(err);
    res.send(task);
  });
}


