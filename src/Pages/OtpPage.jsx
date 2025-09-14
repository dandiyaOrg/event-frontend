import React, { useState } from 'react';
import { useVerifyOtpMutation } from '../features/auth/authApi';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function OtpPage() {
  const [otp, setOtp] = useState('');
  const [verifyOtp, { isLoading, error }] = useVerifyOtpMutation();
  const admin_id = useSelector((state) => state.auth.adminId);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await verifyOtp({ admin_id, otp }).unwrap();
      navigate('/'); 
    } catch (err) {
      console.error('OTP verification failed:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Enter OTP</h2>
      <input
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        placeholder="Enter OTP"
      />
      <button type="submit" disabled={isLoading}>Verify OTP</button>
      {error && <div style={{ color: 'red' }}>Invalid OTP</div>}
    </form>
  );
}

export default OtpPage;
