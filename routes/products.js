/* jshint esversion: 6 */
const express = require('express');
const router = express.Router();
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const productsDB = require('../db/productsDB.js');
const methodOverride = require('method-override');

const db = require('../db/database/products.js');

router.route('/')
.get((req, res) => {
  db.getAllProducts()
    .then((data) => {
      console.log('data showing?', data);
    })
    .catch((err) => {
      console.log('did not get');
    });
  res.render('index', {catalog: productsDB.allTheProducts()});
})
.post((req, res) => {
  productsDB.postProduct(req, res, productsDB);
  db.postToDb()
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log('did not post');
    });
});

router.route('/:id')
.get((req, res) => {
  const idNum = parseFloat(req.params.id);
  console.log('what am i getting?', productsDB.productId(idNum));
 productsDB.productId(idNum);
 res.render('product', productsDB.productId(idNum));
})
.put((req,res) => {
  const idNum = parseFloat(req.params.id);
    productsDB.putProduct(req, res, productsDB, idNum);
  })
.delete((req, res) => {
  const idNum = parseFloat(req.params.id);
  if (productsDB.checkID(idNum)) {
    productsDB.deleteProduct(idNum);
    res.render('index', productsDB.successMsg('deleteSuccess'));
  } else {
    res.redirect('/products');
  }
});

router.route('/new')
.get((req, res) => {
  res.render('new');
});

router.route('/:id/edit')
.get((req, res) => {
  const idNum = parseFloat(req.params.id);
  productsDB.productId(idNum);
  res.render('edit', productsDB.productId(idNum));
});

module.exports = router;

