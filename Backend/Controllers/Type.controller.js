const Type = require('../models/Type')

//------ Get All Types ------
async function getAllTypes(req, res) {
  try {
    const Types = await Type.find();
    return res.status(200).json(Types);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Failed to get all Types " });    
  }
}

//------ Get Types by Id ------
async function getType(req, res) {
    try {
      const TypeId = await Type.findById();
      return res.status(200).json(TypeId);
    } catch (error) {
      console.error(error);
      return res.status(400).json({ message: "Failed to get all Type " });    
    }
  }

    //------ Create Type ------

    async function addType(req, res) {
      try {
        const { name } = req.body;
        const Create_Type = await Type.create({ name });
        res.header("location",`${req.originalUrl}/${Create_Type._id}`);
        return res.status(201).json(Create_Type);
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Failed to add Type" });
      }
    }
    
    
    //------ Update Type ------
    async function updateType(req, res) {
      try {
        const TypeId = req.params.id;
        const { name } = req.body;
        const updated=await Type.findByIdAndUpdate(TypeId,{ name },{new:true});
        if (!updated) return res.status(404).json({ message: `Failed to update Type because it is not found` });
        return res.status(200).json(updated);
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Failed to update Type" });
      }
    }
    
    
    
    //------ Delete Type ------
    async function deleteType(req, res) {
      try {
        const TypeId = req.params.id;
        const deleted = await Type.findByIdAndDelete(TypeId);
        if (!deleted) return res.status(404).json({ message: `Failed to delete Type because it is not found` });
        return res.status(200).json(deleted);
      } catch (error) {
        console.error(error);
        return res.status(400).json({ message: `Failed to delete Type` });
      }
    }
    
    
    module.exports = {
      getAllTypes,
      getType,
      addType,
      updateType,
      deleteType
    }