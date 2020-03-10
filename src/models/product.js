const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
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
  productUnit: {
    type: String,
    required: true
  },
  productProfitMargin: {
    type: String,
    required: true
  },
  productAlert: {
    type: String,
    required: true
  },
  productDescription: {
    type: String,
    required: true
  },
  // productMarketScale: {
  //   type: String,
  //   required: true
  // },
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

module.exports = mongoose.model('Product', productSchema);
