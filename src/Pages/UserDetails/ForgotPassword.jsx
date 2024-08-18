import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { VERIFYOTP, RESETPASSWORD, FORGOTPASSWORD } from '../../service';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Loader from '../Loader/Loader'; // Assuming you have a Loader component

const ForgotPassword = () => {
  const email = sessionStorage.getItem('forgotPasswordEmail');
  const navigate = useNavigate();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otpVerified, setOtpVerified] = useState(false);
  const [error, setError] = useState('');
  const [resendTimer, setResendTimer] = useState(120);
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(true); // Set initial loading to true

  useEffect(() => {
    // Reset the loading state after initial data fetch
    setLoading(false);

    const timer =
      resendTimer > 0 &&
      setInterval(() => setResendTimer((prev) => prev - 1), 1000);

    return () => clearInterval(timer);
  }, [resendTimer]);

  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    const updatedOtp = [...otp];

    if (/^\d$/.test(value)) {
      updatedOtp[index] = value;
      setOtp(updatedOtp);

      if (index < otp.length - 1 && value !== '') {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      const updatedOtp = [...otp];
      if (updatedOtp[index] === '') {
        if (index > 0) {
          updatedOtp[index - 1] = '';
          document.getElementById(`otp-${index - 1}`).focus();
        }
      } else {
        updatedOtp[index] = '';
      }
      setOtp(updatedOtp);
    }
  };

  const handleOtpPaste = (e, index) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, otp.length - index).split('');
    const newOtp = [...otp];
    let i = index;

    pastedData.forEach((char) => {
      if (/^\d$/.test(char) && i < otp.length) {
        newOtp[i] = char;
        i++;
      }
    });

    setOtp(newOtp);

    if (i < otp.length) {
      document.getElementById(`otp-${i}`).focus();
    }
  };

  const handleVerifyOtp = async () => {
    setLoading(true); // Set loading to true before making the API request
    try {
      const otpString = otp.join('');
      if (!email) {
        throw new Error('Email is not found in session storage.');
      }

      const response = await VERIFYOTP({ email, otp: otpString });
      if (response?.data?.success) {
        setOtpVerified(true);
        setResendTimer(120);
        setError('');
      } else {
        setError(response?.data?.message || 'Verification failed');
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'An error occurred');
      console.error('Error verifying OTP:', error);
    } finally {
      setLoading(false); // Set loading to false after the API request
    }
  };

  const handleResendOtp = async () => {
    setLoading(true); // Set loading to true before making the API request
    setResendTimer(120);
    setOtp(['', '', '', '', '', '']);
    setOtpVerified(false);
    setConfirmPassword('');
    try {
      const response = await FORGOTPASSWORD({ email });
      if (response?.data?.success) {
        toast.success('OTP has been resent');
      } else {
        toast.error('Failed to resend OTP');
      }
    } catch (error) {
      toast.error('Failed to resend OTP');
    } finally {
      setLoading(false); // Set loading to false after the API request
    }
  };

  const handleResetPassword = async () => {
    if (newPassword.length < 8) {
      toast.error('Password must be at least 8 characters long');
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error('Password and Confirm Password must be the same.');
      return;
    }

    setLoading(true); // Set loading to true before making the API request
    try {
      const response = await RESETPASSWORD({ newPassword: newPassword, email }, navigate);
      if (response?.data?.success) {
        toast.success(response?.data?.message);
        sessionStorage.removeItem('forgotPasswordEmail');
      } else {
        toast.error(response?.data?.message || 'Password reset failed');
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'An error occurred');
      console.error('Error resetting password:', error);
    } finally {
      setLoading(false); // Set loading to false after the API request
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 p-6">
      {loading && <Loader />} {/* Show loader while loading */}

      {/* OTP Section */}
      <div className="w-full max-w-xl bg-white shadow-md rounded p-6 my-10">
        <h2 className="text-2xl font-bold mb-4">Enter OTP</h2>
        <div className="flex justify-between mb-4 gap-x-6">
          {otp.map((value, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              value={value}
              onChange={(e) => handleOtpChange(e, index)}
              onKeyDown={(e) => handleOtpKeyDown(e, index)}
              onPaste={(e) => handleOtpPaste(e, index)}
              maxLength="1"
              disabled={otpVerified}
              className="border text-center w-16 h-16 rounded focus:outline-none"
            />
          ))}
        </div>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <div className="flex items-center justify-between">
          <button
            onClick={handleVerifyOtp}
            className="bg-blue-500 text-white py-2 px-4 rounded"
            disabled={otpVerified}
          >
            Verify OTP
          </button>
          {resendTimer <= 0 ? (
            <span
              onClick={handleResendOtp}
              className="text-blue-500 cursor-pointer"
            >
              Resend OTP
            </span>
          ) : (
            <p className="text-gray-500">
              You can resend OTP in {Math.floor(resendTimer / 60)}:{resendTimer % 60}
            </p>
          )}
        </div>
      </div>

      {/* Password Reset Section */}
      {otpVerified && (
        <div className="w-full max-w-xl bg-white shadow-md rounded p-6">
          <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
          <div className="mb-4 relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="border p-3 rounded w-full"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 cursor-pointer"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <div className="mb-4 relative">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="border p-3 rounded w-full"
            />
            <span
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-3 cursor-pointer"
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <button
            onClick={handleResetPassword}
            className="bg-green-500 text-white py-2 px-4 rounded"
          >
            Reset Password
          </button>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
