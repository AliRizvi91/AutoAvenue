const express = require('express')
const CityArea_Router = express.Router()
const {
    getAllCityAreas,
    getCityArea,
    addCityArea,
    updateCityArea,
    deleteCityArea
  } =require('../Controllers/CityArea.controller')

  const {protect,authorization} = require('../middleware/authMiddleware')

  CityArea_Router.route('/')
  .get(getAllCityAreas)
  .post(authorization,addCityArea)

  CityArea_Router.route(':/id')
  .get(getCityArea)
  .put(authorization,updateCityArea)
  .delete(authorization,deleteCityArea)
  

  module.exports= {CityArea_Router};