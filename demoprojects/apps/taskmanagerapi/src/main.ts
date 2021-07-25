/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import * as express from 'express';
import * as cors from 'cors';
import { TOKEN_SECRET } from './global';

import { subTaskRouter } from './app/subtasks/routes/subtasks.routes';
import { taskRouter } from './app/task/routes/task.routes';
import { userRouter } from './app/user/routes/user.routes';

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

console.log(TOKEN_SECRET);

const whitelist = ['http://localhost:3333'];
const corsOptions = {
  // origin: function (origin, callback) {
  //   if (whitelist.indexOf(origin) !== -1 || !origin) {
  //     callback(null, true)
  //   } else {
  //     callback(new Error('Not allowed by CORS'))
  //   }
  // },
  origin: 'http://localhost:3333',
  methods: ['GET', 'POST'],
};

// const corsOptionsDelegate = function (req, callback) {
//   let corsOptions;
//   if (whitelist.indexOf(req.header('Origin')) !== -1) {
//     corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
//   } else {
//     corsOptions = { origin: false } // disable CORS for this request
//   }
//   callback(null, corsOptions) // callback expects two parameters: error and options
// }

app.use(cors(corsOptions));

userRouter(app);

taskRouter(app);

subTaskRouter(app);

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
