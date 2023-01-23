import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    orderNumber: String,
    date: String,
    orderId: String,
    userId: String,
    orderItems: [],

    totalPrice: { type: Number, required: true },
    isSent: { type: Boolean, required: true },
    shipping_details: { type: Object, required: true},
    delivery_options: { type: Object, required: true},
    customer_details: { type: Object, required: true},
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);
export default Order;