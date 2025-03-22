'use strict'

const dotenv = require('dotenv');
dotenv.config({ path: './.env' });
const app = require('./src/app');

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`App running on port ${PORT}...`);
});

