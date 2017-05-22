import express from 'express';
import path from 'path';
import session from '../middleware/session';
import statics from '../middleware/static';
import logger from '../middleware/logger';
import urlEncode from '../middleware/urlEncode';
import json from '../middleware/json';
import routes from '../routes';
import basket from '../routes/basket';
import catalog from '../routes/catalog';
import mongoose from 'mongoose';

// Mongo DB
const mongodb = process.env.MONGODB_URI || 'mongodb://localhost/basket';
mongoose.connect(mongodb);
// eslint-disable-next-line no-console
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error.'));
// eslint-disable-next-line no-console
mongoose.connection.once('open', console.log.bind(console, 'Connected to MongoDB'));

const app = express();
app.disable('x-powered-by');

// View engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');

app.use(logger(app));
app.use(json);
app.use(urlEncode);
app.use(statics);
app.use(session);

// Routes
app.use('/', routes);
app.use('/basket', basket);
app.use('/catalog', catalog);
app.use('/admin/catalog', catalog);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handler
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  res
    .status(err.status || 500)
    .render('error', {
      message: err.message
    });
});

export default app;
