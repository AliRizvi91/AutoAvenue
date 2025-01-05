const express = require('express')
const User_Router = express.Router()
const { upload } = require('../middleware/multer.middleware');

// _____----- Middleware -----_____

const {protect,authorization} = require('../middleware/authMiddleware')



const {
    // getAllUsers,
    getUser,
    addUsers,
    updateUsers,
    // deleteUsers,
    Login,
    verifyOtp
  } =require('../Controllers/User.controller')

  // User_Router.route('/')
  // .get(
  //   // Authentication,
  //   getAllUsers)


  User_Router.route('/:id')
  .put(upload.single('image'),updateUsers)
  // .delete(deleteUsers)

  User_Router.post('/signup', addUsers);

  User_Router.route('/login')
  .post(Login);
  
  User_Router.post('/verifyotp', verifyOtp);
  User_Router.get('/profile', protect, (req, res) => {
    try {
      res.json(req.user);
    } catch (error) {
      console.log(error);
    }
  });

  module.exports = {User_Router};

