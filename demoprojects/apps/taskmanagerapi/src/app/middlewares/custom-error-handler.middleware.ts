import { Request, Response, NextFunction } from 'express';
import { ErrorLogger } from '../middlewares/error-logger';

export class CustomErrorHandler {
  private status: number;
  private message: string;

  constructor(status: number, message: string) {
    this.status = status;
    this.message = message;
  }

  public static notFound = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    res.status(404).json({ errorMsg: 'Not found' });
  };

  public static serverError = (
    err,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    res
      .status(err.status || 500)
      .json({ errorMsg: err.message || 'Internal Server error' });
  };

  public static badRequest = (msg: string, error?) => {
    CustomErrorHandler.registerErrorLogger(error);
    return new CustomErrorHandler(400, msg);
  };

  public static internalServer = (msg: string, error?) => {
    CustomErrorHandler.registerErrorLogger(error);
    return new CustomErrorHandler(500, msg);
  };

  public static customErrrMsg = (status: number, msg: string, error?) => {
    CustomErrorHandler.registerErrorLogger(error);
    return new CustomErrorHandler(status, msg);
  };

  private static registerErrorLogger = (error) => {
    if (error) {
      ErrorLogger.errorLogger(error);
    }
  };
}
