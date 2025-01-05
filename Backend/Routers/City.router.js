const express = require('express')
const City_Router = express.Router()
const {getAllCities,
    getCity,
    addCity,
    updateCity,
    deleteCity
  } =require('../Controllers/City.controller')
  
  const {protect,authorization} = require('../middleware/authMiddleware')


  City_Router.route('/')
  .get(authorization,getAllCities)
  .post(authorization,addCity)

  City_Router.route(':/id')
  .get(getCity)
  .put(authorization,updateCity)
  .delete(authorization,deleteCity)
  

  module.exports = {City_Router};