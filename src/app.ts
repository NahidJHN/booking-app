//External Lib  import
import express, { Application } from 'express';
import helmet from 'helmet';
// import xss from 'xss-clean';
import cors from 'cors';
import compression from 'compression';
import expressMongoSanitize from 'express-mongo-sanitize';
import httpStatus from 'http-status';
import passport from 'passport';

//Internal Lib  import
import routes from './routes/';
import jwtStrategy from './config/passport';
import { errorConverter, errorHandler } from './middlewares/errorHandler';
import { morganSuccessHandler, morganErrorHandler } from './config/morgan';
import config from './config/config';
import ApiError from './utils/ApiError';

const app: Application = express();

if (!config.IS_TEST) {
  app.use(morganSuccessHandler);
  app.use(morganErrorHandler);
}

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json({ limit: '50mb' }));

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
// app.use(xss());
app.use(expressMongoSanitize());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());

//i18next Internationalized
// initI18next(app);

// jwt authentication
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);


app.get('/health', (_req, res) => {
  res.send('Api Health is OK');
});

app.use(config.APP_PREFIX_PATH, routes);

// send back a 404 error for any unknown api request
app.use((_req, _res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

export default app;
