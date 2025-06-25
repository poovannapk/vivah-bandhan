import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Lock, 
  Phone, 
  Calendar, 
  Eye, 
  EyeOff, 
  Handshake,
  UserCircle,
  MapPin
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';
import { GoogleLogin } from '@react-oauth/google';

export const RegisterPage: React.FC<{ onSwitchToLogin?: () => void }> = ({ onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    dateOfBirth: '',
    gender: 'male' as 'male' | 'female' | 'other',
    city: '',
    profileFor: 'self' as 'self' | 'son' | 'daughter' | 'brother' | 'sister' | 'friend',
    maritalStatus: 'Single' as 'Single' | 'Married' | 'Divorced' | 'Widowed' | 'Separated' | 'Common-law'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState(1);
  const { register, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateStep1 = () => {
    const { firstName, lastName, email, phone, password, confirmPassword } = formData;
    
    if (!firstName || !lastName || !email || !phone || !password || !confirmPassword) {
      setError('Please fill all required fields');
      return false;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    
    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return false;
    }
    
    return true;
  };

  const validateStep2 = () => {
    const { dateOfBirth, city } = formData;
    
    if (!dateOfBirth || !city) {
      setError('Please fill all required fields');
      return false;
    }
    
    const age = new Date().getFullYear() - new Date(dateOfBirth).getFullYear();
    if (age < 18) {
      setError('You must be at least 18 years old to register');
      return false;
    }
    
    return true;
  };

  const handleNext = () => {
    setError('');
    if (step === 1 && validateStep1()) {
      setStep(2);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateStep2()) return;

    try {
      // Call your API endpoint for registration
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || 'Registration failed. Please try again.');
        return;
      }

      // Optionally, handle returned user/token here
      // const data = await response.json();
      // await register(data);

      navigate('/profile-setup');
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-lg w-full"
      >
        <Card className="p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="bg-gradient-to-r from-primary-500 to-secondary-500 p-3 rounded-full">
                <Handshake className="h-8 w-8 text-white" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {step === 1 ? 'Create Account' : 'Complete Profile'}
            </h2>
            <p className="text-gray-600">
              {step === 1 
                ? 'Join thousands of people finding their perfect match' 
                : 'Tell us more about yourself to get better matches'
              }
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Step {step} of 2</span>
              <span className="text-sm font-medium text-gray-700">{step === 1 ? '50%' : '100%'}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${step * 50}%` }}
              />
            </div>
          </div>

          {/* Form */}
          <form onSubmit={step === 1 ? (e) => { e.preventDefault(); handleNext(); } : handleSubmit}>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm mb-6">
                {error}
              </div>
            )}

            {step === 1 ? (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    type="text"
                    label="First Name"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    icon={<User className="h-5 w-5" />}
                    placeholder="John"
                    required
                  />
                  <Input
                    type="text"
                    label="Last Name"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    icon={<User className="h-5 w-5" />}
                    placeholder="Doe"
                    required
                  />
                </div>

                <Input
                  type="email"
                  label="Email Address"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  icon={<Mail className="h-5 w-5" />}
                  placeholder="Enter your email"
                  required
                  data-testid="register-email"
                />

                <Input
                  type="tel"
                  label="Phone Number"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  icon={<Phone className="h-5 w-5" />}
                  placeholder="+91 12345 67890"
                  required
                />

                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    label="Password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    icon={<Lock className="h-5 w-5" />}
                    placeholder="Enter your password"
                    required
                    data-testid="register-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>

                <div className="relative">
                  <Input
                    type={showConfirmPassword ? 'text' : 'password'}
                    label="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    icon={<Lock className="h-5 w-5" />}
                    placeholder="Confirm your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>

                <Button type="submit" className="w-full">
                  Continue
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Profile Created For
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { value: 'self', label: 'Self' },
                      { value: 'son', label: 'Son' },
                      { value: 'daughter', label: 'Daughter' },
                      { value: 'brother', label: 'Brother' },
                      { value: 'sister', label: 'Sister' },
                      { value: 'friend', label: 'Friend' }
                    ].map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => handleInputChange('profileFor', option.value)}
                        className={`px-3 py-2 text-sm rounded-lg border transition-colors ${
                          formData.profileFor === option.value
                            ? 'border-primary-500 bg-primary-50 text-primary-600'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                 
                </div>

<div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Marital Status
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { value: 'Single', label: 'Single' },
                      { value: 'Married', label: 'Married' },
                      { value: 'Divorced', label: 'Divorced' },
                      { value: 'Widowed', label: 'Widowed' },
                      { value: 'Separated', label: 'Separated' },
                      { value: 'Common-law', label: 'Common-law' }
                    ].map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => handleInputChange('maritalStatus', option.value)}
                        className={`px-3 py-2 text-sm rounded-lg border transition-colors ${
                          formData.maritalStatus === option.value
                            ? 'border-primary-500 bg-primary-50 text-primary-600'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                 
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Gender
                  </label>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { value: 'male', label: 'Male' },
                      { value: 'female', label: 'Female' },
                      { value: 'other', label: 'Other' }
                    ].map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => handleInputChange('gender', option.value)}
                        className={`px-4 py-3 text-sm rounded-lg border-2 transition-colors ${
                          formData.gender === option.value
                            ? 'border-primary-500 bg-primary-50 text-primary-600'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        <UserCircle className="h-5 w-5 mx-auto mb-1" />
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                <Input
                  type="date"
                  label="Date of Birth"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                  icon={<Calendar className="h-5 w-5" />}
                  required
                />

                <Input
                  type="text"
                  label="City"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  icon={<MapPin className="h-5 w-5" />}
                  placeholder="Enter your city"
                  required
                />

                <div className="flex space-x-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(1)}
                    className="w-full"
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    className="w-full"
                    isLoading={isLoading}
                  >
                    Create Account
                  </Button>
                </div>
              </div>
            )}
          </form>

          {/* Divider */}
          <div className="my-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>
          </div>

          {/* Social Login Buttons */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <Button variant="outline" className="w-full">
              <img src="https://www.google.com/favicon.ico" alt="Google" className="h-5 w-5 mr-2" />
              Google
            </Button>
            <Button variant="outline" className="w-full">
              <img src="https://www.facebook.com/favicon.ico" alt="Facebook" className="h-5 w-5 mr-2" />
              Facebook
            </Button>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              {onSwitchToLogin ? (
                <button
                  type="button"
                  onClick={onSwitchToLogin}
                  className="font-medium text-primary-600 hover:text-primary-500 focus:outline-none"
                >
                  Sign in
                </button>
              ) : (
                <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
                  Sign in
                </Link>
              )}
            </p>
            <p className="text-xs text-gray-500 mt-2">
              By creating an account, you agree to our{' '}
              <Link to="/terms" className="text-primary-600 hover:text-primary-500">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link to="/privacy" className="text-primary-600 hover:text-primary-500">
                Privacy Policy
              </Link>
            </p>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};