import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Camera, 
  Edit, 
  Save, 
  User, 
  MapPin, 
  Briefcase, 
  GraduationCap,
  Heart,
  Star,
  Phone,
  Mail,
  Calendar,
  Users,
  Home,
  Utensils,
  Cigarette,
  Wine,
  Plus,
  X
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Badge } from '../components/ui/Badge';
import { useAuth } from '../context/AuthContext';

export const ProfilePage: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('basic');
  const [profileData, setProfileData] = useState({
    // Basic Info
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    dateOfBirth: user?.dateOfBirth || '',
    gender: user?.gender || 'male',
    phone: user?.phone || '',
    email: user?.email || '',
    
    // Personal Details
    height: '5.6',
    weight: '65',
    bodyType: 'average',
    complexion: 'fair',
    physicalStatus: 'normal',
    maritalStatus: 'never-married',
    
    // Location
    city: 'Mumbai',
    state: 'Maharashtra',
    country: 'India',
    
    // Education & Career
    education: 'Masters in Computer Science',
    occupation: 'Software Engineer',
    company: 'Google',
    annualIncome: '15-20 LPA',
    workLocation: 'Mumbai',
    
    // Family
    familyType: 'nuclear',
    fatherOccupation: 'Business',
    motherOccupation: 'Homemaker',
    siblings: '1',
    familyValues: 'traditional',
    
    // Lifestyle
    religion: 'Hindu',
    caste: 'Brahmin',
    motherTongue: 'Hindi',
    smokingHabit: 'never',
    drinkingHabit: 'never',
    dietPreference: 'vegetarian',
    
    // About
    aboutMe: 'I am a software engineer working at Google. I love traveling, reading books, and cooking. Looking for a life partner who shares similar values and interests.',
    hobbies: ['Reading', 'Traveling', 'Cooking', 'Photography'],
    interests: ['Technology', 'Music', 'Sports', 'Movies'],
    
    // Horoscope
    birthTime: '10:30 AM',
    birthPlace: 'Mumbai',
    manglik: 'no',
    star: 'Rohini',
    rashi: 'Taurus',
    gotra: 'Bharadwaj'
  });

  const [newHobby, setNewHobby] = useState('');
  const [newInterest, setNewInterest] = useState('');

  const tabs = [
    { id: 'basic', label: 'Basic Info', icon: <User className="h-5 w-5" /> },
    { id: 'personal', label: 'Personal', icon: <Heart className="h-5 w-5" /> },
    { id: 'education', label: 'Education & Career', icon: <GraduationCap className="h-5 w-5" /> },
    { id: 'family', label: 'Family', icon: <Users className="h-5 w-5" /> },
    { id: 'lifestyle', label: 'Lifestyle', icon: <Home className="h-5 w-5" /> },
    { id: 'horoscope', label: 'Horoscope', icon: <Star className="h-5 w-5" /> }
  ];

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayAdd = (field: 'hobbies' | 'interests', value: string) => {
    if (value.trim()) {
      setProfileData(prev => ({
        ...prev,
        [field]: [...prev[field], value.trim()]
      }));
      if (field === 'hobbies') setNewHobby('');
      if (field === 'interests') setNewInterest('');
    }
  };

  const handleArrayRemove = (field: 'hobbies' | 'interests', index: number) => {
    setProfileData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleSave = () => {
    updateUser(profileData);
    setIsEditing(false);
  };

  const profileCompletion = 85;

  return (
    <div className="min-h-screen bg-gray-50 pt-8 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">My Profile</h1>
              <p className="text-gray-600">Manage your profile information</p>
            </div>
            <Button
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
              className="flex items-center"
            >
              {isEditing ? (
                <>
                  <Save className="h-5 w-5 mr-2" />
                  Save Changes
                </>
              ) : (
                <>
                  <Edit className="h-5 w-5 mr-2" />
                  Edit Profile
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Profile Completion */}
        <Card className="p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Profile Completion</h3>
            <span className="text-lg font-bold text-primary-600">{profileCompletion}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-primary-500 to-secondary-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${profileCompletion}%` }}
            />
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Complete your profile to get better matches and increase visibility
          </p>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Profile Summary */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-8">
              <div className="text-center">
                <div className="relative inline-block">
                  <div className="w-24 h-24 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    {profileData.firstName.charAt(0)}{profileData.lastName.charAt(0)}
                  </div>
                  {isEditing && (
                    <button className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg border border-gray-200">
                      <Camera className="h-4 w-4 text-gray-600" />
                    </button>
                  )}
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mt-4">
                  {profileData.firstName} {profileData.lastName}
                </h3>
                <p className="text-gray-600">{profileData.occupation}</p>
                <p className="text-sm text-gray-500">{profileData.city}, {profileData.state}</p>
                
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    Age: {new Date().getFullYear() - new Date(profileData.dateOfBirth).getFullYear()}
                  </div>
                  <div className="flex items-center justify-center text-sm text-gray-600">
                    <User className="h-4 w-4 mr-2" />
                    {profileData.height} ft, {profileData.bodyType}
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Profile Details */}
          <div className="lg:col-span-3">
            {/* Navigation Tabs */}
            <div className="mb-6">
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8 overflow-x-auto">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                        activeTab === tab.id
                          ? 'border-primary-500 text-primary-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      {tab.icon}
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Tab Content */}
            <Card className="p-6">
              {/* Basic Info Tab */}
              {activeTab === 'basic' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      label="First Name"
                      value={profileData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      disabled={!isEditing}
                    />
                    <Input
                      label="Last Name"
                      value={profileData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      disabled={!isEditing}
                    />
                    <Input
                      label="Date of Birth"
                      type="date"
                      value={profileData.dateOfBirth}
                      onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                      disabled={!isEditing}
                    />
                    <Select
                      label="Gender"
                      value={profileData.gender}
                      options={[
                        { value: 'male', label: 'Male' },
                        { value: 'female', label: 'Female' },
                        { value: 'other', label: 'Other' }
                      ]}
                      disabled={!isEditing}
                    />
                    <Input
                      label="Phone"
                      value={profileData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      disabled={!isEditing}
                      icon={<Phone className="h-5 w-5" />}
                    />
                    <Input
                      label="Email"
                      value={profileData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      disabled={!isEditing}
                      icon={<Mail className="h-5 w-5" />}
                    />
                    <Input
                      label="City"
                      value={profileData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      disabled={!isEditing}
                      icon={<MapPin className="h-5 w-5" />}
                    />
                    <Input
                      label="State"
                      value={profileData.state}
                      onChange={(e) => handleInputChange('state', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              )}

              {/* Personal Tab */}
              {activeTab === 'personal' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900">Personal Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      label="Height (ft)"
                      value={profileData.height}
                      onChange={(e) => handleInputChange('height', e.target.value)}
                      disabled={!isEditing}
                    />
                    <Input
                      label="Weight (kg)"
                      value={profileData.weight}
                      onChange={(e) => handleInputChange('weight', e.target.value)}
                      disabled={!isEditing}
                    />
                    <Select
                      label="Body Type"
                      value={profileData.bodyType}
                      options={[
                        { value: 'slim', label: 'Slim' },
                        { value: 'average', label: 'Average' },
                        { value: 'athletic', label: 'Athletic' },
                        { value: 'heavy', label: 'Heavy' }
                      ]}
                      disabled={!isEditing}
                    />
                    <Select
                      label="Complexion"
                      value={profileData.complexion}
                      options={[
                        { value: 'very-fair', label: 'Very Fair' },
                        { value: 'fair', label: 'Fair' },
                        { value: 'wheatish', label: 'Wheatish' },
                        { value: 'dark', label: 'Dark' }
                      ]}
                      disabled={!isEditing}
                    />
                    <Select
                      label="Marital Status"
                      value={profileData.maritalStatus}
                      options={[
                        { value: 'never-married', label: 'Never Married' },
                        { value: 'divorced', label: 'Divorced' },
                        { value: 'widowed', label: 'Widowed' }
                      ]}
                      disabled={!isEditing}
                    />
                    <Select
                      label="Physical Status"
                      value={profileData.physicalStatus}
                      options={[
                        { value: 'normal', label: 'Normal' },
                        { value: 'physically-challenged', label: 'Physically Challenged' }
                      ]}
                      disabled={!isEditing}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      About Me
                    </label>
                    <textarea
                      value={profileData.aboutMe}
                      onChange={(e) => handleInputChange('aboutMe', e.target.value)}
                      disabled={!isEditing}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-100"
                      placeholder="Tell us about yourself..."
                    />
                  </div>

                  {/* Hobbies */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Hobbies
                    </label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {profileData.hobbies.map((hobby, index) => (
                        <Badge key={index} variant="secondary" className="flex items-center">
                          {hobby}
                          {isEditing && (
                            <button
                              onClick={() => handleArrayRemove('hobbies', index)}
                              className="ml-2 text-gray-500 hover:text-red-500"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          )}
                        </Badge>
                      ))}
                    </div>
                    {isEditing && (
                      <div className="flex gap-2">
                        <Input
                          value={newHobby}
                          onChange={(e) => setNewHobby(e.target.value)}
                          placeholder="Add a hobby"
                          className="flex-1"
                        />
                        <Button
                          onClick={() => handleArrayAdd('hobbies', newHobby)}
                          size="sm"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>

                  {/* Interests */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Interests
                    </label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {profileData.interests.map((interest, index) => (
                        <Badge key={index} variant="primary" className="flex items-center">
                          {interest}
                          {isEditing && (
                            <button
                              onClick={() => handleArrayRemove('interests', index)}
                              className="ml-2 text-primary-200 hover:text-red-300"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          )}
                        </Badge>
                      ))}
                    </div>
                    {isEditing && (
                      <div className="flex gap-2">
                        <Input
                          value={newInterest}
                          onChange={(e) => setNewInterest(e.target.value)}
                          placeholder="Add an interest"
                          className="flex-1"
                        />
                        <Button
                          onClick={() => handleArrayAdd('interests', newInterest)}
                          size="sm"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Education & Career Tab */}
              {activeTab === 'education' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900">Education & Career</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      label="Education"
                      value={profileData.education}
                      onChange={(e) => handleInputChange('education', e.target.value)}
                      disabled={!isEditing}
                      icon={<GraduationCap className="h-5 w-5" />}
                    />
                    <Input
                      label="Occupation"
                      value={profileData.occupation}
                      onChange={(e) => handleInputChange('occupation', e.target.value)}
                      disabled={!isEditing}
                      icon={<Briefcase className="h-5 w-5" />}
                    />
                    <Input
                      label="Company"
                      value={profileData.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                      disabled={!isEditing}
                    />
                    <Select
                      label="Annual Income"
                      value={profileData.annualIncome}
                      options={[
                        { value: '0-5 LPA', label: '0-5 LPA' },
                        { value: '5-10 LPA', label: '5-10 LPA' },
                        { value: '10-15 LPA', label: '10-15 LPA' },
                        { value: '15-20 LPA', label: '15-20 LPA' },
                        { value: '20+ LPA', label: '20+ LPA' }
                      ]}
                      disabled={!isEditing}
                    />
                    <Input
                      label="Work Location"
                      value={profileData.workLocation}
                      onChange={(e) => handleInputChange('workLocation', e.target.value)}
                      disabled={!isEditing}
                      icon={<MapPin className="h-5 w-5" />}
                    />
                  </div>
                </div>
              )}

              {/* Family Tab */}
              {activeTab === 'family' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900">Family Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Select
                      label="Family Type"
                      value={profileData.familyType}
                      options={[
                        { value: 'nuclear', label: 'Nuclear Family' },
                        { value: 'joint', label: 'Joint Family' }
                      ]}
                      disabled={!isEditing}
                    />
                    <Input
                      label="Father's Occupation"
                      value={profileData.fatherOccupation}
                      onChange={(e) => handleInputChange('fatherOccupation', e.target.value)}
                      disabled={!isEditing}
                    />
                    <Input
                      label="Mother's Occupation"
                      value={profileData.motherOccupation}
                      onChange={(e) => handleInputChange('motherOccupation', e.target.value)}
                      disabled={!isEditing}
                    />
                    <Input
                      label="Number of Siblings"
                      value={profileData.siblings}
                      onChange={(e) => handleInputChange('siblings', e.target.value)}
                      disabled={!isEditing}
                    />
                    <Select
                      label="Family Values"
                      value={profileData.familyValues}
                      options={[
                        { value: 'traditional', label: 'Traditional' },
                        { value: 'moderate', label: 'Moderate' },
                        { value: 'liberal', label: 'Liberal' }
                      ]}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              )}

              {/* Lifestyle Tab */}
              {activeTab === 'lifestyle' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900">Lifestyle & Preferences</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      label="Religion"
                      value={profileData.religion}
                      onChange={(e) => handleInputChange('religion', e.target.value)}
                      disabled={!isEditing}
                    />
                    <Input
                      label="Caste"
                      value={profileData.caste}
                      onChange={(e) => handleInputChange('caste', e.target.value)}
                      disabled={!isEditing}
                    />
                    <Input
                      label="Mother Tongue"
                      value={profileData.motherTongue}
                      onChange={(e) => handleInputChange('motherTongue', e.target.value)}
                      disabled={!isEditing}
                    />
                    <Select
                      label="Diet Preference"
                      value={profileData.dietPreference}
                      options={[
                        { value: 'vegetarian', label: 'Vegetarian' },
                        { value: 'non-vegetarian', label: 'Non-Vegetarian' },
                        { value: 'vegan', label: 'Vegan' },
                        { value: 'jain', label: 'Jain' }
                      ]}
                      disabled={!isEditing}
                    />
                    <Select
                      label="Smoking Habit"
                      value={profileData.smokingHabit}
                      options={[
                        { value: 'never', label: 'Never' },
                        { value: 'occasionally', label: 'Occasionally' },
                        { value: 'regularly', label: 'Regularly' }
                      ]}
                      disabled={!isEditing}
                    />
                    <Select
                      label="Drinking Habit"
                      value={profileData.drinkingHabit}
                      options={[
                        { value: 'never', label: 'Never' },
                        { value: 'occasionally', label: 'Occasionally' },
                        { value: 'regularly', label: 'Regularly' }
                      ]}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              )}

              {/* Horoscope Tab */}
              {activeTab === 'horoscope' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900">Horoscope Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      label="Birth Time"
                      value={profileData.birthTime}
                      onChange={(e) => handleInputChange('birthTime', e.target.value)}
                      disabled={!isEditing}
                    />
                    <Input
                      label="Birth Place"
                      value={profileData.birthPlace}
                      onChange={(e) => handleInputChange('birthPlace', e.target.value)}
                      disabled={!isEditing}
                    />
                    <Select
                      label="Manglik Status"
                      value={profileData.manglik}
                      options={[
                        { value: 'yes', label: 'Yes' },
                        { value: 'no', label: 'No' },
                        { value: 'anshik', label: 'Anshik' }
                      ]}
                      disabled={!isEditing}
                    />
                    <Input
                      label="Star/Nakshatra"
                      value={profileData.star}
                      onChange={(e) => handleInputChange('star', e.target.value)}
                      disabled={!isEditing}
                    />
                    <Input
                      label="Rashi"
                      value={profileData.rashi}
                      onChange={(e) => handleInputChange('rashi', e.target.value)}
                      disabled={!isEditing}
                    />
                    <Input
                      label="Gotra"
                      value={profileData.gotra}
                      onChange={(e) => handleInputChange('gotra', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};