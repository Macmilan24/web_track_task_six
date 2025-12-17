import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { verifyEmail } from '../services/apiService';
import { isValidOTP } from '../utils/validation';

const VerifyEmail = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email || '';

    const [otp, setOtp] = useState(['', '', '', '']);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [countdown, setCountdown] = useState(60);
    const [canResend, setCanResend] = useState(false);

    const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

    // Countdown timer
    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        } else {
            setCanResend(true);
        }
    }, [countdown]);

    useEffect(() => {
        inputRefs[0].current?.focus();
    }, []);

    const handleChange = (index, value) => {
       
        if (!/^\d*$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value.slice(-1); 
        setOtp(newOtp);

        if (errors.otp) {
            setErrors({});
        }

        
        if (value && index < 3) {
            inputRefs[index + 1].current?.focus();
        }
    };

    const handleKeyDown = (index, e) => {
       
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs[index - 1].current?.focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').slice(0, 4);
        if (/^\d{4}$/.test(pastedData)) {
            const newOtp = pastedData.split('');
            setOtp(newOtp);
            inputRefs[3].current?.focus();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const otpString = otp.join('');

        if (!isValidOTP(otpString)) {
            setErrors({ otp: 'Please enter a valid 4-digit code' });
            return;
        }

        if (!email) {
            setErrors({ general: 'Email not found. Please sign up again.' });
            return;
        }

        setIsLoading(true);
        setErrors({});

        try {
            const result = await verifyEmail(email, otpString);

            if (result.success) {
                navigate('/signin', { state: { verified: true } });
            }
        } catch (error) {
            setErrors({
                general: error.message || 'Verification failed. Please try again.',
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleResend = async () => {
        if (!canResend) return;

        setCanResend(false);
        setCountdown(60);
        // TODO: Implement resend OTP API call  
        console.log('Resending OTP to:', email);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4 text-center">Verify Email</h1>

                    <p className="text-center text-gray-600 mb-8 text-sm">
                        We've sent a verification code to the email address you provided. To complete the
                        verification process, please enter the code here.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        
                        {errors.general && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                                {errors.general}
                            </div>
                        )}

                        
                        <div>
                            <div className="flex gap-3 justify-center mb-2">
                                {otp.map((digit, index) => (
                                    <input
                                        key={index}
                                        ref={inputRefs[index]}
                                        type="text"
                                        inputMode="numeric"
                                        maxLength={1}
                                        value={digit}
                                        onChange={(e) => handleChange(index, e.target.value)}
                                        onKeyDown={(e) => handleKeyDown(index, e)}
                                        onPaste={handlePaste}
                                        className={`w-16 h-16 text-center text-2xl font-bold border-2 ${errors.otp ? 'border-red-300' : 'border-indigo-200'
                                            } rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all`}
                                        disabled={isLoading}
                                    />
                                ))}
                            </div>
                            {errors.otp && <p className="text-center text-sm text-red-600">{errors.otp}</p>}
                        </div>

                          
                        <div className="text-center text-sm">
                            <span className="text-gray-600">You can request to </span>
                            <button
                                type="button"
                                onClick={handleResend}
                                disabled={!canResend}
                                className={`font-medium ${canResend
                                        ? 'text-indigo-600 hover:text-indigo-700 cursor-pointer'
                                        : 'text-gray-400 cursor-not-allowed'
                                    }`}
                            >
                                Resend code
                            </button>
                            {!canResend && (
                                <span className="text-gray-600"> in {Math.floor(countdown / 60)}:{String(countdown % 60).padStart(2, '0')}</span>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Verifying...
                                </span>
                            ) : (
                                'Continue'
                            )}
                        </button>

                      
                        <div className="text-center text-sm">
                            <Link to="/signup" className="text-gray-600 hover:text-indigo-600">
                                ← Back to Sign Up
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default VerifyEmail;
