import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Heart, 
  MessageCircle, 
  Eye, 
  Star,
  MapPin,
  Briefcase,
  GraduationCap,
  Calendar,
  X,
  ChevronDown
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import { useAuth } from '../context/AuthContext';

// Place the profiles array here, outside the component
const profiles = [
  {
    id: '1',
    name: 'Priya Sharma',
    age: 26,
    height: '5.4',
    education: 'Masters in Computer Science',
    occupation: 'Software Engineer',
    company: 'Google',
    location: 'Mumbai, Maharashtra',
    religion: 'Hindu',
    caste: 'Brahmin',
    motherTongue: 'Hindi',
    salary: '₹15-20 LPA',
    photos: [
      'https://images.pexels.com/photos/1382734/pexels-photo-1382734.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    compatibility: 94,
    horoscopeMatch: 89,
    isOnline: true,
    lastSeen: 'Online now',
    verified: true,
    premium: true,
    aboutMe: 'I am a software engineer working at Google. I love traveling, reading books, and cooking. Looking for a life partner who shares similar values and interests.',
    hobbies: ['Reading', 'Traveling', 'Cooking', 'Photography'],
    familyType: 'Nuclear Family',
    manglik: 'No'
  },
  {
    id: '2',
    name: 'Ananya Patel',
    age: 24,
    height: '5.2',
    education: 'MBBS, MD',
    occupation: 'Doctor',
    company: 'Apollo Hospital',
    location: 'Ahmedabad, Gujarat',
    religion: 'Hindu',
    caste: 'Patel',
    motherTongue: 'Gujarati',
    salary: '₹12-15 LPA',
    photos: [
      'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    compatibility: 91,
    horoscopeMatch: 85,
    isOnline: false,
    lastSeen: '2 hours ago',
    verified: true,
    premium: false,
    aboutMe: 'I am a doctor by profession and believe in helping others. I enjoy classical music, yoga, and spending time with family.',
    hobbies: ['Music', 'Yoga', 'Reading', 'Gardening'],
    familyType: 'Joint Family',
    manglik: 'Yes'
  },
  {
    id: '3',
    name: 'Kavya Reddy',
    age: 28,
    height: '5.6',
    education: 'MBA in Marketing',
    occupation: 'Marketing Manager',
    company: 'Unilever',
    location: 'Hyderabad, Telangana',
    religion: 'Hindu',
    caste: 'Reddy',
    motherTongue: 'Telugu',
    salary: '₹18-25 LPA',
    photos: [
      'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    compatibility: 87,
    horoscopeMatch: 92,
    isOnline: true,
    lastSeen: 'Online now',
    verified: true,
    premium: true,
    aboutMe: 'Marketing professional with a passion for creativity and innovation. Love dancing, traveling, and trying new cuisines.',
    hobbies: ['Dancing', 'Traveling', 'Cooking', 'Movies'],
    familyType: 'Nuclear Family',
    manglik: 'Anshik'
  }
];

export const SearchPage: React.FC<{ onOpenRegisterModal?: () => void }> = ({ onOpenRegisterModal }) => {
  const { user } = useAuth();
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<any>(null);
  const [filters, setFilters] = useState({
    ageRange: [25, 35],
    heightRange: ['5.0', '6.0'],
    education: [] as string[],
    occupation: [] as string[],
    location: [] as string[],
    religion: [] as string[],
    maritalStatus: [] as string[]
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState(profiles);

  const educationOptions = [
    { value: 'bachelors', label: 'Bachelors' },
    { value: 'masters', label: 'Masters' },
    { value: 'phd', label: 'PhD' },
    { value: 'diploma', label: 'Diploma' },
    { value: 'professional', label: 'Professional Degree' }
  ];

  const occupationOptions = [
    { value: 'software', label: 'Software Engineer' },
    { value: 'doctor', label: 'Doctor' },
    { value: 'teacher', label: 'Teacher' },
    { value: 'business', label: 'Business' },
    { value: 'government', label: 'Government Job' }
  ];

  const handleSendInterest = (profileId: string) => {
    console.log('Sending interest to:', profileId);
  };

  const handleSendMessage = (profileId: string) => {
    console.log('Sending message to:', profileId);
  };

  const handleSearch = () => {
    const filteredResults = profiles.filter(profile =>
      profile.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setResults(filteredResults);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-8 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Find Your Perfect Match</h1>
          <p className="text-gray-600">Discover compatible profiles based on your preferences</p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Search by name, profession, location..."
                icon={<Search className="h-5 w-5" />}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                data-testid="search-input"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(true)}
              className="flex items-center"
            >
              <Filter className="h-5 w-5 mr-2" />
              Filters
            </Button>
          </div>
        </div>

        {/* Active Filters */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            <Badge variant="primary">Age: 25-35</Badge>
            <Badge variant="secondary">Height: 5.0-6.0</Badge>
            <Badge variant="success">Mumbai</Badge>
          </div>
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((profile, index) => (
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

        {/* Load More */}
        <div className="text-center mt-8">
          <Button variant="outline" size="lg">
            Load More Profiles
          </Button>
        </div>

        {/* Get Started Button */}
        {!user && (
          <div className="flex justify-center my-8">
            {onOpenRegisterModal ? (
              <Button size="lg" className="px-8 py-4" onClick={onOpenRegisterModal}>
                Get Started
              </Button>
            ) : (
              <Button size="lg" className="px-8 py-4" disabled>
                Get Started
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Filters Modal */}
      <Modal
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
        title="Search Filters"
        size="lg"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Age Range: {filters.ageRange[0]} - {filters.ageRange[1]}
              </label>
              <input
                type="range"
                min="18"
                max="60"
                value={filters.ageRange[1]}
                className="w-full"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Height Range
              </label>
              <div className="flex gap-2">
                <Select
                  options={[
                    { value: '4.0', label: '4.0 ft' },
                    { value: '5.0', label: '5.0 ft' },
                    { value: '6.0', label: '6.0 ft' }
                  ]}
                  value={filters.heightRange[0]}
                />
                <Select
                  options={[
                    { value: '5.0', label: '5.0 ft' },
                    { value: '6.0', label: '6.0 ft' },
                    { value: '7.0', label: '7.0 ft' }
                  ]}
                  value={filters.heightRange[1]}
                />
              </div>
            </div>

            <Select
              label="Education"
              options={educationOptions}
            />

            <Select
              label="Occupation"
              options={occupationOptions}
            />

            <Input
              label="Location"
              placeholder="Enter city, state"
            />

            <Select
              label="Religion"
              options={[
                { value: 'hindu', label: 'Hindu' },
                { value: 'muslim', label: 'Muslim' },
                { value: 'christian', label: 'Christian' },
                { value: 'sikh', label: 'Sikh' }
              ]}
            />
          </div>

          <div className="flex gap-4 pt-4">
            <Button variant="outline" onClick={() => setShowFilters(false)} className="flex-1">
              Cancel
            </Button>
            <Button onClick={() => setShowFilters(false)} className="flex-1">
              Apply Filters
            </Button>
          </div>
        </div>
      </Modal>

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
    </div>
  );
};