const express = require('express');
const router = express.Router();
const Product = require('../../models/product');


// Create Product
router.post('/create', async (req, res) => {
  const product = new Product({
    productName: req.body.productName,
    productQuantity: req.body.productQuantity,
    productAmount: req.body.productAmount,
    productTotalAmount: req.body.productTotalAmount,
    productAlert: req.body.productAlert,
    productDescription: req.body.productDescription,
  });

  if (!product.productName || !product.productQuantity || !product.productAmount || !product.productTotalAmount || !product.productAlert || !product.productDescription) {
    return res.status(400).json({ statusCode: 200, status: false, msg: 'Please include all required fields' });
    
  }

  try {
    const newProduct = await product.save()
    if(newProduct != null) {
      res.json({statusCode: 200, status: true, msg: 'Product successfully saved' })

    } else {
      res.json({ statusCode: 200, status: false, msg: 'Product not saved' })
    }

  } catch(err) {
    if(err) throw err;
  }
});


// get all product
router.get('/', async (req, res) => {
  let products;
  try {
    products = await Product.find().sort({ createdAt: 'desc' }).exec()
    if(products != null) {
      res.json({statusCode: 200, status: true, products: products })

    } else {
      res.json({ statusCode: 200, status: false, products: [] })
    }

  } catch {
    if(err) throw err;
  }
})


// get one product
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


// Update product
router.put('/:id', async (req, res) => {
  let product;
  try {
    product = await Product.findById(req.params.id)
    
    product.productName = req.body.productName
    product.productQuantity = req.body.productQuantity
    product.productAmount = req.body.productAmount
    product.productTotalAmount = req.body.productTotalAmount
    product.productAlert = req.body.productAlert
    product.productDescription = req.body.productDescription
    
    if(!product.productName || !product.productQuantity || !product.productAmount || !product.productTotalAmount || !product.productAlert || !product.productDescription) {
      return res.json({ statusCode: 200, status: false, msg: 'Please include all required fields' });
    } 

    const updatedProduct = await product.save()
    if(updatedProduct != null) {
      res.json({statusCode: 200, status: true, msg: 'Product successfully updated' })

    } else {
      res.json({ statusCode: 200, status: false, msg: 'Product update failed' })
    }

  } catch(err) {
    if(err) throw err
  }
})


// Delete product
router.delete('/:id', async (req, res) => {
  let product;
  try {
    product = await Product.findById(req.params.id)

    const productDeleted = await product.remove()

    if(productDeleted) {
      res.json({statusCode: 200, status: true, msg: 'Product deleted successfully' })

    } else {
      res.json({ statusCode: 200, status: false, msg: 'Product delete failed' })
    }

  } catch {
    res.json({ statusCode: 200, status: false, msg: 'Product not found' })
  }
})


module.exports = router;
