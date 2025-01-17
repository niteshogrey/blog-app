const mongoose = require("mongoose");

// Define the User schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
  },
  phone: {
    type: Number,
    required: [true, "Phone number is required"],
    unique: true, 
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  blogId: { 
          type: mongoose.Schema.Types.ObjectId, 
          ref: "Blog",
    },
},
 {
      timestamps: true
  }

);

const User = mongoose.model("User", userSchema);

module.exports = User;
