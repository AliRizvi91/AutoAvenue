const express = require('express')
const dotenv = require('dotenv');
dotenv.config()
const User = require('../models/User')
const jwt = require("jsonwebtoken")
const { sendmailer } = require('../sendMail/sendmail');
const { otpGenerator } = require('../OTP/otp');
const bcrypt = require('bcryptjs');
const app = express()
const {uploadOnCloudinary} = require('../Services/cloudinary')


//------ Get All Users ------
async function getAllUsers(req, res) {
  try {
    const Users = await User.find().populate('RoleId');
    return res.status(200).json(Users);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Failed to get all Users " });    
  }
}

//------ Get Users by Id ------
async function getUser(req, res) {
    try {
      const id = req.params.id;
      const UserId = await User.findById(id).populate('RoleId');
      return res.status(200).json(UserId);
    } catch (error) {
      console.error(error);
      return res.status(400).json({ message: "Failed to get all User" });    
    }
  }


    

    
    
    
  const updateUsers = async (req, res) => {
    try {
      const { id } = req.params;
      const imageLocalPath = req.file?.path;

      
    console.log('Request Body:', req.body); // Debug log
    console.log('Request File:', req.file);   // Debug log
      
      // Find the user first to ensure it exists
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ message: `User not found` });
      }
  
      let imageUrl = user.image; // Keep the existing image URL if no new image is uploaded
  
      if (imageLocalPath) {
        // Upload the new image to Cloudinary
        const uploadedImage = await uploadOnCloudinary(imageLocalPath);
        if (!uploadedImage) {
          return res.status(500).json({ msg: "Image upload failed" });
        }
        imageUrl = uploadedImage; // Update the image URL with the new Cloudinary URL
      }
  
      console.log(imageUrl);
      
      // Update the user with the new image URL
      const updateFeild = {
        image : imageUrl
      }
      // user.image = imageUrl;
      // await user.save();
      const updatedUser = await User.findByIdAndUpdate(
        id,
        updateFeild,
        { new: true }
      );
      console.log(updatedUser);
      
  
      return res.status(200).json(updatedUser);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Failed to update user" });
    }
  };
  
  
  
    
    
    
    //------ Delete Users ------
    async function deleteUsers(req, res) {
      try {
        const UsersId = req.params.id;
        const deleted = await User.findByIdAndDelete(UsersId);
        if (!deleted) return res.status(404).json({ message: `Failed to delete Users because it is not found` });
        return res.status(200).json(deleted);
      } catch (error) {
        console.error(error);
        return res.status(400).json({ message: `Failed to delete User` });
      }
    }


    const generateToken = (id, role) => {
      return jwt.sign({ id, role }, process.env.JWT_SECRET_KEY, {
        expiresIn: '30d',
      });
    };
    
    const addUsers = async (req, res) => {
      const { name, email, password ,securityquestion,securityanswer,birthDate,contactNumber,image,role} = req.body;
    
      if(!name || !email || !password ||!securityquestion||!securityanswer||!birthDate,!contactNumber,!image,!role) {
        return res.status(401).json({ message: 'Please fill in all fields' });
      }
    
      const userExists = await User.findOne({ email });
    
      if (userExists) {
        return res.status(402).json({ message: 'User already exists' });
      }
    
      const user = await User.create({
        name,
        email,
        password,
        securityquestion,
        securityanswer,
        birthDate,
        contactNumber,
        image,
        role
      });
    
      if (user) {
        res.status(201).json({
          user: user,
          token: generateToken(user._id),
        });
      } else {
        res.status(400).json({ message: 'Invalid user data' });
      }
    };
    
    
    const Login = async (req, res) => {
      const { email, password } = req.body;
      if (!email || !password) {
          return res.status(400).json({ message: 'Please fill in all fields' });
      }
  
      try {
          const user = await User.findOne({ email });
          if (user && (await user.matchPassword(password))) {
              const otp = otpGenerator();
              const otpExpires = Date.now() + 15 * 60 * 1000; // OTP valid for 15 minutes
  
              await User.findOneAndUpdate(
                  { email },
                  { otp, otpExpires },
                  { new: true, useFindAndModify: false }
              );
  
              await sendmailer(email, otp); // Send OTP via email
  
              // Set cookie with proper attributes
              res.cookie('authToken', otp, {
                  httpOnly: true,
                  secure: true, // ensure cookie is sent over HTTPS
                  sameSite: 'None' // allows cross-site requests
              });
  
              res.json({
                  message: 'OTP has been sent to your email',
                  email,
              });
          } else {
              res.status(401).json({ message: 'Invalid email or password' });
          }
      } catch (error) {
          res.status(500).json({ message: 'Server error' });
      }
  };
  
    
  const verifyOtp = async (req, res) => {
    const { email, enteredOtp } = req.body;
  
    try {
      const user = await User.findOne({ email });
  
      if (user && user.otp === enteredOtp && user.otpExpires > Date.now()) {
        // Clear OTP after successful verification
        user.otp = null;
        user.otpExpires = null;
        await user.save();
  
        // Generate token with user ID and role
        const token = generateToken(user._id, user.role);
  
        res.json({ token });
      } else {
        res.status(400).json({ message: 'Invalid or expired OTP' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };


    module.exports = {
      getAllUsers,
      getUser,
      addUsers,
      updateUsers,
      deleteUsers,
      Login,
      verifyOtp
    }