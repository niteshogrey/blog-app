const cloudinary = require("cloudinary").v2;
const Blog = require("../models/blogModel");
const upload = require("../middlewares/multer");


const createBlogController = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description || !req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please fill all fields and Provide an image',
      });
    }

    // console.log('Request body:', req.body);
    // console.log('Uploaded file:', req.file);

    const userId = req.user.id;
    const userName = req.user.username;


    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      folder: 'blog',
    });

    const newBlog = new Blog({
      title,
      description,
      image: {
        url: uploadResult.url,
        public_id: uploadResult.public_id,
        secure_url: uploadResult.secure_url,
      },
      userId,
      userName,
    });

    await newBlog.save();

    res.status(201).json({
      success: true,
      message: 'Blog created successfully',
      blog: newBlog,
    });
  } catch (error) {
    console.error('Error creating blog:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating blog',
      error: error.message || 'Unknown error',
    });
  }
};

const uploadCoudinary = (req, res) => {
  cloudinary.uploader.upload(
    req.file.path,
    { folder: "blog" },
    function (error, result) {
      if (error) {
        console.log(error);
        return res.status(500).json({
          success: true,
          message: "error",
        });
      }
      res.status(200).json({
        success: true,
        message: "Uploaded!",
        data: result,
      });
    }
  );
};

const getAllBlogsController = async (req, res) => {
  try {
    const blogs = await Blog.find({}).populate("userId", "username");
    if (blogs.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No Blogs Found",
      });
    }

    res.status(200).json({
      blogCount: blogs.length,
      success: true,
      message: "all blog data",
      blogs,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching Blogs", error });
  }
};

const getBlogsById = async (req, res) => {
  const userId = req.user.id;
  try {
    console.log(userId);
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is missing",
      });
    }
    const blog = await Blog.find({ userId });
    if (!blog || blog.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No Blog Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "blog data",
      blog,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching Blogs", error });
  }
};

const getSingleBlogById = async(req, res) =>{
  const {id} = req.params
  try {
    const blog = await Blog.findById(id).populate("userId", "username");

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "No Blog Found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Get a blog",
      blog: blog,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching this Blog", error });
  }
}

const updateBlogController =  async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "No Blog Found",
      });
    }

    // Check if the logged-in user is authorized to update the blog
    if (blog.userId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this blog",
      });
    }

    // Handle new image upload
    let updatedImage = blog.image; // Keep existing image if no new file is uploaded
    if (req.file) {
      // Delete the old image from Cloudinary
      if (blog.image && blog.image.public_id) {
        await cloudinary.uploader.destroy(blog.image.public_id);
      }

      // Upload new image to Cloudinary
      const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        folder: "blog",
      });

      updatedImage = {
        url: uploadResult.url,
        public_id: uploadResult.public_id,
        secure_url: uploadResult.secure_url,
      };
    }

    // Update blog in database
    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { title, description, image: updatedImage },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Blog is updated",
      blog: updatedBlog,
    });
  } catch (error) {
    console.error("Error updating blog:", error);
    res.status(500).json({
      success: false,
      message: "Error updating blog",
      error: error.message || "Unknown error",
    });
  }
};


const deleteBlogController = async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await Blog.findOneAndDelete({ _id: id });
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "No Blog Found",
      });
    }
    
    if (blog.userId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this blog",
      });
    }

    res.status(200).json({
      success: true,
      message: "blog is delete",
      blog,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching Blogs", error });
  }
};

module.exports = {
  createBlogController,
  uploadCoudinary,
  getAllBlogsController,
  getBlogsById,
  updateBlogController,
  deleteBlogController,
  getSingleBlogById
};
