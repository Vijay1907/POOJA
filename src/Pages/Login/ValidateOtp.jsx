import { frontendUrl, privateRequest } from '../../configs/RequestMethod';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../features/auth-slice';
import { toast } from 'react-toastify';

const ValidateOtp = () => {
  const dispatch = useDispatch()

    const navigate = useNavigate()

  const [formData, setFormData] = useState({
    mobileNo: '',
    otp: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await privateRequest.post('/users/validateOtp', formData);
      dispatch(login(response?.data));
      const { token } = response.data; // Assuming the token is returned in the response
      Cookies.set('jwtToken', token); // Store the token in a cookie
      console.log('Token stored in cookie:', token);
      navigate('/')
      toast.success('Login Successfully!');
      
      // You can add further actions like redirecting to dashboard here
    } catch (error) {
      console.error('Error:', error);
      // Handle error here
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-1/2 bg-white flex items-center justify-center">
        <img src={`${frontendUrl}/images/login.png`} alt="Login" className="h-[20rem]" />
      </div>
      <div className="w-1/2 flex items-center justify-center">
        <div className="w-full max-w-md p-8">
          <h1 className="text-2xl font-bold mb-4">Please Enter OTP</h1>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mobileNo">
              Mobile Number
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              id="mobileNo"
              name="mobileNo"
              value={formData.mobileNo}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              OTP
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              id="otp"
              name="otp"
              value={formData.otp}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick= {handleSubmit}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValidateOtp;
