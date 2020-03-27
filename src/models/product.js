const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true
  },
  // productImage: {
  //   type: Buffer,
  //   // required: true
  // },
  // productImageType: {
  //   type: String,
  //   required: true
  // },
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


// productSchema.virtual('coverImagePath').get(function() {
//   if(this.coverImage != null && this.coverImageType != null) {
//     return `data:${this.coverImageType};charset=utf-8;base64,${this.coverImage.toString('base64')}`
//   }
// })

module.exports = mongoose.model('Product', productSchema);
