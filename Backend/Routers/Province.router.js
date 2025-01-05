const express = require('express')
const Province_Router = express.Router()
const {
    getAllProvinceses,
    getProvince,
    addProvince,
    updateProvince,
    deleteProvince
  } =require('../Controllers/Province.controller')
  
  const {protect,authorization} = require('../middleware/authMiddleware')

  Province_Router.route('/')
  .get(getAllProvinceses)
  .post(authorization,addProvince)

  Province_Router.route(':/id')
  .get(getProvince)
  .put(authorization,updateProvince)
  .delete(authorization,deleteProvince)
  

  module.exports = {Province_Router};