const express = require('express')
const Status_Router = express.Router()
const {
    getAllStatuses,
    getStatus,
    addStatus,
    updateStatus,
    deleteStatus
  } =require('../Controllers/Status.controller')
  
  const {protect,authorization} = require('../middleware/authMiddleware')

  Status_Router.route('/')
  .get(getAllStatuses)
  .post(authorization,addStatus)

  Status_Router.route(':/id')
  .get(getStatus)
  .put(authorization,updateStatus)
  .delete(authorization,deleteStatus)
  

  module.exports = {Status_Router};