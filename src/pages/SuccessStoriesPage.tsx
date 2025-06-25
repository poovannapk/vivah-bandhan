import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, 
  Calendar, 
  MapPin, 
  Star, 
  Quote,
  Filter,
  Search,
  Plus
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';

export const SuccessStoriesPage: React.FC = () => {
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [selectedStory, setSelectedStory] = useState<any>(null);
  const [filters, setFilters] = useState({
    location: 'all',
    year: 'all',
    category: 'all'
  });

  const successStories = [
    {
      id: '1',
      groomName: 'Rahul Sharma',
      brideName: 'Priya Patel',
      groomPhoto: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
      bridePhoto: 'https://images.pexels.com/photos/1382734/pexels-photo-1382734.jpeg?auto=compress&cs=tinysrgb&w=400',
      weddingPhoto: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=600',
      story: 'We met through Vivah Bandhan in January 2024. The compatibility score was 96% and we instantly connected over our shared love for travel and technology. After 6 months of getting to know each other, we decided to take the next step. Our families met and everything fell into place perfectly.',
      weddingDate: '2024-07-15',
      location: 'Mumbai, Maharashtra',
      compatibility: 96,
      matchedDate: '2024-01-10',
      category: 'Love Marriage',
      testimonial: 'Vivah Bandhan made our journey so smooth. The AI matching was incredibly accurate!'
    },
    {
      id: '2',
      groomName: 'Vikram Reddy',
      brideName: 'Ananya Singh',
      groomPhoto: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=400',
      bridePhoto: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=400',
      weddingPhoto: 'https://images.pexels.com/photos/1468379/pexels-photo-1468379.jpeg?auto=compress&cs=tinysrgb&w=600',
      story: 'Our families were looking for suitable matches for us. Vivah Bandhan not only matched our profiles but also ensured our horoscopes were perfectly compatible. The traditional approach combined with modern technology gave both families confidence in the match.',
      weddingDate: '2024-03-22',
      location: 'Hyderabad, Telangana',
      compatibility: 94,
      matchedDate: '2023-11-15',
      category: 'Arranged Marriage',
      testimonial: 'The horoscope matching feature was a game-changer for our traditional families.'
    },
    {
      id: '3',
      groomName: 'Arjun Gupta',
      brideName: 'Kavya Joshi',
      groomPhoto: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=400',
      bridePhoto: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
      weddingPhoto: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=600',
      story: 'We were both busy professionals who had little time for traditional matchmaking. Vivah Bandhan understood our preferences and lifestyle, connecting us despite our busy schedules. The platform made it easy to communicate and get to know each other.',
      weddingDate: '2024-05-18',
      location: 'Pune, Maharashtra',
      compatibility: 91,
      matchedDate: '2024-01-20',
      category: 'Professional Match',
      testimonial: 'Perfect for busy professionals like us. The platform understood our needs perfectly.'
    },
    {
      id: '4',
      groomName: 'Karthik Nair',
      brideName: 'Deepika Menon',
      groomPhoto: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=400',
      bridePhoto: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=400',
      weddingPhoto: 'https://images.pexels.com/photos/1468379/pexels-photo-1468379.jpeg?auto=compress&cs=tinysrgb&w=600',
      story: 'Being from different states, we never thought we would find each other. Vivah Bandhan connected us across geographical boundaries. Our cultural values aligned perfectly, and our families embraced the union wholeheartedly.',
      weddingDate: '2024-09-10',
      location: 'Kochi, Kerala',
      compatibility: 89,
      matchedDate: '2024-03-05',
      category: 'Inter-State Match',
      testimonial: 'Distance was no barrier when the match was perfect. Thank you Vivah Bandhan!'
    }
  ];

  const handleSubmitStory = () => {
    setShowSubmitModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-8 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
          >
            Success Stories
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto mb-8"
          >
            Real couples, real love stories. Discover how Vivah Bandhan helped thousands find their perfect life partner.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button onClick={handleSubmitStory} size="lg">
              <Plus className="h-5 w-5 mr-2" />
              Share Your Story
            </Button>
            <div className="flex items-center text-gray-600">
              <Heart className="h-5 w-5 text-red-500 mr-2" />
              <span className="font-medium">50,000+ Happy Couples</span>
            </div>
          </motion.div>
        </div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8"
        >
          <Card className="p-6">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Search success stories..."
                  icon={<Search className="h-5 w-5" />}
                />
              </div>
              <div className="flex gap-4">
                <Select
                  options={[
                    { value: 'all', label: 'All Locations' },
                    { value: 'mumbai', label: 'Mumbai' },
                    { value: 'delhi', label: 'Delhi' },
                    { value: 'bangalore', label: 'Bangalore' },
                    { value: 'hyderabad', label: 'Hyderabad' }
                  ]}
                  value={filters.location}
                />
                <Select
                  options={[
                    { value: 'all', label: 'All Years' },
                    { value: '2024', label: '2024' },
                    { value: '2023', label: '2023' },
                    { value: '2022', label: '2022' }
                  ]}
                  value={filters.year}
                />
                <Select
                  options={[
                    { value: 'all', label: 'All Categories' },
                    { value: 'love', label: 'Love Marriage' },
                    { value: 'arranged', label: 'Arranged Marriage' },
                    { value: 'professional', label: 'Professional Match' }
                  ]}
                  value={filters.category}
                />
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Success Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {successStories.map((story, index) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
            >
              <Card className="overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
                <div className="relative">
                  <img
                    src={story.weddingPhoto}
                    alt={`${story.groomName} & ${story.brideName}`}
                    className="w-full h-64 object-cover"
                    onClick={() => setSelectedStory(story)}
                  />
                  <div className="absolute top-4 left-4">
                    <Badge variant="success" className="bg-white/90 text-green-700">
                      <Heart className="h-3 w-3 mr-1" />
                      {story.compatibility}% Match
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge variant="primary" className="bg-white/90 text-primary-700">
                      {story.category}
                    </Badge>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-center mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="text-center">
                        <img
                          src={story.groomPhoto}
                          alt={story.groomName}
                          className="w-16 h-16 rounded-full object-cover mx-auto mb-2"
                        />
                        <h4 className="font-medium text-gray-900">{story.groomName}</h4>
                      </div>
                      <div className="text-primary-500">
                        <Heart className="h-8 w-8" />
                      </div>
                      <div className="text-center">
                        <img
                          src={story.bridePhoto}
                          alt={story.brideName}
                          className="w-16 h-16 rounded-full object-cover mx-auto mb-2"
                        />
                        <h4 className="font-medium text-gray-900">{story.brideName}</h4>
                      </div>
                    </div>
                  </div>

                  <div className="text-center mb-4">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {story.groomName} & {story.brideName}
                    </h3>
                    <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(story.weddingDate).toLocaleDateString()}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {story.location}
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <div className="flex items-start">
                      <Quote className="h-5 w-5 text-primary-500 mr-2 mt-1 flex-shrink-0" />
                      <p className="text-gray-700 italic text-sm leading-relaxed">
                        {story.testimonial}
                      </p>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                    {story.story}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedStory(story)}
                    >
                      Read Full Story
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Load More Stories
          </Button>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16"
        >
          <Card className="p-8 bg-gradient-to-r from-primary-500 to-secondary-500 text-white">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Join the Success Stories</h2>
              <p className="text-xl text-primary-100">
                Thousands of couples have found love through Vivah Bandhan
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { number: '50,000+', label: 'Happy Couples' },
                { number: '95%', label: 'Success Rate' },
                { number: '2.5M+', label: 'Registered Users' },
                { number: '500+', label: 'Daily Matches' }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
                  <div className="text-primary-100">{stat.label}</div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Story Detail Modal */}
      {selectedStory && (
        <Modal
          isOpen={!!selectedStory}
          onClose={() => setSelectedStory(null)}
          size="xl"
        >
          <div className="space-y-6">
            <div className="text-center">
              <img
                src={selectedStory.weddingPhoto}
                alt={`${selectedStory.groomName} & ${selectedStory.brideName}`}
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {selectedStory.groomName} & {selectedStory.brideName}
              </h2>
              <div className="flex items-center justify-center space-x-4 text-gray-600 mb-4">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  Married on {new Date(selectedStory.weddingDate).toLocaleDateString()}
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  {selectedStory.location}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="text-center">
                <img
                  src={selectedStory.groomPhoto}
                  alt={selectedStory.groomName}
                  className="w-24 h-24 rounded-full object-cover mx-auto mb-2"
                />
                <h3 className="font-semibold text-gray-900">{selectedStory.groomName}</h3>
                <p className="text-gray-600">Groom</p>
              </div>
              <div className="text-center">
                <img
                  src={selectedStory.bridePhoto}
                  alt={selectedStory.brideName}
                  className="w-24 h-24 rounded-full object-cover mx-auto mb-2"
                />
                <h3 className="font-semibold text-gray-900">{selectedStory.brideName}</h3>
                <p className="text-gray-600">Bride</p>
              </div>
            </div>

            <div className="bg-primary-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <Heart className="h-6 w-6 text-primary-500 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900">Their Love Story</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">{selectedStory.story}</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-start">
                <Quote className="h-6 w-6 text-primary-500 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-700 italic leading-relaxed mb-2">
                    "{selectedStory.testimonial}"
                  </p>
                  <p className="text-sm text-gray-600">
                    - {selectedStory.groomName} & {selectedStory.brideName}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary-600">{selectedStory.compatibility}%</div>
                <div className="text-sm text-gray-600">Compatibility</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-secondary-600">
                  {Math.floor((new Date(selectedStory.weddingDate).getTime() - new Date(selectedStory.matchedDate).getTime()) / (1000 * 60 * 60 * 24 * 30))}
                </div>
                <div className="text-sm text-gray-600">Months to Wedding</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-accent-600">{selectedStory.category}</div>
                <div className="text-sm text-gray-600">Match Type</div>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Submit Story Modal */}
      <Modal
        isOpen={showSubmitModal}
        onClose={() => setShowSubmitModal(false)}
        title="Share Your Success Story"
        size="lg"
      >
        <div className="space-y-6">
          <p className="text-gray-600">
            Help inspire others by sharing your beautiful love story with the Vivah Bandhan community.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input label="Groom's Name" placeholder="Enter groom's name" />
            <Input label="Bride's Name" placeholder="Enter bride's name" />
            <Input label="Wedding Date" type="date" />
            <Input label="Wedding Location" placeholder="City, State" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Love Story
            </label>
            <textarea
              rows={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Tell us how you met, your journey together, and what made Vivah Bandhan special for you..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Photos
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <p className="text-gray-600">Click to upload wedding photos</p>
              <p className="text-sm text-gray-500 mt-1">PNG, JPG up to 10MB</p>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <Button variant="outline" onClick={() => setShowSubmitModal(false)} className="flex-1">
              Cancel
            </Button>
            <Button onClick={() => setShowSubmitModal(false)} className="flex-1">
              Submit Story
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};