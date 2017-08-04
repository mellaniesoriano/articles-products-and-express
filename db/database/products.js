/* jshint esversion: 6 */
const pgp = require('pg-promise')();
const connection = require('./connection.js');
const db = pgp(connection.connectionOptions);

// const connection = require('./connection.js');

const getAllProducts = () => {
  return db.query('SELECT * FROM products');
};

const postToDb = () => {
  return db.one('INSERT INTO products(id, name, price, inventory) VALUES(${id}, ${name}, ${price}, ${inventory})');
};

module.exports = {
  getAllProducts,
  postToDb
};