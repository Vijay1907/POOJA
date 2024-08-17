import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { FORGOTPASSWORD, USERLOGIN } from '../../service';
import { loginPageImg } from '../../service'; // Make sure this path is correct

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const updatedErrors = {
        email: !formData.email && 'Email is required',
        password: !formData.password && 'Password is required',
      };

      // Check if email is present and if it matches the email pattern
      if (updatedErrors.email === '' || !/^\S+@\S+\.\S+$/.test(formData.email)) {
        updatedErrors.email = 'Invalid email address';
      }

      const hasErrors = Object.values(updatedErrors).some((error) => !!error);

      if (hasErrors) {
        setErrors(updatedErrors);
      } else {
        setErrors({});
        await USERLOGIN(formData, navigate, dispatch);
        navigate('/');
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.error('Error:', error);
    }
  };

  const handleForgotPassword = async () => {
    try {
      let error = '';
      if (!formData.email) {
        error = 'Email is required';
      } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
        error = 'Invalid email address';
      }
  
      if (error) {
        toast.error(error);
        return;
      }
  
      const myData = {
        email: formData.email,
      };
  
      const response = await FORGOTPASSWORD(myData);
      if (response?.data?.success) {
        // Save email to session storage
        sessionStorage.setItem('forgotPasswordEmail', formData.email);
        
        // Navigate to forgot password page
        navigate('/forgot-password');
      }
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || 'An error occurred');
    }
  };
  

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-1/2 bg-white flex items-center justify-center">
        <img src={loginPageImg} alt="Login" className="max-h-[100vh]" />
      </div>
      <div className="lg:w-1/2 flex items-center justify-center">
        <div className="w-full max-w-md p-8">
          <h1 className="text-2xl font-bold mb-4">Login</h1>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>
          <div className="flex items-center justify-between mb-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleSubmit}
            >
              Login
            </button>
            <button
              className="text-blue-500 hover:underline"
              onClick={handleForgotPassword}
            >
              Forgot Password?
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
