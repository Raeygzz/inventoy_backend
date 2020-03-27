const express = require('express');
const router = express.Router();
const OrderRecord = require('../../models/orderRecord');
const Product = require('../../models/product');
const Client = require('../../models/client');


// Create orderRecord
router.post('/create', async (req, res) => {
  const orderRecord = new OrderRecord({
    productName: req.body.productName,
    productQuantity: req.body.productQuantity,
    productAmount: req.body.productAmount,
    productTotalAmount: req.body.productTotalAmount,
    productProfitMargin: req.body.productProfitMargin,
    dateOfSale: req.body.dateOfSale,
    clientName: req.body.clientName,
    clientAddress: req.body.clientAddress,
    clientPhone: req.body.clientPhone,
    clientRelatedNote: req.body.clientRelatedNote,
    pendingActivity: req.body.pendingActivity,
    expenses: req.body.expenses,
    createdBy: req.body.createdBy
  });

  if (!orderRecord.productName || !orderRecord.productQuantity || !orderRecord.productAmount || !orderRecord.productTotalAmount || !orderRecord.productProfitMargin || !orderRecord.dateOfSale || !orderRecord.clientName || !orderRecord.clientAddress || !orderRecord.clientPhone || !orderRecord.expenses || !orderRecord.createdBy) {
    return res.status(400).json({ statusCode: 200, status: false, msg: 'Please include all required fields' });
    
  }

  try {
    const newOrderRecord = await orderRecord.save()
    if(newOrderRecord != null) {
      res.json({statusCode: 200, status: true, msg: 'Order Record successfully saved' })

    } else {
      res.json({ statusCode: 200, status: false, msg: 'Order Record not saved' })
    }

  } catch(err) {
    res.json({ statusCode: 200, status: false, err: err, msg: 'Order Record not saved' })
  }
});


// get all order record
router.get('/', async (req, res) => {
  let orderRecords;
  try {
    orderRecords = await OrderRecord.find().sort({ createdAt: 'desc' }).exec()
    if(orderRecords != null) {
      res.json({statusCode: 200, status: true, orderRecords: orderRecords })

    } else {
      res.json({ statusCode: 200, status: false, orderRecords: [] })
    }

  } catch(err) {
    res.json({ statusCode: 200, status: false, err: err, orderRecords: [] })
  }
})



// get product and client details for order record
router.get('/list', async (req, res) => {
  let productsList;
  let clientsList;

  try {
    productsList = await Product.find()
    clientsList = await Client.find()

    if(productsList != null && clientsList != null) {
      const params = {
        productsList: productsList, 
        clientsList: clientsList
      }
      res.json({statusCode: 200, status: true, params: params })

    } else {
      res.json({ statusCode: 200, status: false, params: [] })
    }

  } catch(err) {
    res.json({ statusCode: 200, status: false, err: err, params: [] })
  }
})



// get one order record by id
router.get('/:id', async (req, res) => {
  let oneOrderRecordById;

  try {
    oneOrderRecordById = await OrderRecord.findById(req.params.id)

    if(oneOrderRecordById != null) {
      res.json({statusCode: 200, status: true, orderRecord: oneOrderRecordById })

    } else {
      res.json({ statusCode: 200, status: false, orderRecord: [] })
    }

  } catch(err) {
    res.json({ statusCode: 200, status: false, err: err, orderRecord: [] })
  }
})


// get one order record
// router.get('/', async (req, res) => {
//   let searchOptions = {};
//   if(req.query.productName != null && req.query.productName !== '') {
//     searchOptions.productName = new RegExp(req.query.productName, 'i');
//   }

//   try {
//     const product = await Product.find(searchOptions)

//     if(product != null) {
//       res.json({statusCode: 200, status: true, product: product })

//     } else {
//       res.json({ statusCode: 200, status: false, product: [] })
//     }

//   } catch {
//     if(err) throw err;
//   }
// })


// Update order record
router.put('/:id', async (req, res) => {
  let orderRecord;
  try {
    orderRecord = await OrderRecord.findById(req.params.id)
    
    orderRecord.productName = req.body.productName;
    orderRecord.productQuantity = req.body.productQuantity;
    orderRecord.productAmount = req.body.productAmount;
    orderRecord.productTotalAmount = req.body.productTotalAmount;
    orderRecord.productProfitMargin = req.body.productProfitMargin;
    orderRecord.dateOfSale = req.body.dateOfSale;
    orderRecord.clientName = req.body.clientName;
    orderRecord.clientAddress = req.body.clientAddress;
    orderRecord.clientPhone = req.body.clientPhone;
    orderRecord.clientRelatedNote = req.body.clientRelatedNote;
    orderRecord.pendingActivity = req.body.pendingActivity;
    orderRecord.expenses = req.body.expenses;
    orderRecord.createdBy = req.body.createdBy;
    
    if(!orderRecord.productName || !orderRecord.productQuantity || !orderRecord.productAmount || !orderRecord.productTotalAmount || !orderRecord.productProfitMargin || !orderRecord.dateOfSale || !orderRecord.clientName || !orderRecord.clientAddress || !orderRecord.clientPhone || !orderRecord.expenses || !orderRecord.createdBy) {
      return res.json({ statusCode: 200, status: false, msg: 'Please include all required fields' });
    } 

    const updatedOrderRecord = await orderRecord.save()
    if(updatedOrderRecord != null) {
      res.json({statusCode: 200, status: true, msg: 'Order Record successfully updated' })

    } else {
      res.json({ statusCode: 200, status: false, msg: 'Order Record update failed' })
    }

  } catch(err) {
    res.json({ statusCode: 200, status: false, err: err, msg: 'Order Record update failed' })
  }
})


// Delete order record
router.delete('/:id', async (req, res) => {
  let orderRecord;
  try {
    orderRecord = await OrderRecord.findById(req.params.id)

    const orderRecordDeleted = await orderRecord.remove()

    if(orderRecordDeleted) {
      res.json({statusCode: 200, status: true, msg: 'Order Record deleted successfully' })

    } else {
      res.json({ statusCode: 200, status: false, msg: 'Order Record delete failed' })
    }

  } catch {
    res.json({ statusCode: 200, status: false, err: err, msg: 'Order Record not found' })
  }
})


module.exports = router;
