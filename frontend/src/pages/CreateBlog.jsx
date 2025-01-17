import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateBlog = () => {
  const navigate = useNavigate();

  const [input, setInput] = useState({
    title: "",
    description: "",
  });

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(e.target.value);
    
    setInput({ ...input, [name]: value });
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
    console.log(e.target.files);
    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", input.title);
      formData.append("description", input.description);
      formData.append("image", image);

      const token = localStorage.getItem("token");
      const { data } = await axios.post("https://blog-app-mx48.onrender.com/api/v1/blog/create-blog", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`
        },
      });

      if (data.success) {
        alert("Blog Post successfully created");
        navigate("/myblogs");
      }
    } catch (error) {
      console.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center mt-8">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h1 className="text-center text-3xl font-bold text-gray-800 my-4">
          Create a Post
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title Field */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
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
              type="text"
              id="description"
              name="description"
              value={input.description}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter description"
              required
            />
          </div>

          {/* Image Field */}
          <div>
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700"
            >
              Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleFileChange}
              className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Publish Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;
