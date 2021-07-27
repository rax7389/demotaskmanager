/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import * as express from 'express';
import * as cors from 'cors';
import * as morgan from 'morgan';
import * as fs from 'fs';
import * as path from 'path';

import { TOKEN_SECRET } from './global';
import { subTaskRouter } from './app/subtasks/routes/subtasks.routes';
import { taskRouter } from './app/task/routes/task.routes';
import { userRouter } from './app/user/routes/user.routes';
import { CustomErrorHandler } from './app/middlewares/custom-error-handler.middleware';

const app = express();
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('combined', { stream: accessLogStream }))

const whitelist = ['http://localhost:3333'];
const corsOptions = {
  // origin: function (origin, callback) {
  //   if (whitelist.indexOf(origin) !== -1) {
  //     callback(null, true)
  //   } else {
  //     callback(new Error('Not allowed by CORS'))
  //   }
  // },
  origin: 'http://localhost:3333',
  methods: ['GET', 'POST'],
};



app.use(cors(corsOptions));

userRouter(app);

taskRouter(app);

subTaskRouter(app);

app.use(CustomErrorHandler.notFound);
app.use(CustomErrorHandler.serverError);


const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
