const mongoose = require("mongoose");
const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "pls enter product name"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "pls enter product description"],
  },
  price: {
    type: Number,
    required: [true, "pls enter product price"],
    maxLength: [7, "price cannot be more than 7 character"],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  categories:{
      type:String,
      required:[true,"pls enter required Product category"]
  },
  stock:{
      type:Number,
      required:[true,"pls enter product stock"],
      maxLength:[4,"stock cannot exceed 4 character"],
      default:1
  },
  numOfReviews:{
      type:String,
      default:0,
  },
  reviews:[{
      user:{
          type:mongoose.Schema.ObjectId,
          ref:"User",
          required:true,
      },
      name:{
          type:String,
          required:true,
      },
      rating:{
          type:String,
          required:true,
      },
      comment:{
          type:String,
          required:true,
      },
  },
],
createdAt:{
    type:Date,
    default:Date.now,
}

});
module.exports = mongoose.model("Product", productSchema);






