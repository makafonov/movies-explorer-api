require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const { errors } = require('celebrate');

const { PORT, DATABASE_URL, limiter } = require('./config');
const { router } = require('./routes');
const { handleError } = require('./errors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

app.use(requestLogger);
app.use(limiter);
app.use(express.json());
app.use(cors());
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(handleError);

const main = () => {
  mongoose.connect(DATABASE_URL, {
    useNewUrlParser: true,
  });

  app.listen(PORT);
};

main();
