import React from 'react';
import { Link } from 'react-router-dom';
import { Handshake, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-primary-500 to-secondary-500 p-2 rounded-lg">
                <Handshake className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">Vivah Bandhan</span>
            </div>
            <p className="text-gray-300 text-sm leading-6">
              India's most trusted matrimony platform powered by AI. Finding perfect matches with advanced compatibility algorithms and horoscope matching.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/search" className="text-gray-300 hover:text-white transition-colors">Search Profiles</Link></li>
              <li><Link to="/matches" className="text-gray-300 hover:text-white transition-colors">My Matches</Link></li>
              <li><Link to="/success-stories" className="text-gray-300 hover:text-white transition-colors">Success Stories</Link></li>
              <li><Link to="/pricing" className="text-gray-300 hover:text-white transition-colors">Membership Plans</Link></li>
              <li><Link to="/help" className="text-gray-300 hover:text-white transition-colors">Help & Support</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Services</h3>
            <ul className="space-y-2 text-sm">
              <li><span className="text-gray-300">AI Matchmaking</span></li>
              <li><span className="text-gray-300">Horoscope Matching</span></li>
              <li><span className="text-gray-300">Profile Verification</span></li>
              <li><span className="text-gray-300">Video Calls</span></li>
              <li><span className="text-gray-300">Personal Counselor</span></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-primary-500" />
                <span className="text-gray-300">+91 12345 67890</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-primary-500" />
                <span className="text-gray-300">support@vivahbandhan.ai</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-primary-500" />
                <span className="text-gray-300">Mumbai, Maharashtra, India</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-400">
              © 2024 Vivah Bandhan. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link to="/cookies" className="text-gray-400 hover:text-white transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};