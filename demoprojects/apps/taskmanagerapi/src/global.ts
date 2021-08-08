import * as crypto from 'crypto';
import * as fs from 'fs';
import * as path from 'path';
import * as morgan from 'morgan';
import * as cors from 'cors';
import * as express from 'express';

export const TOKEN_SECRET = crypto.randomBytes(64).toString('hex');

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, 'access.log'),
  { flags: 'a' }
);
export const _morgan = morgan('combined', { stream: accessLogStream });

const whitelist = ['http://localhost:3333', 'http://localhost:4200'];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  //origin: 'http://localhost:3333',
  //methods: ['GET', 'POST'],
};
export const _cors = cors(corsOptions);

export const _app = express();
export const _router = express.Router();
_app.use(express.urlencoded({ extended: true }));
_app.use(express.json());
