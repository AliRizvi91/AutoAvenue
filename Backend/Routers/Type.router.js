const express = require('express')
const Type_Router = express.Router()
const {
    getAllTypes,
    getType,
    addType,
    updateType,
    deleteType
  } =require('../Controllers/Type.controller')

  Type_Router.route('/')
  .get(getAllTypes)
  .post(addType)

  Type_Router.route(':/id')
  .get(getType)
  .put(updateType)
  .delete(deleteType)
  

  module.exports = {Type_Router};