export class ResponseHeaders {
  public static setReposneHeader(req, res,next) {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', `${req.headers.origin}`);
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-Requested-With,content-type, Authorization'
    );
    next();
  }
}
