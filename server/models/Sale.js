import mongoose from 'mongoose';

const saleSchema = new mongoose.Schema({
  item: { type: String, required: true },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  date: { type: Date, default: Date.now },
  seller: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

const Sale = mongoose.model('Sale', saleSchema);

export default Sale;
