import {dbConn}  from '../../../config/db.config';
export const User = function(user){
  this.user_email  = user.user_email;
  this.user_password  = user.user_password;
};

User.findAll = function (result) {
  dbConn.query("Select * from user", function (err, res) {
    if(err) {
      console.log("error: ", err);
      result(null, err);
    }
    else{
      console.log('user : ', res);
      result(null, res);
    }
  });
};
