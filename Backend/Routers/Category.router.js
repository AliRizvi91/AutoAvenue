const express = require('express')
const Category_Router = express.Router()
const {getAllSCategories,
    getCategory,
    addCategory,
    updateCategory,
    deleteCategory
  } =require('../Controllers/Category.controller')

  const {protect,authorization} = require('../middleware/authMiddleware')

  Category_Router.route('/')
  .get(getAllSCategories)
  .post(authorization,addCategory)

  Category_Router.route(':/id')
  .get(getCategory)
  .put(authorization,updateCategory)
  .delete(authorization,deleteCategory)
  

  module.exports = {Category_Router};