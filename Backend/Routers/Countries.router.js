const express = require('express')
const Country_Router = express.Router()
const {
    getAllCountries,
    getCountry,
    addCountry,
    updateCountry,
    deleteCountry
  } =require('../Controllers/countries.controller')
  
  const {protect,authorization} = require('../middleware/authMiddleware')

  Country_Router.route('/')
  .get(getAllCountries)
  .post(authorization,addCountry)

  Country_Router.route(':/id')
  .get(getCountry)
  .put(authorization,updateCountry)
  .delete(authorization,deleteCountry)
  

  module.exports = {Country_Router};