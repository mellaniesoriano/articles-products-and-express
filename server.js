/* jshint esversion: 6 */
const express = require('express');
const exphbs = require('express-handlebars');
const app = express();

const PORT = process.env.PORT || 3000;

const articlesRoute = require('./routes/articles.js');
const productsRoute = require('./routes/products.js');

const server = app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});