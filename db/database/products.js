/* jshint esversion: 6 */
const pgp = require('pg-promise')();
const connection = require('./connection.js');
const db = pgp(connection.connectionOptions);

// const connection = require('./connection.js');

const getAllProducts = () => {
  return db.any('SELECT * FROM products');
};

const postToDb = (postInfo) => {
  return db.none('INSERT INTO products( name, price, inventory) VALUES($1, $2, $3)', [postInfo.name, postInfo.price, postInfo.inventory]);
};

const getProdId = (id) => {
  console.log(id);
  return db.one('SELECT * FROM products WHERE id = $1', [id]);
};

module.exports = {
  getAllProducts,
  postToDb,
  getProdId
};