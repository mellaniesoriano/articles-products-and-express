/* jshint esversion: 6 */
const express = require('express');
const exphbs = require('express-handlebars');
const router = express.Router();
const bodyParser = require('body-parser');

const articlesRoute = require('./routes/articles.js');
const productsRoute = require('./routes/products.js');

const app = express();
const PORT = process.env.PORT || 3000;

const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs'
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

app.use(bodyParser.json());
app.use('/products', productsRoute);
app.use('/articles', articlesRoute);


const server = app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});