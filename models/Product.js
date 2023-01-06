import mongoose from 'mongoose';

const ProductsSchema = mongoose.Schema(
    {
      sku: {
        type: String,
        required: false,
      },
      Name: {
        type: String,
        required: true,
      },
      Brand: {
        type: String,
        required: false,
      },
      Img1: String,
      Img2: String,
      Price: Number,
      Qty: Number,
      Category: String,
    },
    { timestamps: true }
  );
  
  const Product = mongoose.models.Product || mongoose.model("Product", ProductsSchema);
  
  export default Product;