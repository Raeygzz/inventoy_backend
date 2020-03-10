const mongoose = require('mongoose')

const orderRecordSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true
  },
  productQuantity: {
    type: String,
    required: true
  },
  productAmount: {
    type: String,
    required: true
  },
  productTotalAmount: {
    type: String,
    required: true
  },
  productProfitMargin: {
    type: String,
    required: true
  },
  dateOfSale: {
    type: String,
    required: true,
  },
  clientName: {
    type: String,
    required: true
  },
  clientAddress: {
    type: String,
    required: true
  },
  clientPhone: {
    type: String,
    required: true    
  },
  clientRelatedNote: {
    type: String,
  },
  pendingActivity: {
    type: String,
  },
  expenses: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  createdBy: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('OrderRecord', orderRecordSchema);
