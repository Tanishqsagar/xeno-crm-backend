import mongoose from 'mongoose';

const logSchema = new mongoose.Schema({
  campaignId: { type: mongoose.Schema.Types.ObjectId, ref: 'Campaign' },
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
  message: String,
  status: { type: String, enum: ['SENT', 'FAILED'], default: 'SENT' },
}, { timestamps: true });

const CommunicationLog = mongoose.model('CommunicationLog', logSchema);
export default CommunicationLog;
