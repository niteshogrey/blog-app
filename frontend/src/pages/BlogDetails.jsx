import axios from "axios";
import { IoPersonCircle } from "react-icons/io5";
import moment from 'moment'
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { mainApi } from "../features/Apihendler";

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState({});

  // Fetch blog details
  const fetchBlogDetails = async () => {
    try {
      const { data } = await axios.get(
        `${mainApi}/api/v1/blog/getsingleblog/${id}`
      );
      
      setBlog(data.blog);
      // console.log(data);
    } catch (error) {
      console.error(
        "Error fetching blog details:",
        error.response?.data?.message
      );
    }
  };

  useEffect(() => {
    fetchBlogDetails();
  }, [id]);
  return (
    <div>
      <div key={blog._id}>
        <div className="m-2 p-2 border shadow-lg">
          {/* <p className="text-lg font-semibold">Author: {blog.userId?.username || "Unknown"} </p> */}
          <p className="flex items-center mb-1 gap-1 text-sm font-bold text-gray-600">
            <IoPersonCircle className="text-xl" /> {blog.userId?.username}
          </p>

          <div className="flex flex-col md:flex md:flex-row">
            <div className="h-64 w-64 ">
              <img
                src={blog.image?.secure_url}
                alt={blog.image?.public_id}
                className="w-60 h-60 object-cover"
              />
            </div>
            <div className="md:ml-10">
              <h1 className="text-3xl font-bold mb-5 capitalize">
                Title: {blog.title}
              </h1>
              <p className="text-lg text-gray-600">
                Description: {blog.description}
              </p>
            </div>
          </div>
          <p className="text-sm text-gray-600">Posted on: {moment(blog.createdAt).format('D MMM YYYY')}</p>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
