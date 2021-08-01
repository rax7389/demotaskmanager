/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import * as express from 'express';

import { subTaskRouter } from './app/subtasks/routes/subtasks.routes';
import { taskRouter } from './app/task/routes/task.routes';
import { userRouter } from './app/user/routes/user.routes';
import { CustomErrorHandler } from './app/middlewares/custom-error-handler.middleware';
import { ResponseHeaders } from './app/middlewares/response-headers.middleware';
import { _morgan, _cors } from './global';

const app = express();
const router = express.Router();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(_morgan);
//app.options('*', cors(corsOptions))
app.use(_cors);
router.use(ResponseHeaders.setReposneHeader);

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
