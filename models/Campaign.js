import mongoose from 'mongoose';

const campaignSchema = new mongoose.Schema({
  name: String,
  rules: Array, // [{ field: 'totalSpend', op: '>', value: 10000 }, ...]
  audienceSize: Number,
  createdAt: { type: Date, default: Date.now },
});

const Campaign = mongoose.model('Campaign', campaignSchema);
export default Campaign;
