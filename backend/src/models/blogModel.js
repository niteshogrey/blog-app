const mongoose = require("mongoose");

// Define the blog schema
const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"],
    },
    description: {
      type: String,
      required: [true, "description is required"],
    },
    image: {
        public_id:{
          type: String,
          required: true,
        },
        url:{
          type:String,
          required: true
        },
        secure_url:{
          type: String,
          required:true
        }
      },
      userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
        required: true,
      },
  },
  { timestamps: true }
);

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
