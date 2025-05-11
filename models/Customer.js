import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  totalSpend: Number,
  visits: Number,
  lastActive: Date,
}, { timestamps: true });

const Customer = mongoose.model('Customer', customerSchema);
export default Customer;
