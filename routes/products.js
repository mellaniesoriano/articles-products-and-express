/* jshint esversion: 6 */
const express = require('express');
const router = express.Router();
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const productsDB = require('../db/productsDB.js');

router.route('/')
.get((req, res) => {
  res.render('index', {catalog: productsDB.getProduct()});
})
.post((req, res) => {
  productsDB.checkProperties(req, res, productsDB);
});

module.exports = router;