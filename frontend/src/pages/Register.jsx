import  { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { mainApi } from "../features/Apihendler";

const Register = () => {
      const [formData, setFormData] = useState({
          username: "",
          phone: "",
          password: "",
      });
      
      const handleChange = (e) => {
          const { name, value } = e.target;
          setFormData({ ...formData, [name]: value });
      };
      
      const handleSubmit = async(e) => {
          e.preventDefault();
          // Handle form submission logic here
          // console.log("Form Data Submitted:", formData);
          try {
            const { data } = await axios.post(`${mainApi}/api/v1/user/register`, {
                username: formData.username,
                phone: formData.phone,
                password: formData.password,
            });
            console.log(data);
            if (data.success) {
              alert("User Register successfully")
              navigate('/login')
            }
            
        } catch (error) {
            console.log(error.response.data.message);
            
          }
      };

      const navigate = useNavigate()

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Register</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name Field */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter your name"
                            required
                        />
                    </div>
                    {/* Email Field */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Phone No
                        </label>
                        <input
                            type="phone"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter your 10 digit valid Phone no."
                            required
                        />
                    </div>
                    {/* Password Field */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                   
                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Register
                    </button>
                </form>
                <p className="text-sm text-gray-600 mt-4 text-center">
                    Already have an account?{" "}
                    <a onClick={()=>navigate('/login')} href="/login" className="text-blue-600 hover:underline">
                        Login
                    </a>
                </p>
            </div>
        </div>
    );
};


export default Register
