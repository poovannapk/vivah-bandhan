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

export const RegisterPage: React.FC<{
  onSwitchToLogin?: () => void;
  onSuccess?: () => void;
  embedded?: boolean;
}> = ({ onSwitchToLogin, onSuccess, embedded = false }) => {
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
  const [socialLoading, setSocialLoading] = useState<'google' | 'facebook' | null>(null);
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

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (step === 1) {
      if (!validateStep1()) return;
      setStep(2);
      return;
    }

    try {
      await register({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender,
      });
      onSuccess?.();
      navigate('/dashboard');
    } catch (err) {
      if (err instanceof Error) setError(err.message || 'Registration failed');
      else setError('Registration failed');
    }
  };

  // Social login handlers
  const handleGoogleLogin = () => {
    setSocialLoading('google');
    window.location.href = '/api/auth/google';
  };
  const handleFacebookLogin = () => {
    setSocialLoading('facebook');
    window.location.href = '/api/auth/facebook';
  };

  const optionButtonClass = (isActive: boolean) => `${embedded ? 'px-2 py-1.5 text-xs' : 'px-3 py-2 text-sm'} rounded-lg border transition-colors ${
    isActive
      ? 'border-primary-500 bg-primary-50 text-primary-600'
      : 'border-gray-300 hover:border-gray-400'
  }`;
  const compactInputClass = embedded ? 'py-2 text-sm' : '';
  const compactIconClass = embedded ? 'h-4 w-4' : 'h-5 w-5';

  return (
    <div className={`${embedded ? 'min-h-0 bg-white px-0 py-0' : 'min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50 px-4 sm:px-6 lg:px-8 py-12'} flex items-center justify-center`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`${embedded ? 'max-w-full' : 'max-w-lg'} w-full`}
      >
        <Card className={embedded ? 'p-0 shadow-none border-0' : 'p-8'}>
          {/* Header */}
          <div className={`text-center ${embedded ? 'mb-3' : 'mb-8'}`}>
            <div className={`flex justify-center ${embedded ? 'mb-2' : 'mb-4'}`}>
              <div className={`bg-gradient-to-r from-primary-500 to-secondary-500 ${embedded ? 'p-2' : 'p-3'} rounded-full`}>
                <Handshake className={`${embedded ? 'h-6 w-6' : 'h-8 w-8'} text-white`} />
              </div>
            </div>
            <h2 className={`${embedded ? 'text-xl' : 'text-3xl'} font-bold text-gray-900 mb-1`}>
              {step === 1 ? 'Create Account' : 'Complete Profile'}
            </h2>
            <p className={`${embedded ? 'text-xs' : ''} text-gray-600`}>
              {step === 1 
                ? 'Join thousands of people finding their perfect match' 
                : 'Tell us more about yourself to get better matches'
              }
            </p>
          </div>

          {/* Progress Bar */}
          <div className={embedded ? 'mb-3' : 'mb-8'}>
            <div className="flex items-center justify-between mb-1">
              <span className={`${embedded ? 'text-xs' : 'text-sm'} font-medium text-gray-700`}>Step {step} of 2</span>
              <span className={`${embedded ? 'text-xs' : 'text-sm'} font-medium text-gray-700`}>{step === 1 ? '50%' : '100%'}</span>
            </div>
            <div className={`w-full bg-gray-200 rounded-full ${embedded ? 'h-1.5' : 'h-2'}`}>
              <div 
                className={`bg-gradient-to-r from-primary-500 to-secondary-500 ${embedded ? 'h-1.5' : 'h-2'} rounded-full transition-all duration-300`}
                style={{ width: `${step * 50}%` }}
              />
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleRegister}>
            {error && (
              <div className={`bg-red-50 border border-red-200 text-red-600 px-4 ${embedded ? 'py-2 mb-3' : 'py-3 mb-6'} rounded-lg text-sm`}>
                {error}
              </div>
            )}

            {step === 1 ? (
              <div className={embedded ? 'space-y-3' : 'space-y-6'}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Input
                    type="text"
                    label="First Name"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    icon={<User className={compactIconClass} />}
                    className={compactInputClass}
                    placeholder="John"
                    required
                  />
                  <Input
                    type="text"
                    label="Last Name"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    icon={<User className={compactIconClass} />}
                    className={compactInputClass}
                    placeholder="Doe"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Input
                    type="email"
                    label="Email Address"
                    value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      icon={<Mail className={compactIconClass} />}
                      className={compactInputClass}
                      placeholder="Enter your email"
                      required
                      data-testid="register-email"
                  />

                  <Input
                    type="tel"
                    label="Phone Number"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    icon={<Phone className={compactIconClass} />}
                    className={compactInputClass}
                    placeholder="+91 12345 67890"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="relative">
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      label="Password"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      icon={<Lock className={compactIconClass} />}
                      className={compactInputClass}
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
                      icon={<Lock className={compactIconClass} />}
                      className={compactInputClass}
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
                </div>

                <Button type="submit" size={embedded ? 'sm' : 'md'} className="w-full">
                  Continue
                </Button>
              </div>
            ) : (
              <div className={embedded ? 'grid grid-cols-1 lg:grid-cols-4 gap-3' : 'space-y-6'}>
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
                        className={optionButtonClass(formData.profileFor === option.value)}
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
                        className={optionButtonClass(formData.maritalStatus === option.value)}
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
                  <div className={`grid grid-cols-3 ${embedded ? 'gap-2' : 'gap-4'}`}>
                    {[
                      { value: 'male', label: 'Male' },
                      { value: 'female', label: 'Female' },
                      { value: 'other', label: 'Other' }
                    ].map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => handleInputChange('gender', option.value)}
                        className={`${embedded ? 'px-2 py-2 text-xs' : 'px-4 py-3 text-sm'} rounded-lg border-2 transition-colors ${
                          formData.gender === option.value
                            ? 'border-primary-500 bg-primary-50 text-primary-600'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        <UserCircle className={`${embedded ? 'h-4 w-4' : 'h-5 w-5'} mx-auto mb-1`} />
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className={embedded ? 'grid grid-cols-1 gap-3' : 'space-y-6'}>
                  <Input
                    type="date"
                    label="Date of Birth"
                    value={formData.dateOfBirth}
                    onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                    icon={<Calendar className={compactIconClass} />}
                    className={compactInputClass}
                    required
                  />

                  <Input
                    type="text"
                    label="City"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    icon={<MapPin className={compactIconClass} />}
                    className={compactInputClass}
                    placeholder="Enter your city"
                    required
                  />
                </div>

                <div className={`${embedded ? 'lg:col-span-4' : ''} flex space-x-3`}>
                  <Button
                    type="button"
                    variant="outline"
                    size={embedded ? 'sm' : 'md'}
                    onClick={() => setStep(1)}
                    className="w-full"
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    size={embedded ? 'sm' : 'md'}
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
          {(!embedded || step === 1) && <div className={embedded ? 'my-3' : 'my-6'}>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>
          </div>}

          {/* Social Login Buttons */}
          {(!embedded || step === 1) && <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" size={embedded ? 'sm' : 'md'} className="w-full" onClick={handleGoogleLogin} type="button" isLoading={socialLoading === 'google'} disabled={socialLoading !== null}>
              <img src="https://www.google.com/favicon.ico" alt="Google" className={`${embedded ? 'h-4 w-4' : 'h-5 w-5'} mr-2`} />
              Google
            </Button>
            <Button variant="outline" size={embedded ? 'sm' : 'md'} className="w-full" onClick={handleFacebookLogin} type="button" isLoading={socialLoading === 'facebook'} disabled={socialLoading !== null}>
              <img src="https://www.facebook.com/favicon.ico" alt="Facebook" className={`${embedded ? 'h-4 w-4' : 'h-5 w-5'} mr-2`} />
              Facebook
            </Button>
          </div>}

          {/* Footer */}
          {(!embedded || step === 1) && <div className={embedded ? 'mt-3 text-center' : 'mt-8 text-center'}>
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
            <p className={`${embedded ? 'text-[11px] leading-4' : 'text-xs'} text-gray-500 mt-2`}>
              By creating an account, you agree to our{' '}
              <Link to="/terms" className="text-primary-600 hover:text-primary-500">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link to="/privacy" className="text-primary-600 hover:text-primary-500">
                Privacy Policy
              </Link>
            </p>
          </div>}
        </Card>
      </motion.div>
    </div>
  );
};
