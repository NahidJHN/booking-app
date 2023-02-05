//External Lib  import
import mongoose from 'mongoose';

//Internal Lib  import
// import app from './app';
import config from './config/config';
import logger from './config/logger';

import app from './app';

const options = {
  user: config.DB.USER,
  pass: config.DB.PASSWORD,
  dbName: config.DB.NAME,
  autoIndex: true,
  useNewUrlParser: true,
};

logger.debug(config.DB_URI);
logger.info('connecting to database...');

mongoose
  .connect(config.DB_URI, options)
  .then(() => {
    logger.info('Mongoose connection done');
    app.listen(config.APP_PORT, () => {
      logger.info(`server listening on ${config.APP_PORT}`);
    });
  })
  .catch((e) => {
    logger.info('Mongoose connection error');
    logger.error(e);
  });

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', () => {
  logger.debug('Mongoose default connection open to ' + config.DB_URI);
});

// If the connection throws an error
mongoose.connection.on('error', (err) => {
  logger.error('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', () => {
  logger.info('Mongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection (ctrl + c)
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    logger.info(
      'Mongoose default connection disconnected through app termination'
    );
    process.exit(0);
  });
});

process.on('uncaughtException', (err) => {
  logger.error('Uncaught Exception: ' + err);
});
