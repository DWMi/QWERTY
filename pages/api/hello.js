// Next.js API route support: https://nextjs.org/docs/api-routes/
import mongoose from "mongoose";
import db from '../../utils/db'
import Product from '../../models/Product';
import Category from "../../models/Category";
import {ProductList} from '../../utils/productsList'


export default async function handler(req, res) {
  await db.connect();
  const products = await Product.find({Brand: 'Ducky'})
  await db.disconnect();



  res.status(200).json(products)
}
