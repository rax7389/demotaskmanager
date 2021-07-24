import { User } from '../models/user.model';

export function findAll(req, res) {
  User.findAll((err, user) => {
    if (err) res.send(err);
    res.send(user);
  });
}

export async function create(req, res) {
  const user = new User(req.body);
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res
      .status(400)
      .send({ error: true, message: 'Please provide all required field' });
  } else {
    const isAreadyExist = await User.findByEmail(user);
    if (isAreadyExist) {
      res.status(200).send({ error: true, message: 'User already exist' });
    } else {
      User.create(user, (err, user) => {
        if (err) res.send(err);
        res.json({
          error: false,
          message: 'User created successfully!',
          data: user,
        });
      });
    }
  }
}
