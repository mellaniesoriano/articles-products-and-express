/* jshint esversion: 6 */

// const pgp = require('pg-promise')();

const { DATABASE, USER, PASSWORD } = require('../../config/config.json');

const connectionOptions = {
  host : 'localhost',
  port : 5432,
  database : DATABASE,
  user : USER,
  password : PASSWORD
};

module.exports = {
  connectionOptions
};

// const db = pgp(connectionOptions);