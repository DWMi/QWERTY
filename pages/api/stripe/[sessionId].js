import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
import db from "../../../utils/db";
import Order from "../../../models/Order";
const orderid = require('order-id')('key');
import { getSession } from 'next-auth/react';


const handler = async (req, res) => {
  if (req.method === "GET") {
    try {
      const sessionId = req.query.sessionId;
      const userSession = await getSession({req})

      if (!sessionId.startsWith("cs_")) {
        throw Error("Incorrect checkout session ID!");
      }
      const checkoutSession = await stripe.checkout.sessions.retrieve(
        sessionId,
        {
          expand: ["line_items.data.price.product", "customer"],
        }
      );

      if (checkoutSession.payment_status !== "paid") {
        throw Error("This order has not been paid!");
      }

      await db.connect();
      const existingOrder = await Order.findOne({
        orderId: checkoutSession.id,
      });
      if (existingOrder) {
        res.status(422).json({ message: "Order already saved in database!", order: existingOrder });
        await db.disconnect();
        return;
      }

      const newOrder = new Order({
        orderNumber: orderid.generate(),
        date: new Date().toISOString().split("T")[0],
        orderId: checkoutSession.id,
        userId: userSession.user._id,
        orderItems: checkoutSession.line_items.data.map((item) => {
            return {
                amount_total: item.amount_total / 100,
                product_name: item.price.product.name,
                qty: item.quantity,
                unit_price: item.price.unit_amount / 100,
                selectedSwitch: item.price.product.metadata.selectedSwitch
            }
        }),
        totalPrice: checkoutSession.amount_total / 100,
        shipping_details: checkoutSession.shipping_details.address,
        customer_details: {
            address: checkoutSession.customer_details.address,
            name: checkoutSession.customer_details.name
        },
        isSent: false,

      });

      const order = await newOrder.save();
      db.disconnect();

      res.status(201).send({
        message: "New Order added!",
        order,
      });
    } catch (err) {
      console.error(err.message);
      return res.status(500).json(err.message);
    }
  }
};

export default handler;
