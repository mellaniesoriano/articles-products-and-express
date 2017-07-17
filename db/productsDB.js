/* jshint esversion: 6 */

let catalog = [];
let id = 0;
let product;

const getProduct = () => {
  return catalog;
};

const postProduct = (body) => {
  catalog.push({'name': body.name,
    'price': body.price,
    'inventory': body.inventory,
    'id': id++
  });
  console.log(catalog);
  return catalog;
};

const checkProperties = (req, res, productsDB) => {
  const propertiesExist = (req.body.hasOwnProperty('name') && req.body.hasOwnProperty('price') && req.body.hasOwnProperty('inventory'));

  if (propertiesExist) {
    productsDB.postProduct(req.body);
    res.redirect('/products');
  }
};

module.exports = {
  getProduct,
  postProduct,
  checkProperties
};