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

  constructor(email: string);
  constructor(email: string, password: string);
  constructor(
    email: string,
    password: string,
    firstname: string,
    lastname: string
  );
  constructor(
    email: string,
    password: string,
    firstname: string,
    lastname: string,
    theme: string
  );
  constructor(
    email?: string,
    password?: string,
    firstname?: string,
    lastname?: string,
    theme?: string
  ) {
    this.user_email = email || null;
    this.user_password = password || null;
    this.theme = theme || null;
    this.user_firstname = firstname || null;
    this.user_lastname = lastname || null;
  }

  public static findAll = (result) => {
    dbConn.query('Select * from user', function (err, res) {
      if (err) {
        console.log('error: ', err);
        result(null, err);
      } else {
        result(null, res);
      }
    });
  };

  public static findByEmail = (newUser) => {
    return new Promise((resolve, reject) => {
      dbConn.query(
        'Select count(*) from user where user_email = ?',
        [newUser.user_email],
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

  public static create = (newUser) => {
    return new Promise((resolve, reject) => {
      dbConn.query('INSERT INTO user set ?', newUser, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res.insertId);
        }
      });
    });
  };

  public static verifyUser = (newUser) => {
    return new Promise((resolve, reject) => {
      dbConn.query(
        'Select * from user where user_email = ?',
        [newUser.user_email],
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
}
