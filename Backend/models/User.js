const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  securityquestion: {
    type: String,
    required: true,
},
  securityanswer: {
    type: String,
    required: true,
},
birthDate: {
    type: String,
    required: true,
},
contactNumber: {
    type: Schema.Types.String,
    required: true,
},
image: {
    type: Schema.Types.String,
    // required: true,
},
role: {
    type: Schema.Types.String,
    ref: "Role",
    required: true
},
otp: {
  type: String,
  default: null
},
otpExpires: {
  type: Date,
  default: null
},
});

// Middleware to hash the password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error); // Pass errors to the next middleware or error handler
  }
});

// Method to compare entered password with the hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
