import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Handshake, Menu, X, User, Settings, LogOut, Bell } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { Modal } from '../ui/Modal';
import { LoginPage } from '../../pages/LoginPage';
import { RegisterPage } from '../../pages/RegisterPage';

export const Header: React.FC<{ onOpenLoginModal?: () => void; onOpenRegisterModal?: () => void }> = ({ onOpenLoginModal, onOpenRegisterModal }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-primary-500 to-secondary-500 p-2 rounded-lg">
              <Handshake className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              Vivaha Bandhana
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/search" className="text-gray-600 hover:text-primary-600 transition-colors">
              Search
            </Link>
            <Link to="/matches" className="text-gray-600 hover:text-primary-600 transition-colors">
              Matches
            </Link>
            <Link to="/messages" className="text-gray-600 hover:text-primary-600 transition-colors">
              Messages
            </Link>
            <Link to="/success-stories" className="text-gray-600 hover:text-primary-600 transition-colors">
              Success Stories
            </Link>
            <Link to="/pricing" className="text-gray-600 hover:text-primary-600 transition-colors">
              Pricing
            </Link>
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                {/* Notifications */}
                <button className="relative p-2 text-gray-600 hover:text-primary-600 transition-colors">
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 bg-primary-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    3
                  </span>
                </button>

                {/* Profile Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="h-8 w-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-white" />
                    </div>
                    <span className="hidden md:block text-sm font-medium text-gray-700">
                      {user.firstName}
                    </span>
                  </button>

                  <AnimatePresence>
                    {isProfileOpen && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1"
                      >
                        <Link
                          to="/dashboard"
                          className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <User className="h-4 w-4" />
                          <span>Dashboard</span>
                        </Link>
                        <Link
                          to="/profile"
                          className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <Settings className="h-4 w-4" />
                          <span>Profile Settings</span>
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <LogOut className="h-4 w-4" />
                          <span>Sign Out</span>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                {/* <Button variant="ghost" onClick={() => setShowLoginModal(true)}>
                  Sign In
                </Button> */}
                <Button onClick={onOpenRegisterModal}>
                  Get Started
                </Button>
                <Button
                  className="ml-2"
                  variant="outline"
                  onClick={() => {
                    // Set a dummy user in localStorage and reload
                    localStorage.setItem('user', JSON.stringify({
                      firstName: 'Demo',
                      lastName: 'User',
                      email: 'demo@vivah.com',
                      dateOfBirth: '1995-01-01',
                      gender: 'male',
                      phone: '9999999999',
                      occupation: 'Engineer',
                      city: 'Mumbai',
                      state: 'Maharashtra',
                      country: 'India',
                      // add more fields as needed
                    }));
                    window.location.reload();
                  }}
                >
                  Temporary Login
                </Button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-primary-600 transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100"
          >
            <div className="px-4 py-2 space-y-1">
              <Link
                to="/search"
                className="block px-3 py-2 text-gray-600 hover:text-primary-600 hover:bg-gray-50 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Search
              </Link>
              <Link
                to="/matches"
                className="block px-3 py-2 text-gray-600 hover:text-primary-600 hover:bg-gray-50 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Matches
              </Link>
              <Link
                to="/messages"
                className="block px-3 py-2 text-gray-600 hover:text-primary-600 hover:bg-gray-50 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Messages
              </Link>
              <Link
                to="/pricing"
                className="block px-3 py-2 text-gray-600 hover:text-primary-600 hover:bg-gray-50 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modals */}
      <Modal isOpen={false} onClose={() => {}} title="Sign In">
        <LoginPage onSwitchToRegister={() => {}} />
      </Modal>
      <Modal isOpen={false} onClose={() => {}} title="Create Account">
        <RegisterPage onSwitchToLogin={() => {}} />
      </Modal>
    </header>
  );
};