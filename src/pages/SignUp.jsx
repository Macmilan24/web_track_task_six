import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { signup } from '../services/apiService';
import { isValidEmail, validatePassword, doPasswordsMatch, isValidName } from '../utils/validation';

const SignUp = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!isValidName(formData.name)) {
            newErrors.name = 'Full name must be at least 2 characters';
        }

        if (!isValidEmail(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        const passwordValidation = validatePassword(formData.password);
        if (!passwordValidation.isValid) {
            newErrors.password = passwordValidation.message;
        }

        if (!doPasswordsMatch(formData.password, formData.confirmPassword)) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        if (!agreedToTerms) {
            newErrors.terms = 'You must agree to the Terms and Privacy Policy';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);
        setErrors({});

        try {
            const result = await signup(
                formData.name,
                formData.email,
                formData.password,
                formData.confirmPassword,
                'user'
            );

            if (result.success) {
                // Navigate to verification page with email
                navigate('/verify-email', { state: { email: formData.email } });
            }
        } catch (error) {
            setErrors({
                general: error.message || 'Signup failed. Please try again.',
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">Sign Up Today!</h1>

                    
                    <button
                        type="button"
                        className="w-full mb-6 py-3 px-4 border-2 border-gray-200 rounded-lg flex items-center justify-center gap-3 hover:bg-gray-50 transition-all duration-200 hover:border-indigo-300"
                    >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18.1713 8.36788H17.5V8.33329H10V11.6666H14.7096C14.0225 13.6069 12.1763 15 10 15C7.23875 15 5 12.7612 5 9.99996C5 7.23871 7.23875 4.99996 10 4.99996C11.2746 4.99996 12.4342 5.48079 13.3171 6.26621L15.6742 3.90913C14.1858 2.52204 12.1933 1.66663 10 1.66663C5.39792 1.66663 1.66667 5.39788 1.66667 9.99996C1.66667 14.602 5.39792 18.3333 10 18.3333C14.6021 18.3333 18.3333 14.602 18.3333 9.99996C18.3333 9.44121 18.2758 8.89579 18.1713 8.36788Z" fill="#FFC107" />
                            <path d="M2.62744 6.12121L5.36536 8.12913C6.10619 6.29496 7.90036 4.99996 9.99994 4.99996C11.2745 4.99996 12.4341 5.48079 13.317 6.26621L15.6741 3.90913C14.1858 2.52204 12.1933 1.66663 9.99994 1.66663C6.79911 1.66663 4.02327 3.47371 2.62744 6.12121Z" fill="#FF3D00" />
                            <path d="M10.0001 18.3333C12.1526 18.3333 14.1092 17.5095 15.5871 16.17L13.0079 13.9875C12.1429 14.6451 11.0863 15.0008 10.0001 15C7.83214 15 5.99214 13.6179 5.29881 11.6891L2.58131 13.7829C3.96048 16.4816 6.76131 18.3333 10.0001 18.3333Z" fill="#4CAF50" />
                            <path d="M18.1713 8.36788H17.5V8.33329H10V11.6666H14.7096C14.3809 12.5902 13.7889 13.3972 13.0067 13.9879L13.0079 13.9871L15.5871 16.1696C15.4046 16.3355 18.3333 14.1666 18.3333 9.99996C18.3333 9.44121 18.2758 8.89579 18.1713 8.36788Z" fill="#1976D2" />
                        </svg>
                        <span className="text-indigo-600 font-medium">Sign Up with Google</span>
                    </button>

                    <div className="flex items-center mb-6">
                        <div className="flex-1 h-px bg-gray-200"></div>
                        <span className="px-4 text-sm text-gray-500">Or Sign Up with Email</span>
                        <div className="flex-1 h-px bg-gray-200"></div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        
                        {errors.general && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                                {errors.general}
                            </div>
                        )}

                        
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                Full Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter your full name"
                                className={`w-full px-4 py-3 border ${errors.name ? 'border-red-300' : 'border-gray-200'
                                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all`}
                            />
                            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                        </div>

                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter email address"
                                className={`w-full px-4 py-3 border ${errors.email ? 'border-red-300' : 'border-gray-200'
                                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all`}
                            />
                            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                        </div>

                        
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Enter password"
                                    className={`w-full px-4 py-3 pr-12 border ${errors.password ? 'border-red-300' : 'border-gray-200'
                                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                            {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="Enter password"
                                    className={`w-full px-4 py-3 pr-12 border ${errors.confirmPassword ? 'border-red-300' : 'border-gray-200'
                                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                                >
                                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                            {errors.confirmPassword && (
                                <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                            )}
                        </div>

                        {/* Submit Button */}
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
                                    Creating Account...
                                </span>
                            ) : (
                                'Continue'
                            )}
                        </button>

                       
                        <div className="text-center text-sm">
                            <span className="text-gray-600">Already have an account? </span>
                            <Link to="/signin" className="text-indigo-600 font-medium hover:text-indigo-700">
                                Login
                            </Link>
                        </div>

                        
                        <div className="text-xs text-gray-600 text-center pt-2">
                            <label className="flex items-start gap-2 justify-center">
                                <input
                                    type="checkbox"
                                    checked={agreedToTerms}
                                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                                    className="mt-0.5"
                                />
                                <span>
                                    By clicking Continue, you acknowledge that you have read and accepted our{' '}
                                    <a href="#" className="text-indigo-600 underline">
                                        Terms of Service
                                    </a>{' '}
                                    and{' '}
                                    <a href="#" className="text-indigo-600 underline">
                                        Privacy Policy
                                    </a>
                                    .
                                </span>
                            </label>
                            {errors.terms && <p className="mt-1 text-sm text-red-600">{errors.terms}</p>}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
