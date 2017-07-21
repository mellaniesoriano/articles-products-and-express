/* jshint esversion: 6 */

let catalog = [];
let id = 1;
let product;

// gets all the products
const allTheProducts = () => {
  return catalog;
};

// adds new products to catalog array
const catalogObj = (body) => {
  catalog.push({'name': body.name,
    'price': body.price,
    'inventory': body.inventory,
    'id': id++
  });
  console.log('catalogObj..', catalog);
  return catalog;
};

// displays posted products
const postProduct = (req, res, productsDB) => {
  let propertiesExist = (req.body.hasOwnProperty('name') && req.body.hasOwnProperty('price') && req.body.hasOwnProperty('inventory'));

  if (propertiesExist) {
    productsDB.catalogObj(req.body);
    res.redirect('/products');
  } else {
    res.render('new', productsDB.errorMsg('newError'));
  }
};

// returns product
const productId = (idNum) => {
  console.log('productId id:', idNum);
  for (let i = 0; i < catalog.length; i++) {
    if (catalog[i].id === idNum) {
      product = catalog[i];
    }
  }
  console.log('checking product..', product);
  return product;
};

// checks if ID exists in catalog
const checkID = (idNum) => {
  console.log('checkID idNum...', idNum);
  for (let i = 0; i < catalog.length; i++){
    console.log('checkID catalog[i]..', catalog[i]);
    if (catalog[i].id === idNum) {
      return true;
    }
  }
};

// edits a product
const editProduct = (body, idNum) => {
  catalog.forEach((x) => {
    if (x.id === idNum) {
      x.name = body.name;
    }
  });
  console.log(catalog);
  return catalog;
};

// changes existing product
const putProduct = (req, res, productsDB, idNum) => {
  let propertiesExist = (productsDB.checkID(idNum) && req.body.name && req.body.price && req.body.inventory);

  if (propertiesExist) {
    productsDB.editProduct(req.body, idNum);
    // console.log('put worked!');
    res.redirect(303, `/products/${idNum}`);
  } else {
    // console.log('nooope, try again');
    res.render('edit', productsDB.error('editError'));
  }
};

const deleteProduct = (idNum) => {
  let deleted = catalog.splice(catalog.indexOf(productId(idNum)), 1);
  console.log('deleted = ', deleted);
  return deleted;
};

const successMsg = () => {
  return {deleteSuccess: 'You deleted a product!!'};
};

const error = (err) => {
  let obj = {
    'newError' : 'Unable to create new product.',
    'editError' : 'Unable to edit product.'
  };
  return {error: obj[err]};
};


module.exports = {
  allTheProducts,
  catalogObj,
  postProduct,
  productId,
  checkID,
  editProduct,
  putProduct,
  deleteProduct,
  successMsg,
  error
};