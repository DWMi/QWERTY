// Next.js API route support: https://nextjs.org/docs/api-routes/
import mongoose from "mongoose";
import db from "../../utils/db";
import Product from "../../models/Product";
import Category from "../../models/Category";
import { ProductList } from "../../utils/productsList";
import bcrypt from "bcryptjs";
import User from "../../models/User";

export default async function handler(req, res) {
  await db.connect();
  const users = await User.insertMany(userObj);
  await db.disconnect();

  res.status(200).json(users);
}

const userObj = [
  {
    firstName: "Toni",
    lastName: "Tonelli",
    email: "test@test.com",
    password: bcrypt.hashSync("12345"),
    address: "123 holly road, San Francisco, CA, USA",
    isAdmin: false,
  },
];
