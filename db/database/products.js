/* jshint esversion: 6 */
const pgp = require('pg-promise')();
const connection = require('./connection.js');
const db = pgp(connection.connectionOptions);

// const connection = require('./connection.js');

const getAllProducts = () => {
  return db.query('SELECT * FROM products');
};

const postToDb = (postInfo) => {
  let catalog = {
    name : postInfo.name,
    price : postInfo.price,
    inventory : postInfo.inventory
  };
  return db.none('INSERT INTO products VALUES(default, ${name}, ${price}, ${inventory})', catalog);
};

module.exports = {
  getAllProducts,
  postToDb
};