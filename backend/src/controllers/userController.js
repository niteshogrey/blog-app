const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')
const User = require("../models/userModel");


// Register user controller
const registerUser = async (req, res) => {
  const { username, phone, password } = req.body;

  if (!username || !phone || !password) {
    return res.status(400).json({
      success: false,
      message: "Please fill all fields",
    });
  }
  try {
    const userExists = await User.findOne({ phone });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      phone,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: newUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error registering user",
      error: error.message,
    });
  }
};

//login Controller

const loginController = async (req, res) => {
  const { phone, password } = req.body;
  if (!phone || !password) {
    return res.status(400).json({
      success: false,
      message: "Please fill all fields",
    });
  }
  try {
    const userExists = await User.findOne({ phone });
    if (!userExists) {
      return res.status(400).json({
        success: false,
        message: "User not exists",
      });
    }
    const isMatch = await bcrypt.compare(password, userExists.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid phone or password",
      });
    }
    const token = jwt.sign({ id: userExists._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
      res.status(201).json({
        success: true,
        message: "User logged in successfully",
        token,
        user: {
          id: userExists._id,
          username: userExists.username,
          phone: userExists.phone,
        }
    });
  } catch (error) {
    res.status(500).json({
        success: false,
        message: "Error login user",
        error: error.message,
      });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params; // Extract ID from request parameters
    const user = await User.findById(id); // Fetch user by ID

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No user found",
      });
    }

    // Respond with the user data
    res.status(200).json({
      success: true,
      message: "User data fetched successfully",
      user,
    });
  } catch (error) {
    // Handle unexpected errors
    res.status(500).json({
      success: false,
      message: "Error fetching user",
      error: error.message, // Provide a detailed error message
    });
  }
};


const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({
      userCount: users.length,
      success: true,
      message: "all users data",
      users,
    });
  } catch (error) {
    res.status(500).json({ success: false, 
        message: "Error fetching users", 
        error });
  }
};

module.exports = {
  registerUser,
  loginController,
  getUserById,
  getAllUsers,
};
