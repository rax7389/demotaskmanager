import mysql  = require('mysql');
//local mysql db connection
export const dbConn = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'task_manager'
});
dbConn.connect(function(err) {
  if (err) throw err;
  console.log("Database Connected!");
});

