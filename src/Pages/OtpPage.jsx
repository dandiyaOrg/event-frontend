import React, { useState, useEffect } from 'react';
import { useVerifyOtpMutation } from '../features/auth/authApi';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function OtpPage() {
  const [otp, setOtp] = useState('');
  const [verifyOtp, { isLoading, error }] = useVerifyOtpMutation();
  const admin_id = useSelector((state) => state.auth.adminId);
  const navigate = useNavigate();
  
  // Timer state
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [isTimerActive, setIsTimerActive] = useState(true);

  // Timer effect
  useEffect(() => {
    let interval = null;
    
    if (isTimerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft => timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsTimerActive(false);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerActive, timeLeft]);

  // Format time display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await verifyOtp({ admin_id, otp }).unwrap();
      navigate('/'); 
    } catch (err) {
      console.error('OTP verification failed:', err);
    }
  };

  const handleResendOtp = () => {
    // Reset timer and make it active again
    setTimeLeft(300); // Reset to 5 minutes
    setIsTimerActive(true);
    
    // Here you would typically call your resend OTP API
    console.log('Resending OTP...');
    // Example: resendOtp({ admin_id });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Enter OTP</h2>
            <p className="text-gray-600 text-sm">
              Please enter the verification code sent to your device
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* OTP Input */}
            <div className="space-y-2">
              <label htmlFor="otp" className="block text-sm font-semibold text-gray-700">
                Verification Code
              </label>
              <input
                id="otp"
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter 6-digit OTP"
                maxLength="6"
                className="w-full px-4 py-3 text-center text-lg font-semibold border border-gray-300 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                inputMode="numeric"
                pattern="\d*"
                autoComplete="one-time-code"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-center space-x-2 text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
                <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium">Invalid OTP. Please try again.</span>
              </div>
            )}

            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={isLoading || otp.length !== 6}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-3 px-4 rounded-xl font-semibold text-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed transform disabled:transform-none hover:scale-[1.02] active:scale-[0.98]"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Verifying...</span>
                </div>
              ) : (
                'Verify OTP'
              )}
            </button>

            {/* Resend Link with Timer */}
            <div className="text-center">
              <p className="text-gray-600 text-sm">
                Didn't receive the code?{' '}
                {isTimerActive && timeLeft > 0 ? (
                  <span className="text-gray-500 font-semibold">
                    Resend in {formatTime(timeLeft)}
                  </span>
                ) : (
                  <button 
                    type="button" 
                    onClick={handleResendOtp}
                    className="text-blue-600 hover:text-blue-700 font-semibold hover:underline transition-colors duration-200"
                  >
                    Resend OTP
                  </button>
                )}
              </p>
            </div>
          </form>

          {/* Help Text */}
          <div className="mt-6 pt-6 border-t border-gray-100">
            <p className="text-xs text-gray-500 text-center">
              Enter the 6-digit code sent to your registered mobile number or email
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OtpPage;
