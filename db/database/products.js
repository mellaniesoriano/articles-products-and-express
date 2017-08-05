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
  return db.any('SELECT * FROM products WHERE id = $1', [id]);
};

const editById = (newProdInfo, id) => {
  return db.none('UPDATE products SET name = $1, price = $2, inventory = $3 WHERE ID = $4', [newProdInfo.name, newProdInfo.price, newProdInfo.inventory, id]);
};

module.exports = {
  getAllProducts,
  postToDb,
  getProdId,
  editById
};