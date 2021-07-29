import { Userwrapper } from '../../wrappers/userwrapper.model';
import { User } from '../models/user.model';
import { map, isEmpty } from 'lodash';
import * as bcrypt from 'bcrypt';
import { Authentication } from '../../middlewares/authentication.middleware';
import { CustomErrorHandler } from '../../middlewares/custom-error-handler.middleware';
import { validationResult } from 'express-validator';

export function findAll(req, res, next) {
  User.findAll((err, user) => {
    if (err) next(CustomErrorHandler.badRequest('Something went Wrong'));
    const wrapper = map(user, (item) => {
      return new Userwrapper(
        item.user_id_pk,
        item.user_email,
        item.user_password,
        item.user_firstname,
        item.user_lastname,
        item.user_theme
      );
    });
    res.send({ result: wrapper });
  });
}

export async function create(req, res, next) {
  const errors = validationResult(req);
  if (
    (req.body.constructor === Object && Object.keys(req.body).length === 0) ||
    !errors.isEmpty()
  ) {
    next(CustomErrorHandler.badRequest('Please provide all required field'));
  } else {
    try {
      req.body.password = await bcrypt.hash(req.body.password, 10);
      const user = new User(
        req.body.email,
        req.body.password,
        req.body.firstname,
        req.body.lastname
      );
      const isAreadyExist = await User.findByEmail(user);
      if (isAreadyExist) {
        res.status(200).send({ result: 'User already exist' });
      } else {
        const userId = User.create(user);
        if (userId) {
          res.json({
            result: 'User created successfully!',
          });
        } else {
          res.json({
            result: 'failure',
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
  const errors = validationResult(req);
  if (
    (req.body.constructor === Object && Object.keys(req.body).length === 0) ||
    !errors.isEmpty()
  ) {
    next(CustomErrorHandler.badRequest('Please provide all required field'));
  } else {
    try {
      const user = new User(req.body.email);
      const isAreadyExist = await User.findByEmail(user);
      if (isAreadyExist) {
        res.status(200).send({ result: 'User already exist' });
      } else {
        res.status(200).send({ result: 'No User Found with this email' });
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
  const errors = validationResult(req);
  if (
    (req.body.constructor === Object && Object.keys(req.body).length === 0) ||
    !errors.isEmpty()
  ) {
    next(CustomErrorHandler.badRequest('Please provide all required field'));
  } else {
    try {
      const user = new User(req.body.email, req.body.password);
      const userResponse = await User.verifyUser(user);
      if (!isEmpty(userResponse) && !isEmpty(userResponse[0])) {
        const validPassword = await bcrypt.compare(
          req.body.password,
          userResponse[0].user_password
        );
        if (validPassword) {
          res.json({
            result: 'User logged successfully!',
            token: Authentication.generateAccessToken({ ...userResponse[0] }),
          });
        } else {
          res.json({
            result: 'Password Not Matched',
          });
        }
      } else {
        res.json({
          result: 'No User Found with this email',
        });
      }
    } catch (error) {
      next(
        CustomErrorHandler.customErrrMsg(500, 'Something went Wrong', error)
      );
    }
  }
}
