const CityArea = require('../models/CityAreas')

//------ Get All CityAreas ------
async function getAllCityAreas(req, res) {
  try {
    const CityAreas = await CityArea.find().populate('cityId');
    return res.status(200).json(CityAreas);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Failed to get all CityArea " });    
  }
}

//------ Get CityArea by Id ------
async function getCityArea(req, res) {
    try {
      const CityAreaId = await CityArea.findById().populate('cityId');
      return res.status(200).json(CityAreaId);
    } catch (error) {
      console.error(error);
      return res.status(400).json({ message: "Failed to get all CityArea " });    
    }
  }
  
    //------ Create CityArea ------

async function addCityArea(req, res) {
  try {
    const { name,cityId } = req.body;
    const Create_CityArea = await CityArea.create({ name,cityId });
    res.header("location",`${req.originalUrl}/${Create_CityArea._id}`);
    return res.status(201).json(Create_CityArea);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to add CityArea" });
  }
}


//------ Update CityArea ------
async function updateCityArea(req, res) {
  try {
    const CityAreaId = req.params.id;
    const { name,cityId } = req.body;
    const updated=await CityArea.findByIdAndUpdate(CityAreaId,{ name,cityId },{new:true});
    if (!updated) return res.status(404).json({ message: `Failed to update CityArea because it is not found` });
    return res.status(200).json(updated);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to update CityArea" });
  }
}



//------ Delete CityArea ------
async function deleteCityArea(req, res) {
  try {
    const CityAreaId = req.params.id;
    const deleted = await CityArea.findByIdAndDelete(CityAreaId);
    if (!deleted) return res.status(404).json({ message: `Failed to delete CityArea because it is not found` });
    return res.status(200).json(deleted);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: `Failed to delete CityArea` });
  }
}


  module.exports = {
    getAllCityAreas,
    getCityArea,
    addCityArea,
    updateCityArea,
    deleteCityArea
  }