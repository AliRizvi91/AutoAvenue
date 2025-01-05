const Province = require('../models/Provinces_model')

//------ Get All Province ------
async function getAllProvinceses(req, res) {
  try {
    const Provinces = await Province.find().populate('countryId');
    return res.status(200).json(Provinces);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Failed to get all Provinceses " });    
  }
}

//------ Get Province by Id ------
async function getProvince(req, res) {
    try {
      const ProvinceId = await Province.findById().populate('countryId');
      return res.status(200).json(ProvinceId);
    } catch (error) {
      console.error(error);
      return res.status(400).json({ message: "Failed to get all Province " });    
    }
  }
      //------ Create Province ------

      async function addProvince(req, res) {
        try {
          const { name,countryId } = req.body;
          const Create_Province = await Province.create({ name,countryId });
          res.header("location",`${req.originalUrl}/${Create_Province._id}`);
          return res.status(201).json(Create_Province);
        } catch (error) {
          console.error(error);
          return res.status(500).json({ message: "Failed to add Province" });
        }
      }
      
      
      //------ Update Province ------
      async function updateProvince(req, res) {
        try {
          const ProvinceId = req.params.id;
          const { name,countryId } = req.body;
          const updated=await Province.findByIdAndUpdate(ProvinceId,{ name,countryId },{new:true});
          if (!updated) return res.status(404).json({ message: `Failed to update Province because it is not found` });
          return res.status(200).json(updated);
        } catch (error) {
          console.error(error);
          return res.status(500).json({ message: "Failed to update Province" });
        }
      }
      
      
      
      //------ Delete Province ------
      async function deleteProvince(req, res) {
        try {
          const ProvinceId = req.params.id;
          const deleted = await Province.findByIdAndDelete(ProvinceId);
          if (!deleted) return res.status(404).json({ message: `Failed to delete Province because it is not found` });
          return res.status(200).json(deleted);
        } catch (error) {
          console.error(error);
          return res.status(400).json({ message: `Failed to delete Province` });
        }
      }
      
      
      module.exports = {
        getAllProvinceses,
        getProvince,
        addProvince,
        updateProvince,
        deleteProvince
      }