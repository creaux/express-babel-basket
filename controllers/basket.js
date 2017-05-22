import * as Basket from '../models/basket';
import get from 'lodash/get';
import Promise from 'promise'

const render = (res, result) => {
  const products = get(result, 0, []);
  const total = get(result, 1, 0);
  res.render('basket', { title: 'Basket', products, total })
};

export const add = ({ body, session }, res) => {
  const { _id } = body;

  Basket.add(session, _id);
  res.redirect('/basket');
};

export const remove = ({ body, session }, res) => {
  const { _id } = body;

  Basket.remove(session, _id);
  res.redirect('/basket');
};

const basket = (req, res) => {
  const { session } = req;

  Promise.all([
    Basket.read(session),
    Basket.total(session),
  ])
    .then(render.bind(null, res))
    .catch(render.bind(null, res))
};

export default basket;
