const express = require('express');

const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const PORTS = process.env.PORT || 8000;

app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());
dotenv.config({ path: './config.env' });
require('./db/conn');
app.use(express.json());

app.use(require('./router/routes'));

if (process.env.NODE_ENV == 'production') {
  app.use(express.static('client/build'));
} else {
  app.use(express.static('client/build'));
}

app.listen(PORTS, () => {
  console.log(`Server Running at port ${PORTS}`);
});
