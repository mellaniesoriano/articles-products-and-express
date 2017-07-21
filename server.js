/* jshint esversion: 6 */
const express = require('express');
const exphbs = require('express-handlebars');
const router = express.Router();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const articlesRoute = require('./routes/articles.js');
const productsRoute = require('./routes/products.js');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded());
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs'
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

app.use('/products', productsRoute);
app.use('/articles', articlesRoute);


const server = app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});