import { useEffect, useState } from "react";
import moment from "moment";
import { MdOutlineEdit } from "react-icons/md";
import { IoPersonCircle } from "react-icons/io5";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchBlogSuccess } from "../features/blog/blogSlice";
  const useAuth =()=>{
    return localStorage.getItem('token')
  }
const Blogs = () => {
  const isLogin = useAuth()
  const navigate = useNavigate();
  const [allBlogs, setAllBlogs] = useState([]);
  const userId = localStorage.getItem("userId");
  const handleFetchBlogs = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:3000/api/v1/blog/all-blogs"
      );
      setAllBlogs(data.blogs);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  const addElipsis = (str, limit) => {
    return str.length > limit ? str.substring(0, limit) + "..." : str;
  };

  const handleEdit = (id) => {
    navigate(`/blogdetailsandedit/${id}`);
  };

  const handleReadMore = (id) => {
    navigate(`/blogdetails/${id}`);
  };

  useEffect(() => {
    handleFetchBlogs();
  }, []);

  return (
    <div className=" p-4 grid grid-cols-1 items-center justify-center sm:grid-cols-3 lg:grid-cols-4 gap-6">
      {allBlogs.map((blog) => (
        <div
          key={blog._id}
          className="h-full border max-w-sm rounded overflow-hidden shadow-lg bg-white"
        >
          {/* update and delete icon */}

          <div className="flex justify-between items-center p-1">
            <p className="flex items-center gap-1 text-sm font-bold text-gray-600">
              <IoPersonCircle className="text-lg" /> {blog.userId.username}
            </p>
            {userId === blog.userId._id && (
              <button
                onClick={() => handleEdit(blog._id)}
                className="border hover:bg-black hover:text-white cursor-pointer p-1"
              >
                <MdOutlineEdit />
              </button>
            )}
          </div>
          <hr />
          {/* Blog Image */}
          <div className="flex justify-center items-center h-[17rem] ">
            <img
              className="w-60 h-60 object-cover border"
              src={blog.image.secure_url}
              alt={blog.title}
            />
          </div>

          {/* Blog Content */}
          <div className="px-6 py-4">
            <h2 className="font-bold text-xl mb-2 text-gray-800 capitalize">
              Title: {addElipsis(blog.title, 30)}
            </h2>
            <p className="text-gray-700 text-base">
              Descritpion: {addElipsis(blog.description, 40)}
            </p>
          </div>

          {/* Action Button */}
          <div className="flex justify-between items-center px-6 py-4">
            {isLogin ? 
            
            (<button
              onClick={() => handleReadMore(blog._id)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Read More
            </button>) 
            : (<button
              onClick={()=>navigate('/login')}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Login
            </button>) 
            }
            
            <p className="border p-1 rounded text-sm text-gray-600">
              {moment(blog.createdAt).fromNow()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Blogs;
