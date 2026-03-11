import mongoose from 'mongoose';

const transactionSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50
  },
  amount: {
    type: Number,
    required: true,
    maxLength: 20,
    trim: true
  },
  type: {
    type: String,
    default: 'expense',
    enum: ['income', 'expense']
  },
  date: {
    type: Date,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    maxLength: 100,
    trim: true
  },
}, {timestamps: true})

export default mongoose.model('Transaction', transactionSchema);
