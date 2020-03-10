const mongoose = require('mongoose')

const clientSchema = new mongoose.Schema({
  clientName: {
    type: String,
    required: true
  },
  clientAddress: {
    type: String,
    required: true
  },
  clientEmail: {
    type: String,
    required: true
  },
  clientPhone: {
    type: String,
    required: true    
  },
  clientAnotherPhone: {
    type: String
  },
  clientCompanyName: {
    type: String,
    required: true
  },
  clientRelatedNote: {
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

module.exports = mongoose.model('Client', clientSchema);