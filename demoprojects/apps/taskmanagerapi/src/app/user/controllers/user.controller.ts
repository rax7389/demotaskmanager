import { Userwrapper } from '../../wrappers/userwrapper.model';
import { User } from '../models/user.model';
import { map, isEmpty } from 'lodash';
import * as bcrypt from 'bcrypt';
import { Authentication } from '../../middlewares/authentication.middleware';

export function findAll(req, res) {
  User.findAll((err, user) => {
    if (err) res.send(err);
    const wrapper = map(user, (item) => {
      return new Userwrapper(item);
    });
    console.log(wrapper);
    res.send({ result: wrapper });
  });
}

export async function create(req, res) {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res
      .status(400)
      .send({ error: true, message: 'Please provide all required field' });
  } else {
    try {
      req.body.password = await bcrypt.hash(req.body.password, 10);
      const user = new User(req.body);
      const isAreadyExist = await User.findByEmail(user);
      if (isAreadyExist) {
        res.status(200).send({ error: true, message: 'User already exist' });
      } else {
        User.create(user, (err, userId) => {
          if (err) res.send(err);
          res.json({
            error: false,
            message: 'User created successfully!',
            data: userId,
          });
        });
      }
    } catch (error) {
      res.status(400).send({ error: true, message: 'Something went Wrong' });
    }
  }
}

export async function findByEmail(req, res) {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res
      .status(400)
      .send({ error: true, message: 'Please provide all required field' });
  } else {
    try {
      const user = new User(req.body);
      const isAreadyExist = await User.findByEmail(user);
      if (isAreadyExist) {
        res.status(200).send({ error: true, message: 'User already exist' });
      } else {
        res
          .status(200)
          .send({ error: false, message: 'No User Found with this email' });
      }
    } catch (error) {
      res.status(400).send({ error: true, message: 'Something went Wrong' });
    }
  }
}

export function verifyUser(req, res) {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res
      .status(400)
      .send({ error: true, message: 'Please provide all required field' });
  } else {
    const user = new User(req.body);
    User.verifyUser(user, async (err, userResponse) => {
      if (err) res.send(err);
      if (!isEmpty(userResponse) && !isEmpty(userResponse[0])) {
        const validPassword = await bcrypt.compare(
          req.body.password,
          userResponse[0].user_password
        );
        if (validPassword) {
          res.json({
            message: 'User logged successfully!',
            token: Authentication.generateAccessToken(req.body),
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
    });
  }
}
