// Next.js API route support: https://nextjs.org/docs/api-routes/
import db from '../../utils/db'
import User from '../../models/user';
import Product from '../../models/Product';
import mongoose from "mongoose";


const prodIds = [new mongoose.Types.ObjectId()];

export const productsArr = [
  {
    _id: prodIds[0],
    sku: "00AQW127",
    name: "Test product",
    picturePath: "test.jpeg",
    price: 999,
    qty: 2,
    category: 'Keyboards',
  },
];

export default async function handler(req, res) {
  await db.connect();
  const products = await Product.insertMany(productsArr)
  await db.disconnect();



  res.status(200).json(products)
}
