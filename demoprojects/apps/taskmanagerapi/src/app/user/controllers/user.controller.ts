import {User}  from '../models/user.model';
export function findAll(req, res) {
  User.findAll(function(err, user) {
    if (err)
      res.send(err);
    res.send(user);
  });
}
