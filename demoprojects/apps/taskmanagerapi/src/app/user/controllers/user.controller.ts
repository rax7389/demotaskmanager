import { Userwrapper } from '../../wrappers/userwrapper.model';
import { User } from '../models/user.model';
import { map, isEmpty } from 'lodash';
import * as bcrypt from 'bcrypt';
import { Authentication } from '../../middlewares/authentication.middleware';
import { CustomErrorHandler } from '../../middlewares/custom-error-handler.middleware';

export function findAll(req, res, next) {
  User.findAll((err, user) => {
    if (err)
      next(CustomErrorHandler.badRequest('Please provide all required field'));
    console.log(Authentication.getUserDetailFromToken(req, 'user_id_pk'));
    const wrapper = map(user, (item) => {
      return new Userwrapper(item);
    });
    res.send({ result: wrapper });
  });
}

export async function create(req, res, next) {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    next(CustomErrorHandler.badRequest('Please provide all required field'));
  } else {
    try {
      req.body.password = await bcrypt.hash(req.body.password, 10);
      const user = new User(req.body);
      const isAreadyExist = await User.findByEmail(user);
      if (isAreadyExist) {
        res.status(200).send({ message: 'User already exist' });
      } else {
        const userId = User.create(user);
        if (userId) {
          res.json({
            message: 'User created successfully!',
          });
        }
      }
    } catch (error) {
      next(
        CustomErrorHandler.customErrrMsg(500, 'Something went Wrong'),
        error
      );
    }
  }
}

export async function findByEmail(req, res, next) {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    next(CustomErrorHandler.badRequest('Please provide all required field'));
  } else {
    try {
      const user = new User(req.body);
      const isAreadyExist = await User.findByEmail(user);
      if (isAreadyExist) {
        res.status(200).send({ message: 'User already exist' });
      } else {
        res.status(200).send({ message: 'No User Found with this email' });
      }
    } catch (error) {
      next(
        CustomErrorHandler.customErrrMsg(500, 'Something went Wrong'),
        error
      );
    }
  }
}

export async function verifyUser(req, res, next) {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    next(CustomErrorHandler.badRequest('Please provide all required field'));
  } else {
    try {
      const user = new User(req.body);
      const userResponse = await User.verifyUser(user);
      if (!isEmpty(userResponse) && !isEmpty(userResponse[0])) {
        const validPassword = await bcrypt.compare(
          req.body.password,
          userResponse[0].user_password
        );
        if (validPassword) {
          res.json({
            message: 'User logged successfully!',
            token: Authentication.generateAccessToken({ ...userResponse[0] }),
          });
        } else {
          res.json({
            message: 'Password Not Matched',
          });
        }
      } else {
        res.json({
          message: 'No User Found with this email',
        });
      }
    } catch (error) {
      next(
        CustomErrorHandler.customErrrMsg(500, 'Something went Wrong', error)
      );
    }
  }
}
