const express = require('express')
const Role_Router = express.Router()
const {
    getAllRoles,
    getRole,
    addRole,
    updateRole,
    deleteRole
  } =require('../Controllers/Role.controller')

  
  const {protect,authorization} = require('../middleware/authMiddleware')

  Role_Router.route('/')
  .get(getAllRoles)
  .post(authorization,addRole)

  Role_Router.route(':/id')
  .get(getRole)
  .put(authorization,updateRole)
  .delete(authorization,deleteRole)
  

  module.exports = {Role_Router};