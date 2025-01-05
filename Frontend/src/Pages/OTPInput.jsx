import React, { useState ,useCallback} from 'react';
import axios from 'axios';
import {  useLocation } from 'react-router-dom';
import '../CSSFiles/Welcome.css';
// Toastify
import { toast } from 'react-toastify';

const OtpInput = () => {
  const [otp, setOtp] = useState('');
  const location = useLocation();
  const email = location.state?.email; // Retrieve email from navigation state
  

  const handleChange =useCallback( (e) => {
    const { value } = e.target;
    setOtp(value);
  })

  const handleSubmit = useCallback( async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/ARZ/user/verifyotp', { enteredOtp: otp, email });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        window.location.href = '/';
        toast.success('Valid OTP.');
      } else {
        toast.error('Invalid OTP.');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      toast.error('Error verifying OTP. Please try again.');
    }
  })

  return (
    <div className='otpContainer container-fluid ' >
      <h2  className='mb-4'><strong>OTP Verification</strong></h2>
      <form onSubmit={handleSubmit} className='smOTPpage position-relative px-4 py-4 mx-6'>
        <label htmlFor="otp">Enter OTP:</label>
        <input
          type="text"
          id="otp"
          name="otp"
          value={otp}
          onChange={handleChange}
          maxLength="6"
          placeholder="Enter 6-digit OTP"
          className='m-4'
        />
        <button className='Wbtn btn btn-secondary' type="submit">Verify OTP</button>
      </form>
    </div>
  );
};

export default OtpInput;
