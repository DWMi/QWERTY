import mongoose from 'mongoose';

const ProductsSchema = mongoose.Schema(
    {
      sku: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      picturePath: String,
      price: Number,
      qty: Number,
      category: String,
    },
    { timestamps: true }
  );
  
  const Product = mongoose.model("Product", ProductsSchema) || mongoose.model('User', ProductsSchema);
  
  export default Product;