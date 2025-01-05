const City = require('../models/Cities_model')

//------ Get All Cities ------
async function getAllCities(req, res) {
  try {
    const Cities = await City.find().populate('provinceId');
    return res.status(200).json(Cities);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Failed to get all Cities " });    
  }
}

//------ Get City by Id ------
async function getCity(req, res) {
    try {
      const CityId = await City.findById().populate('provinceId');
      return res.status(200).json(CityId);
    } catch (error) {
      console.error(error);
      return res.status(400).json({ message: "Failed to get all City " });    
    }
  }

  //------ Create City ------

async function addCity(req, res) {
  try {
    const { name,provinceId } = req.body;
    const Create_City = await City.create({ name,provinceId });
    res.header("location",`${req.originalUrl}/${Create_City._id}`);
    return res.status(201).json(Create_City);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to add City" });
  }
}


//------ Update City ------
async function updateCity(req, res) {
  try {
    const CityId = req.params.id;
    const { name,provinceId } = req.body;
    const updated=await City.findByIdAndUpdate(CityId,{ name,provinceId },{new:true});
    if (!updated) return res.status(404).json({ message: `Failed to update City because it is not found` });
    return res.status(200).json(updated);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to update City" });
  }
}



//------ Delete City ------
async function deleteCity(req, res) {
  try {
    const CityId = req.params.id;
    const deleted = await City.findByIdAndDelete(CityId);
    if (!deleted) return res.status(404).json({ message: `Failed to delete City because it is not found` });
    return res.status(200).json(deleted);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: `Failed to delete City` });
  }
}


  module.exports = {getAllCities,
    getCity,
    addCity,
    updateCity,
    deleteCity
  }