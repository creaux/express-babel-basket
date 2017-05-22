import * as Product from '../models/product';
import {
  CATALOG
} from '../constants';

const catalog = (req, res) => {
  Product
    .read()
    .then(products => res.render(CATALOG, { products, title: 'Catalog' }));
};

export const create = ({ body }, res) => {
  const { title, price } = body;

  Product.create(title, parseInt(price)).then(() => {
    res.status(200);
    res.redirect(`/${CATALOG}`);
  });
};

export const remove = ({ body }, res) => {
  const { _id } = body;

  Product.remove(_id).then(() => {
    res.status(200);
    res.redirect(`/${CATALOG}`);
  });
};

export default catalog;
