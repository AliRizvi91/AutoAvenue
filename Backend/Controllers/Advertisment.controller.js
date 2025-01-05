const Advertisment = require('../models/Advertisments')
const {uploadOnCloudinary} = require('../Services/cloudinary')


//------ Get All Advertisment ------
async function getAllAdvertisments(req, res) {
  try {
    // Fetch adverts with lean() for performance boost
    const adverts = await Advertisment.find()
      .lean()  // Convert documents to plain JavaScript objects
      .populate('postedById') // Limit fields if needed
      .populate('categoryId') // Limit fields if needed
      .populate('cityAreasId') // Limit fields if needed

    // Check if adverts were found
    if (!adverts.length) {
      return res.status(404).json({ message: "No Advertisments found" });
    }

    return res.status(200).json(adverts);
  } catch (error) {
    // Log detailed error message for debugging
    console.error('Error fetching Advertisments:', error.message);
    return res.status(500).json({ message: "Internal server error while fetching Advertisments" });
  }
}
 

//------ Get Advertisment by Id ------
async function getAdvertisment(req, res) {
    try {
      const id = req.params.id
      const AdvertismentId = await Advertisment.findById(id)
      .populate('postedById').populate('categoryId').populate('cityAreasId');
      return res.status(200).json(AdvertismentId);
    } catch (error) {
      console.error(error);
      return res.status(400).json({ message: "Failed to get all Advertisment " });    
    }
  }

  
//------ Create Advertisment ------


async function addAdvertisment(req, res) {
  try {
    // Destructure fields from request body
    const { name, price, descriptions, postedById, postOn, expireOn, categoryId, cityAreasId } = req.body;

    // Validate required fields
    if (!name || !price || !descriptions || !categoryId || !cityAreasId) {
      return res.status(400).json({ msg: "Please fill all fields correctly" });
    }

    // Ensure image file is uploaded
    const imageLocalPath = req.file?.path;
    if (!imageLocalPath) {
      return res.status(401).json({ msg: "Image is required" });
    }

    // Upload image to Cloudinary
    const uploadedImage = await uploadOnCloudinary(imageLocalPath);

    if (!uploadedImage) {
      return res.status(500).json({ msg: "Image upload failed" });
    }

    // Create advertisement record
    const newAdvertisment = await Advertisment.create({
      image: uploadedImage, // uploadedImage is already the URL
      name,
      price,
      descriptions,
      postedById,
      postOn,
      expireOn,
      categoryId,
      cityAreasId
    });

    // Set location header and respond with the new advertisement
    res.header("Location", `${req.originalUrl}/${newAdvertisment._id}`);
    return res.status(201).json(newAdvertisment);

  } catch (error) {
    console.error('Error creating advertisement:', error);
    return res.status(501).json({ message: "Failed to add advertisement" });
  }
}





//------ Update Advertisment ------
async function updateAdvertisment(req, res) {
  try {
    const { id: advertismentId } = req.params;
    const { name, price, descriptions, postedById, postOn, expireOn, categoryId, cityAreasId } = req.body;

    console.log('Request Body:', req.body); // Debug log
    console.log('Request File:', req.file);   // Debug log
    console.log(typeof(categoryId));
    

    if (!categoryId || !cityAreasId) {
      return res.status(400).json({ msg: "Please fill all fields correctly" });
    }


    // Find the existing advertisement to get the current image URL
    const existingAdvertisment = await Advertisment.findById(advertismentId);
    if (!existingAdvertisment) return res.status(404).json({ message: "Advertisement not found" });

    let imageUrl = existingAdvertisment.image; // Default to existing image URL

    // Handle the image file if it is being uploaded
    const imageLocalPath = req.file?.path;

    if (imageLocalPath) {
      // Upload the new image to Cloudinary
      const uploadedImage = await uploadOnCloudinary(imageLocalPath);
      if (!uploadedImage) {
        return res.status(500).json({ msg: "Image upload failed" });
      }
      imageUrl = uploadedImage;
    }

    // Build update object conditionally
    const updateFields = {
      name,
      price,
      descriptions,
      postedById,
      postOn,
      expireOn,
      image: imageUrl, // Ensure image is updated if a new one is uploaded
      categoryId,
      cityAreasId
    };

    // Update the advertisement record
    const updatedAdvertisment = await Advertisment.findByIdAndUpdate(
      advertismentId,
      updateFields,
      { new: true }
    );

    return res.status(200).json(updatedAdvertisment);
    
  } catch (error) {
    console.error('Error updating advertisement:', error);
    return res.status(500).json({ message: "Failed to update advertisement" });
  }
}








//------ Delete Advertisment ------
async function deleteAdvertisment(req, res) {
  try {
    const AdvertismentId = req.params.id;
    if (!AdvertismentId) {
      return res.status(400).json({ message: 'Advertisment ID is required' });
    }
    const deleted = await Advertisment.findByIdAndDelete(AdvertismentId);
    if (!deleted) {
      return res.status(404).json({ message: 'Advertisment not found' });
    }
    return res.status(200).json(deleted);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to delete Advertisment' });
  }
}


//------ Search AAdvertisment -------
const SearchAdvertisment =  async (req, res) => {
  const { Keyword, category, cityArea } = req.body;
  try {
    const advertisments = await Advertisment.find({
      name: new RegExp(Keyword, 'i'),
      categoryId: category ? category : { $exists: true },
      cityAreasId: cityArea ? cityArea : { $exists: true }
    })
    .populate('categoryId')
    .populate('cityAreasId');
    res.json(advertisments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}






module.exports = {
    getAllAdvertisments,
    getAdvertisment,
    addAdvertisment,
    updateAdvertisment,
    deleteAdvertisment,
    SearchAdvertisment,
  }