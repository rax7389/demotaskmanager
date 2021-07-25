import { dbConn } from '../../../config/db.config';

interface UserData {
  email: string;
  password: string;
  theme?: string;
  firstname: string;
  lastname: string;
}

export class User {
  private user_email: string;
  private theme: string;
  private user_password: string;
  private user_firstname: string;
  private user_lastname: string;

  constructor(userData: UserData) {
    this.user_email = userData.email;
    this.user_password = userData.password;
    this.theme = userData?.theme || null;
    this.user_firstname = userData.firstname;
    this.user_lastname = userData?.lastname || null;
  }

  public static findAll = (result) => {
    dbConn.query('Select * from user', function (err, res) {
      if (err) {
        console.log('error: ', err);
        result(null, err);
      } else {
        console.log('user : ', res);
        result(null, res);
      }
    });
  };

  public static findByEmail = (newUser) => {
    return new Promise((resolve, reject) => {
      dbConn.query(
        'Select count(*) from user where user_email = ?',
        [newUser.user_email],
        function (err, res) {
          if (err) {
            console.log('error: ', err);
            reject(err);
          } else {
            const count = res && res[0] && res[0]['count(*)'] || 0;
            resolve(count > 0);
          }
        }
      );
    });
  };

  public static create = (newUser, result) => {
    dbConn.query('INSERT INTO user set ?', newUser, function (err, res) {
      if (err) {
        console.log('error: ', err);
        result(err, null);
      } else {
        console.log(res);
        console.log(res.insertId);
        result(null, res.insertId);
      }
    });
  };

  public static verifyUser = (newUser, result) => {
    dbConn.query(
      'Select * from user where user_email = ?',
      [newUser.user_email],
      function (err, res) {
        if (err) {
          console.log('error: ', err);
          result(err, null);
        } else {
          console.log(res);
          result(null, res);
        }
      }
    );
  };
}
