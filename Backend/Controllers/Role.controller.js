const Role = require('../models/Role')

//------ Get All Roles ------
async function getAllRoles(req, res) {
  try {
    const Roles = await Role.find();
    return res.status(200).json(Roles);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Failed to get all Roles " });    
  }
}

//------ Get Role by Id ------
async function getRole(req, res) {
    try {
      const RoleId = await Role.findById();
      return res.status(200).json(RoleId);
    } catch (error) {
      console.error(error);
      return res.status(400).json({ message: "Failed to get all Role " });    
    }
  }
      //------ Create Role ------

      async function addRole(req, res) {
        try {
          const { Name } = req.body;
          const Create_Role = await Role.create({ Name });
          res.header("location",`${req.originalUrl}/${Create_Role._id}`);
          return res.status(201).json(Create_Role);
        } catch (error) {
          console.error(error);
          return res.status(500).json({ message: "Failed to add Role" });
        }
      }
      
      
      //------ Update Role ------
      async function updateRole(req, res) {
        try {
          const RoleId = req.params.id;
          const { Name } = req.body;
          const updated=await Role.findByIdAndUpdate(RoleId,{ Name },{new:true});
          if (!updated) return res.status(404).json({ message: `Failed to update Role because it is not found` });
          return res.status(200).json(updated);
        } catch (error) {
          console.error(error);
          return res.status(500).json({ message: "Failed to update Role" });
        }
      }
      
      
      
      //------ Delete Role ------
      async function deleteRole(req, res) {
        try {
          const RoleId = req.params.id;
          const deleted = await Role.findByIdAndDelete(RoleId);
          if (!deleted) return res.status(404).json({ message: `Failed to delete Role because it is not found` });
          return res.status(200).json(deleted);
        } catch (error) {
          console.error(error);
          return res.status(400).json({ message: `Failed to delete Role` });
        }
      }
      
      
      module.exports = {
        getAllRoles,
        getRole,
        addRole,
        updateRole,
        deleteRole
      }