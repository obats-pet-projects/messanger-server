require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const apiRouter = require('./api/routes/api-routes');
const db = require('./config/database');

const app = express();
const port = 3030;

// Accept CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.text({ type: 'text/plain' }));

app.use('/api', apiRouter);

app.get('/', (req, res) => res.json('App get works'));
app.listen(port, () => console.log(`Server is running on port ${port}`));

// DB connection test
db.authenticate()
  .then(() => {
    console.log('Connection to DB has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the DB:', err);
  });

module.exports = app;
