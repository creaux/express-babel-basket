import * as Product from './product';
import extend from 'lodash/extend';
import findIndex from 'lodash/findIndex';
import get from 'lodash/get';
import omit from 'lodash/omit';
import Promise from 'promise';

const { assign } = Object;

export const read = (session) => {
  const { basket } = session;

  if (basket) {
    return Product.read().then(products => {
      const result = basket.map(item => {
        const matching = products.find(product => product._id.toString() === item._id.toString());
        return { _id: matching._id, title: matching.title, count: item.count, price: matching.price };
      }).filter(Boolean);
      return result;
    });
  } else {
    return Promise.reject([]);
  }
};

export const add = (session, _id) => {
  if (!session.basket) session.basket = [];
  const current = session.basket.find(product => product._id.toString() === _id.toString());
  if (!current) {
    const data = { _id, count: 1 };
    session.basket.push(data);
  } else {
    const { _id, count } = current;
    const index = findIndex(session.basket, { _id });
    const data = extend(get(session.basket, index), { count: parseInt(count) + 1 });
    session.basket[index] = data;
  }
};

export const remove = (session, _id) => {
  if (!session.basket) session.basket = []; // TODO Not necessary
  const index = session.basket.map(item => item._id).indexOf(_id);
  const current = get(session.basket, [index]);
  const count = get(session.basket, [index, 'count']);
  if(count > 1) {
    session.basket[index] = assign(omit(current, 'count'), { count: count - 1 });
  } else {
    session.basket.splice(index, 1);
  }
};

export const total = (session) => {
  return read(session).then((basket) => {
    const result = basket.reduce((prev, next) => {
      return { price: prev.price + (next.price * next.count) };
    }, { price: 0, count: 1 });
    return get(result, 'price', 0);
  });
};
