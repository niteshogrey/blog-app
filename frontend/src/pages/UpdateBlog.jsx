import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateBlog = () => {
  const { id } = useParams(); // Get blog ID from route parameters
  const navigate = useNavigate();

  const [input, setInput] = useState({
    title: "",
    description: "",
  });

  const [image, setImage] = useState(null);
  const [existingImage, setExistingImage] = useState(null);

  // Fetch blog details
  const fetchBlogDetails = async () => {
    try {
      const { data } = await axios.get(
        `https://blog-app-mx48.onrender.com/api/v1/blog/getsingleblog/${id}`
      );
      if (data?.success) {
        setInput({
          title: data.blog.title,
          description: data.blog.description,
        });
        setExistingImage(data.blog.image.secure_url); // Save current image URL
      }
    } catch (error) {
      console.error("Error fetching blog details:", error.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchBlogDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const formData = new FormData();
      formData.append("title", input.title);
      formData.append("description", input.description);
  
      if (image) {
        formData.append("image", image);
      }
  
      const token = localStorage.getItem("token");
      const { data } = await axios.put(
        `https://blog-app-mx48.onrender.com/api/v1/blog/update-blog/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      // console.log("Response Data:", data);
  
      if (data.success) {
        alert("Blog updated successfully");
        navigate("/myblogs"); // Ensure /myblogs fetches fresh data
      }
    } catch (error) {
      console.error("Error:", error.response?.data?.message || "Something went wrong");
    }
  };
  

  const handleDelete = async()=>{
    try {
        const token = localStorage.getItem("token");
        const { data } = await axios.delete(
          `https://blog-app-mx48.onrender.com/api/v1/blog/delete-blog/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // console.log(data);
        
        if (data.success) {
            alert("Blog delete successfully");
            navigate("/myblogs");
          }

    } catch (error) {
      console.error(error.response?.data?.message || "Something went wrong");
        
    }
  }

  return (
    <div className="flex items-center justify-center mt-8">
      <div className="w-full border max-w-md bg-white rounded-lg shadow-md p-6">
        <h1 className="text-center text-3xl font-bold text-gray-800 my-4">
          Update Blog Post
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title Field */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={input.title}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter blog title"
              required
            />
          </div>

          {/* Description Field */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={input.description}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter description"
              required
            />
          </div>

          {/* Existing Image Preview */}
          {existingImage && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Current Image
              </label>
              <img
                src={existingImage}
                alt="Blog Preview"
                className="mt-2 w-40 h-40 object-cover rounded"
              />
            </div>
          )}

          {/* New Image Field */}
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">
              Upload New Image (Optional)
            </label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleFileChange}
              className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Update Post
          </button>
        </form>
        <button
            type="submit"
            onClick={handleDelete}
            className="w-full bg-red-600 text-white mt-2 py-2 px-4 rounded-md text-sm font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Delete Post
          </button>
      </div>
    </div>
  );
};

export default UpdateBlog;
