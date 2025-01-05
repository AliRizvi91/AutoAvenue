// routes/advertisment.routes.js
const express = require('express');
const Advertisment_Router = express.Router();
const  Advertisment_model = require('../models/Advertisments')
const { upload } = require('../middleware/multer.middleware');
const {
  getAllAdvertisments,
  getAdvertisment,
  addAdvertisment,
  updateAdvertisment,
  deleteAdvertisment,
  SearchAdvertisment,
} = require('../Controllers/Advertisment.controller');


const {protect,authorization} = require('../middleware/authMiddleware')
// Ensure Authentication Middleware is used
// Advertisment_Router.use(Authentication);

Advertisment_Router.route('/')
  .get(getAllAdvertisments)
  .post(upload.single('image'), addAdvertisment);

Advertisment_Router.route('/:id')
  .get(getAdvertisment)
  .put(authorization,upload.single('image'),updateAdvertisment)
  .delete(authorization,deleteAdvertisment);

Advertisment_Router.post('/search', SearchAdvertisment);
// routes/advertisment.routes.js
Advertisment_Router.get('/category/:categoryId', async (req, res) => {
  try {
    const { categoryId } = req.params;
    const advertisments = await Advertisment_model.find({ categoryId })
    .populate('postedById').populate('categoryId').populate('cityAreasId');
    res.json(advertisments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = { Advertisment_Router };
