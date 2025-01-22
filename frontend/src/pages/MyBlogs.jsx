import { useEffect, useState } from "react";
import { MdOutlineEdit } from "react-icons/md";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { addElipsis } from "../utils/commonUtils";
import { mainApi } from "../features/Apihendler";

const MyBlogs = () => {
  const [userBlogs, setUserBlogs] = useState([]);
  const navigate = useNavigate()

  const handleFetchBlogs = async () => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await axios.get(
        `${mainApi}/api/v1/blog/get-blog`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserBlogs(data.blog);
      // console.log(data);
    } catch (error) {
      console.error("Error fetching blogs:", error.response.data.message);
    }
  };
  useEffect(() => {
    handleFetchBlogs();
  }, []);

  const handleEdit = (id) =>{
    navigate(`/blogdetailsandedit/${id}`)
  }

  return (
    <div className="p-4">
      {userBlogs.length === 0 ? (
        <p className="text-center text-gray-600">
          You have not posted any blogs yet <a href="/createblog" >create your blog</a>.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {userBlogs.map((blog) => (
            <div
              key={blog._id}
              className="max-w-sm rounded overflow-hidden shadow-lg bg-white"
            >
              <div className="flex justify-end m-2 gap-2 text-3xl">
                        <MdOutlineEdit onClick={()=>handleEdit(blog._id)}  className="hover:border cursor-pointer p-1"/>
                        </div>
              {/* Blog Image */}
              <div className="flex justify-center items-center ">
                <img
                  className="w-64 h-64 object-fit border"
                  src={blog.image.secure_url}
                  alt={blog.title}
                />
              </div>

              {/* Blog Content */}
              <div className="px-6 py-4">
                <h2 className="font-bold text-xl mb-2 text-gray-800">
                  Title: {addElipsis(blog.title, 30)}
                </h2>
                <p className="text-gray-700 text-base">
                  Description: {addElipsis(blog.description, 35)}
                </p>
              </div>

              {/* Action Button */}
              <div className="px-6 py-4">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBlogs;
