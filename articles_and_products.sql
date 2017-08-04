DROP DATABASE IF EXISTS  articles_and_products;
DROP USER IF EXISTS ap_user;

CREATE USER ap_user WITH ENCRYPTED PASSWORD 'blueberry';
CREATE DATABASE articles_and_products WITH OWNER ap_user;

\c articles_and_products ap_user

DROP TABLE IF EXISTS products;

CREATE TABLE products (
  id SERIAL NOT NULL PRIMARY KEY,
  name VARCHAR(20),
  price money,
  inventory INT
);

INSERT INTO products VALUES
  (default, 'milk', 5, 40);