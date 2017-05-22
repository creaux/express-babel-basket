import { Schema } from 'mongoose';

const product = new Schema({
  title: { type: 'string', max: 100 },
  price: { type: 'number', max: 999999 },
});

export default product;
