const Country = require('../models/Countries_model')

//------ Get All Countries ------
async function getAllCountries(req, res) {
  try {
    const Countries = await Country.find();
    return res.status(200).json(Countries);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Failed to get all Countries " });    
  }
}

//------ Get Country by Id ------
async function getCountry(req, res) {
    try {
      const CountryId = await Country.findById();
      return res.status(200).json(CountryId);
    } catch (error) {
      console.error(error);
      return res.status(400).json({ message: "Failed to get all Country" });    
    }
  }

      //------ Create Country ------

async function addCountry(req, res) {
  try {
    const { name,code } = req.body;
    const Create_Country = await Country.create({ name,code });
    res.header("location",`${req.originalUrl}/${Create_Country._id}`);
    return res.status(201).json(Create_Country);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to add Country" });
  }
}


//------ Update Country ------
async function updateCountry(req, res) {
  try {
    const CountryId = req.params.id;
    const { name,code } = req.body;
    const updated=await Country.findByIdAndUpdate(CountryId,{ name,code },{new:true});
    if (!updated) return res.status(404).json({ message: `Failed to update Country because it is not found` });
    return res.status(200).json(updated);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to update Country" });
  }
}



//------ Delete Country ------
async function deleteCountry(req, res) {
  try {
    const CountryId = req.params.id;
    const deleted = await Country.findByIdAndDelete(CountryId);
    if (!deleted) return res.status(404).json({ message: `Failed to delete Country because it is not found` });
    return res.status(200).json(deleted);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: `Failed to delete Country` });
  }
}


module.exports = {
  getAllCountries,
  getCountry,
  addCountry,
  updateCountry,
  deleteCountry
}