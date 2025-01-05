const Status = require('../models/AdvertismentStatus_model')

//------ Get All Status ------
async function getAllStatuses(req, res) {
  try {
    const Statuses = await Status.find();
    return res.status(200).json(Statuses);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Failed to get all statuses " });    
  }
}

//------ Get Status by Id ------
async function getStatus(req, res) {
    try {
      const StatusId = await Status.findById();
      return res.status(200).json(StatusId);
    } catch (error) {
      console.error(error);
      return res.status(400).json({ message: "Failed to get all status " });    
    }
  }
    //------ Create Status ------

    async function addStatus(req, res) {
      try {
        const { Name } = req.body;
        const Create_Status = await Status.create({ Name });
        res.header("location",`${req.originalUrl}/${Create_Status._id}`);
        return res.status(201).json(Create_Status);
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Failed to add Status" });
      }
    }
    
    
    //------ Update Status ------
    async function updateStatus(req, res) {
      try {
        const StatusId = req.params.id;
        const { Name } = req.body;
        const updated=await Status.findByIdAndUpdate(StatusId,{ Name },{new:true});
        if (!updated) return res.status(404).json({ message: `Failed to update Status because it is not found` });
        return res.status(200).json(updated);
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Failed to update Status" });
      }
    }
    
    
    
    //------ Delete Status ------
    async function deleteStatus(req, res) {
      try {
        const StatusId = req.params.id;
        const deleted = await Status.findByIdAndDelete(StatusId);
        if (!deleted) return res.status(404).json({ message: `Failed to delete Status because it is not found` });
        return res.status(200).json(deleted);
      } catch (error) {
        console.error(error);
        return res.status(400).json({ message: `Failed to delete Status` });
      }
    }
    
    
    module.exports = {
      getAllStatuses,
      getStatus,
      addStatus,
      updateStatus,
      deleteStatus
    }