import React, { useState, useEffect } from 'react';
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import CryptoJS from "crypto-js";
import { useNavigate } from 'react-router-dom'; // for navigation
import { CHANGEPASSWORD, UPDATEADMINDETAILS } from '../../service';
import { toast } from 'react-toastify'; // Ensure you have react-toastify installed
import { useDispatch } from 'react-redux';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import the eye icons from react-icons

const ViewUserDetails = () => {
  const [userData, setUserData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [passwordChangeMode, setPasswordChangeMode] = useState(false);
  const [updatedName, setUpdatedName] = useState('');
  const [updatedEmail, setUpdatedEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // hook for navigation

  useEffect(() => {
    const encryptedUser = localStorage.getItem('user');
    if (encryptedUser) {
      const bytes = CryptoJS.AES.decrypt(encryptedUser, 'your-encryption-key');
      const decryptedUser = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      setUserData(decryptedUser);
      setUpdatedName(decryptedUser.name);
      setUpdatedEmail(decryptedUser.email);
    }
  }, []);

  const validateDetails = () => {
    const newErrors = {};
    if (updatedName.length < 3) {
      newErrors.name = 'Name must be at least 3 characters long';
    }
    if (!/\S+@\S+\.\S+/.test(updatedEmail)) {
      newErrors.email = 'Invalid email address';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePassword = () => {
    const newErrors = {};
    if (newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters long';
    }
    if (!oldPassword) {
      newErrors.oldPassword = 'Old password is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdateDetails = async () => {
    if (!validateDetails()) return;

    try {
      const response = await UPDATEADMINDETAILS({
        name: updatedName,
        email: updatedEmail
      }, dispatch);
      // Update local storage with the new user data
      const updatedUser = { ...userData, name: updatedName, email: updatedEmail };
      setUserData(updatedUser);
      setEditMode(false);
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Error updating user details');
      console.error('Error updating user details:', error);
    }
  };

  const handleCancelUpdateDetails = () => {
    setUpdatedEmail(userData.email);
    setUpdatedName(userData.name);
    setEditMode(false);
    setErrors({});
  };

  const handleChangePassword = async () => {
    if (!validatePassword()) return;

    try {
      if(oldPassword!== newPassword){
        toast.error("Password does not match")
        return
      }
      const response = await CHANGEPASSWORD({
        oldPassword,
        newPassword
      },navigate, dispatch);
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Error changing password');
      console.error('Error changing password:', error);
    }
  };

  const handleCancelChangePassword = () => {
    setOldPassword("");
    setNewPassword("");
    setPasswordChangeMode(false);
    setErrors({});
  };

  if (!userData) return <div>Loading...</div>;

  return (
    <>
      <Navbar title={"User Details"} />
      <Sidebar />

      <div className="ml-20 mt-4">
        <h1 className="bg-purple-400 py-4 px-6 text-xl text-white font-semibold">
          Admin Details
        </h1>
        <div className="p-6 bg-white space-y-6">
          {passwordChangeMode ? (
            <div className='md:w-[50%] w-full'>
              <p className="font-semibold text-lg mb-2">Change Password</p>
              <div className="relative mb-2">
                <input
                  type={showOldPassword ? "text" : "password"}
                  placeholder="Old Password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="border p-2 rounded w-full"
                />
                <button
                  type="button"
                  onClick={() => setShowOldPassword(!showOldPassword)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                >
                  {showOldPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.oldPassword && <p className="text-red-500 text-sm mb-3">{errors.oldPassword}</p>}
              <div className="relative mb-2">
                <input
                  type={showNewPassword ? "text" : "password"}
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="border p-2 rounded w-full"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                >
                  {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.newPassword && <p className="text-red-500 text-sm mb-3">{errors.newPassword}</p>}
              <div className="flex justify-between mt-4">
                <button
                  onClick={handleChangePassword}
                  className="bg-green-500 text-white py-2 px-4 rounded"
                >
                  Change Password
                </button>
                <button
                  onClick={handleCancelChangePassword}
                  className="bg-red-500 text-white py-2 px-4 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className='md:w-[50%] w-full'>
              <div className='mb-3'>
                <p className="font-semibold text-lg">User Name</p>
                {editMode ? (
                  <div>
                    <input
                      type="text"
                      value={updatedName}
                      onChange={(e) => setUpdatedName(e.target.value)}
                      className="border p-2 rounded w-full"
                    />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                  </div>
                ) : (
                  <p className='mt-1'> {userData.name}</p>
                )}
              </div>
              <div className='mb-3'>
                <p className="font-semibold text-lg">Email</p>
                {editMode ? (
                  <div>
                    <input
                      type="email"
                      value={updatedEmail}
                      onChange={(e) => setUpdatedEmail(e.target.value)}
                      className="border p-2 rounded w-full"
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                  </div>
                ) : (
                  <p className='mt-1'>{userData.email}</p>
                )}
              </div>
              {editMode && (
                <div className='flex gap-x-4'>
                  <button
                    onClick={handleUpdateDetails}
                    className="bg-green-500 text-white py-2 px-4 rounded"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={handleCancelUpdateDetails}
                    className="bg-red-500 text-white py-2 px-4 rounded"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex space-x-4">
          {!passwordChangeMode && (
            <>
              {!editMode && (
                <button
                  onClick={() => setEditMode(true)}
                  className="bg-blue-500 text-white py-2 px-4 rounded"
                >
                  Edit Details
                </button>
              )}
              {!editMode && (
                <button
                  onClick={() => setPasswordChangeMode(true)}
                  className="bg-green-500 text-white py-2 px-4 rounded"
                >
                  Change Password
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ViewUserDetails;
