import { body } from 'express-validator';

export class UserValidator {
  public static validate(method) {
    switch (method) {
      case 'verifyUser': {
        return [
          body('password', "Passowrd doesn't Exist").exists(),
          body('email', "Email doesn't Exist").exists(),
        ];
        break;
      }
      case 'create': {
        return [
          body('password', "Passowrd doesn't Exist").exists(),
          body('firstname', "First Name doesn't Exist").exists(),
          body('lastname', "Last Name doesn't Exist").exists(),
          body('email', "Email doesn't Exist").exists(),
        ];
        break;
      }
      case 'findByEmail': {
        return [body('email', "Email doesn't Exist").exists()];
        break;
      }
    }
  }
}
