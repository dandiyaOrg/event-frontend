import React, { useState, useRef, useEffect } from "react";
import { IoClose } from "react-icons/io5";

// OTP Input Component
const OTPInput = ({ length = 6, onOtpComplete }) => {
  const [otp, setOtp] = useState(Array(length).fill(''));
  const inputs = useRef([]);

  // Clear the refs array before each render to avoid stale references
  useEffect(() => {
    inputs.current = inputs.current.slice(0, length);
  }, [length]);

//   useEffect(() => {
//     // Focus the first input after component mounts
//     if (inputs.current) {
//       inputs.current.focus();
//     }
//   }, []);

  const handleChange = (e, index) => {
    const { value } = e.target;
    
    // Only allow single digit input
    if (value.match(/^\d$/)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move focus to the next input
      if (index < length - 1 && inputs.current[index + 1]) {
        inputs.current[index + 1].focus();
      }

      // Check if OTP is complete
      if (newOtp.every(digit => digit !== '') && onOtpComplete) {
        onOtpComplete(newOtp.join(''));
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      if (otp[index] === '') {
        // Move focus to previous input on backspace if current input is empty
        if (index > 0 && inputs.current[index - 1]) {
          inputs.current[index - 1].focus();
        }
      } else {
        // Clear current input
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').slice(0, length);
    
    if (pasteData.match(/^\d+$/)) {
      const newOtp = pasteData.split('').concat(Array(length).fill('')).slice(0, length);
      setOtp(newOtp);
      
      // Focus on the next empty field or last field
      const nextIndex = Math.min(pasteData.length, length - 1);
      if (inputs.current[nextIndex]) {
        inputs.current[nextIndex].focus();
      }
      
      // Check if OTP is complete
      if (newOtp.every(digit => digit !== '') && onOtpComplete) {
        onOtpComplete(newOtp.join(''));
      }
    }
  };

  return (
    <div className="flex justify-center gap-3">
      {otp.map((digit, index) => (
        <input
          key={index}
          ref={(el) => {
            if (el) {
              inputs.current[index] = el;
            }
          }}
          type="text"
          maxLength="1"
          value={digit}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          className="w-12 h-12 text-center text-xl font-semibold border-2 border-gray-300 rounded-lg focus:border-[#78833f] focus:outline-none transition-colors"
        />
      ))}
    </div>
  );
};

// OTP Modal Component
const OTPModal = ({ isOpen, onClose, onVerify, email, isLoading }) => {
  const [otp, setOtp] = useState('');
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (isOpen && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setCanResend(true);
    }
  }, [timeLeft, isOpen]);

  // Reset states when modal opens
  useEffect(() => {
    if (isOpen) {
      setOtp('');
      setTimeLeft(300);
      setCanResend(false);
    }
  }, [isOpen]);

  const handleOtpComplete = (completedOtp) => {
    setOtp(completedOtp);
  };

  const handleVerify = () => {
    if (otp.length === 6) {
      onVerify(otp);
    }
  };

  const handleResend = async () => {
    // Add your resend OTP logic here
    setTimeLeft(300);
    setCanResend(false);
    setOtp('');
    console.log('Resending OTP to:', email);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <IoClose size={24} />
        </button>
        
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">Enter Verification Code</h2>
          <p className="text-gray-600 mb-6">
            We've sent a 6-digit verification code to<br />
            <span className="font-medium">{email}</span>
          </p>
          
          <div className="mb-6">
            <OTPInput onOtpComplete={handleOtpComplete} />
          </div>
          
          <button
            onClick={handleVerify}
            disabled={otp.length !== 6 || isLoading}
            className="w-full py-3 bg-gray-700 text-white font-medium rounded-lg hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition mb-4"
          >
            {isLoading ? 'Verifying...' : 'Verify Code'}
          </button>
          
          <div className="text-center">
            {!canResend ? (
              <p className="text-gray-500 text-sm">
                Resend code in {formatTime(timeLeft)}
              </p>
            ) : (
              <button
                onClick={handleResend}
                className="text-[#78833f] hover:underline text-sm font-medium"
              >
                Resend verification code
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPModal;
