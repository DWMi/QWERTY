const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const userSession = await getSession({ req });
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        customer_email: userSession ? userSession.user.email : undefined,
        billing_address_collection: "auto",
        shipping_address_collection: {
          allowed_countries: ["SE", "DE"],
        },
        line_items: req.body.cartItems.map((product) => {
          return {
            price_data: {
              currency: "sek",
              unit_amount: product.price * 100,
              product_data: {
                name: product.name,
                metadata: {
                  selectedSwitch: product.selectedSwitch
                },
              },
            },
            quantity: product.quantity,
         
          };
        }),
        mode: "payment",
        success_url: `${req.headers.origin}/checkout/success?sessionId={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/?canceled=true`,
      });
      res.json({ id: session.id });
      console.log(session);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
