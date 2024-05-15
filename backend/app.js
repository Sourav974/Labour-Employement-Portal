const express = require('express');
const userRouter = require('./routes/userRoutes.js');
const morgan = require('morgan');

const cors = require('cors');

const app = express();

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Body parser, reading data from the body into req.body
app.use(express.json({ limit: '10kb' }));

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Routes

app.use('/api/v1/users', userRouter);

module.exports = app;
