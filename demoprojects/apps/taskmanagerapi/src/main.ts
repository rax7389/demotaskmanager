/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import * as express from 'express';
import bodyParser = require('body-parser');
import {subTaskRouter}  from './app/subtasks/routes/subtasks.routes';
import {taskRouter}  from './app/task/routes/task.routes';
import {userRouter}  from './app/user/routes/user.routes';

const app = express();

userRouter(app);

taskRouter(app);

subTaskRouter(app);

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
