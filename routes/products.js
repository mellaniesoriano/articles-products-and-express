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
      res.render('index', {catalog: data});
    })
    .catch((err) => {
      console.log('did not get');
      console.log(err);
    });
})
.post((req, res) => {
  db.postToDb(req.body)
    .then((data) => {
      console.log('data posting?', req.body);
    })
    .catch((err) => {
      console.log('did not post');
      console.log(err);
    });
  productsDB.postProduct(req, res, productsDB);
});

router.route('/:id')
.get((req, res) => {
  db.getProdId(req.params.id)
    .then((data) => {
      res.render('product', data[0]);
      // console.log('ID data?', data);
    })
    .catch((err) => {
      console.log(err);
      // res.redirect('/products');
    });

})
.put((req,res) => {
  // const idNum = parseFloat(req.params.id);
  //   productsDB.putProduct(req, res, productsDB, idNum);
  db.editById(req.body, req.params.id)
    .then(() => {
      res.redirect(`/products${req.path}`);
    })
    .catch((err) => {
      res.redirect(`/products${req.path}/edit`);
    });
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
  db.getProdId(req.params.id)
    .then((data) => {
      res.render('edit', data[0]);
    })
    .catch(() => {
      res.render('/products');
    });

  // const idNum = parseFloat(req.params.id);
  // productsDB.productId(idNum);
  // res.render('edit', productsDB.productId(idNum));
});

module.exports = router;

