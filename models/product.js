import mongoose from 'mongoose';
import product from '../schemas/product';

const Product = mongoose.model('Product', product);

export const create = (title, price) => (
  Product.create({ title, price: price ? parseInt(price) : 0 })
    .then(() => console.log(`Product writen successfuly.`))
    .catch((err) => {
      throw new Error(`Can't add product. ${err}`)
    })
);

export const remove = (_id) => {
  return Product.remove({ _id })
    .catch(() => {
      throw new Error(`Can't remove Product with _id: ${_id}`)
    })
    .then(() => console.log(`Product with _id: ${_id} removed successfuly.`))
};

export const read = () => (
  Product.find().exec((err, products) => {
    if (err) throw new Error('Error reading products from db.');
    return products;
  })
);
