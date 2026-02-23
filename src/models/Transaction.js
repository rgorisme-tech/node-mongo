const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId
  },
  wallet: {
    type: String,
    required: true
  },
  payment: {
    currency: {
      type: Number
    },
    amount: {
      type: Number,
      default: 100
    },
    transaction: {
      type: String,
      default: 'transaction'
    }
  },

  details: {
    stage: {
      type: Number,
      default: '1'
    },
    token_price: {
      type: Number
    },
    token_bonus: {
      type: Number
    },
    amount: {
      type: Number
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('transaction', TransactionSchema);
