import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Heart,
  MessageCircle,
  Eye,
  Star,
  MapPin,
  Briefcase,
  GraduationCap,
  Calendar,
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import { useAuth } from '../context/AuthContext';

import { matches } from '../data/matches';

export const MatchesPage: React.FC = () => {
  const { user } = useAuth();
  const [selectedProfile, setSelectedProfile] = useState<any>(null);

  // Dummy handlers for interest/message (replace with real logic)
  const handleSendInterest = (profileId: string) => {
    // TODO: Connect to backend
    console.log('Sending interest to:', profileId);
  };
  const handleSendMessage = (profileId: string) => {
    // TODO: Connect to backend
    console.log('Sending message to:', profileId);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-8 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Matches</h1>
          <p className="text-gray-600">View and connect with your mutual matches</p>
        </div>

        {/* Matches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {matches.map((profile, index) => (
            <motion.div
              key={profile.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative">
                  <img
                    src={profile.photos[0]}
                    alt={profile.name}
                    className="w-full h-64 object-cover cursor-pointer"
                    onClick={() => setSelectedProfile(profile)}
                  />
                  {/* Status Indicators */}
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {profile.isOnline && (
                      <Badge variant="success" size="sm">Online</Badge>
                    )}
                    {profile.verified && (
                      <Badge variant="primary" size="sm">✓ Verified</Badge>
                    )}
                    {profile.premium && (
                      <Badge variant="warning" size="sm">👑 Premium</Badge>
                    )}
                  </div>
                  {/* Compatibility Score */}
                  <div className="absolute top-3 right-3">
                    <div className="bg-primary-500 text-white px-2 py-1 rounded-full text-sm font-medium">
                      {profile.compatibility}% Match
                    </div>
                  </div>
                  {/* Quick Actions */}
                  <div className="absolute bottom-3 right-3 flex gap-2">
                    <button
                      onClick={() => handleSendInterest(profile.id)}
                      className="bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-colors"
                    >
                      <Heart className="h-5 w-5 text-red-500" />
                    </button>
                    <button
                      onClick={() => handleSendMessage(profile.id)}
                      className="bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-colors"
                    >
                      <MessageCircle className="h-5 w-5 text-primary-500" />
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {profile.name}, {profile.age}
                    </h3>
                    <div className="flex items-center text-yellow-500">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="text-sm ml-1">{profile.horoscopeMatch}%</span>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <GraduationCap className="h-4 w-4 mr-2" />
                      <span>{profile.education}</span>
                    </div>
                    <div className="flex items-center">
                      <Briefcase className="h-4 w-4 mr-2" />
                      <span>{profile.occupation} at {profile.company}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>{profile.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>{profile.lastSeen}</span>
                    </div>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => handleSendInterest(profile.id)}
                      className="flex-1"
                    >
                      <Heart className="h-4 w-4 mr-1" />
                      Interest
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedProfile(profile)}
                      className="flex-1"
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Profile Detail Modal */}
        {selectedProfile && (
          <Modal
            isOpen={!!selectedProfile}
            onClose={() => setSelectedProfile(null)}
            size="xl"
          >
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <img
                    src={selectedProfile.photos[0]}
                    alt={selectedProfile.name}
                    className="w-full h-80 object-cover rounded-lg"
                  />
                </div>
                <div className="space-y-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {selectedProfile.name}, {selectedProfile.age}
                    </h2>
                    <p className="text-gray-600">{selectedProfile.occupation}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Height:</span> {selectedProfile.height}
                    </div>
                    <div>
                      <span className="font-medium">Religion:</span> {selectedProfile.religion}
                    </div>
                    <div>
                      <span className="font-medium">Caste:</span> {selectedProfile.caste}
                    </div>
                    <div>
                      <span className="font-medium">Mother Tongue:</span> {selectedProfile.motherTongue}
                    </div>
                    <div>
                      <span className="font-medium">Salary:</span> {selectedProfile.salary}
                    </div>
                    <div>
                      <span className="font-medium">Family:</span> {selectedProfile.familyType}
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary-600">
                        {selectedProfile.compatibility}%
                      </div>
                      <div className="text-sm text-gray-600">Compatibility</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-yellow-600">
                        {selectedProfile.horoscopeMatch}%
                      </div>
                      <div className="text-sm text-gray-600">Horoscope Match</div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">About Me</h3>
                <p className="text-gray-600">{selectedProfile.aboutMe}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Hobbies & Interests</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProfile.hobbies.map((hobby: string, index: number) => (
                    <Badge key={index} variant="secondary">{hobby}</Badge>
                  ))}
                </div>
              </div>
              <div className="flex gap-4 pt-4">
                <Button
                  onClick={() => handleSendInterest(selectedProfile.id)}
                  className="flex-1"
                >
                  <Heart className="h-5 w-5 mr-2" />
                  Send Interest
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleSendMessage(selectedProfile.id)}
                  className="flex-1"
                >
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Send Message
                </Button>
              </div>
            </div>
          </Modal>
        )}

        {/* Load More */}
        <div className="text-center mt-8">
          <Button variant="outline" size="lg">
            Load More Profiles
          </Button>
        </div>

        {/* Get Started Button */}
        {!user && (
          <div className="flex justify-center my-8">
            <Button size="lg" className="px-8 py-4" disabled>
              Get Started
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MatchesPage;
