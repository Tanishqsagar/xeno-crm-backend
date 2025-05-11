import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
  amount: Number,
  date: Date,
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
export default Order;
