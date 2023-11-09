import mongoose from "mongoose";

const Schema = mongoose.Schema

const orderSchema = new Schema(
  {
    item: String,
    qty: Number,
    price: Number
  },{timestamps: true}
)

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema)
export default Order