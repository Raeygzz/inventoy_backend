const express = require('express');
const router = express.Router();
const Category = require('../../models/category');


// Create Category
router.post('/create', async (req, res) => {
  const category = new Category({
    value: req.body.value
  });

  if (!category.value) {
    return res.status(400).json({ statusCode: 200, status: false, msg: 'Please include category' });
    
  }

  try {
    const newCategory = await category.save()
    if(newCategory != null) {
      res.json({statusCode: 200, status: true, msg: 'Category successfully saved' })

    } else {
      res.json({ statusCode: 200, status: false, msg: 'Category not saved' })
    }

  } catch(err) {
    if(err) throw err;
  }
});


// get all categories
router.get('/', async (req, res) => {
  let categories;
  try {
    categories = await Category.find().exec()
    if(categories != null) {
      res.json({statusCode: 200, status: true, categories: categories })

    } else {
      res.json({ statusCode: 200, status: false, categories: [] })
    }

  } catch {
    if(err) throw err;
  }
})


// Update category
router.put('/:id', async (req, res) => {
  let category;
  try {
    category = await Category.findById(req.params.id)
    
    category.value = req.body.value
    
    if(!category.value) {
      return res.json({ statusCode: 200, status: false, msg: 'Please include all required fields' });
    } 

    const updatedCategory = await category.save()

    if(updatedCategory != null) {
      res.json({statusCode: 200, status: true, msg: updatedCategory + 'Category successfully updated' })

    } else {
      res.json({ statusCode: 200, status: false, msg: 'Category update failed' })
    }

  } catch(err) {
    if(err) throw err
  }
})



// Delete category
router.delete('/:id', async (req, res) => {
  let category;
  try {
    category = await Category.findById(req.params.id)

    const categoryDeleted = await category.remove()

    if(categoryDeleted) {
      res.json({statusCode: 200, status: true, msg: 'Category deleted successfully' })

    } else {
      res.json({ statusCode: 200, status: false, msg: 'Category delete failed' })
    }

  } catch {
    res.json({ statusCode: 200, status: false, msg: 'Category not found' })
  }
})


module.exports = router;
