import {dbConn}  from '../../../config/db.config';
export const Task = function(task){
  this.task_name     = task.task_name;
};

Task.findAll = function (result) {
  dbConn.query("Select * from task", function (err, res) {
    if(err) {
      console.log("error: ", err);
      result(null, err);
    }
    else{
      console.log('task : ', res);
      result(null, res);
    }
  });
};
