/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { subTaskRouter } from './app/subtasks/routes/subtasks.routes';
import { taskRouter } from './app/task/routes/task.routes';
import { userRouter } from './app/user/routes/user.routes';
import { CustomErrorHandler } from './app/middlewares/custom-error-handler.middleware';
import { ResponseHeaders } from './app/middlewares/response-headers.middleware';
import { _morgan, _cors, _app, _router } from './global';

_app.use(_morgan);
//app.options('*', cors(corsOptions))
_app.use(_cors);
_router.use(ResponseHeaders.setReposneHeader);

userRouter(_app);
taskRouter(_app);
subTaskRouter(_app);

_app.use(CustomErrorHandler.notFound);
_app.use(CustomErrorHandler.serverError);

const port = process.env.port || 3333;
const server = _app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
