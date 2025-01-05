const Category = require('../models/Advertisment.categories');

//------ Get All Category ------
async function getAllSCategories(req, res) {
  try {
    const Categories = await Category.find();
    return res.status(200).json(Categories);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Failed to get all Categories " });    
  }
}

//------ Get Category by Id ------
async function getCategory(req, res) {
    try {
      const CategoryId = await Category.findById();
      return res.status(200).json(CategoryId);
    } catch (error) {
      console.error(error);
      return res.status(400).json({ message: "Failed to get all Category " });    
    }
  }



//------ Create Category------
  async function addCategory(req, res) {
    try {
      const { name,images } = req.body;
      const createCategory = await Category.create({ name,images });
      res.header("location",`${req.originalUrl}/${createCategory._id}`);
      return res.status(201).json(createCategory);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "failed to add Category" });
    }
  }
  
//------ Get Category by Id ------
  async function updateCategory(req, res) {
    try {
      const CategoryId = req.params.id;
      const { name,images } = req.body;
      const updated=await Category.findByIdAndUpdate(CategoryId,{ name,images });
      if (!updated) return res.status(404).json({ message: `failed to update Category because it is not found` });
      return res.status(200).json(updated);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "failed to update Category" });
    }
  }
  
//------ Get Category by Id ------
  async function deleteCategory(req, res) {
    try {
      const CategoryId = req.params.id;
      const deleted = await Category.findByIdAndDelete(CategoryId);
      if (!deleted) return res.status(404).json({ message: `failed to delete Category because it is not found` });
      return res.status(200).json(deleted);
    } catch (error) {
      console.error(error);
      return res.status(400).json({ message: `Failed to delete Category` });
    }
  }


  module.exports = {
    getAllSCategories,
    getCategory,
    addCategory,
    updateCategory,
    deleteCategory
  }