import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Heart, 
  Users, 
  Shield, 
  Star, 
  CheckCircle, 
  Play,
  ArrowRight,
  Sparkles,
  Globe,
  MessageCircle
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { FaqPage } from './FaqPage';

export const HomePage: React.FC<{ onOpenRegisterModal?: () => void }> = ({ onOpenRegisterModal }) => {
  const stats = [
    { number: '10M+', label: 'Happy Couples' },
    { number: '25M+', label: 'Registered Users' },
    { number: '50K+', label: 'Success Stories' },
    { number: '99%', label: 'Success Rate' },
  ];

  const features = [
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: 'AI-Powered Matching',
      description: 'Advanced algorithms analyze compatibility based on personality, interests, and life goals.'
    },
    {
      icon: <Star className="h-6 w-6" />,
      title: 'Horoscope Compatibility',
      description: 'Traditional kundli matching combined with modern astrology for perfect harmony.'
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: 'Verified Profiles',
      description: 'Aadhar and OTP verification ensures authentic and genuine user profiles.'
    },
    {
      icon: <MessageCircle className="h-6 w-6" />,
      title: 'Secure Communication',
      description: 'Private messaging and video calls with end-to-end encryption for safety.'
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: 'Global Reach',
      description: 'Connect with potential partners across India and around the world.'
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: 'Personal Counselor',
      description: 'Dedicated relationship experts to guide you through your journey.'
    },
  ];

  const testimonials = [
    {
      name: 'Priya & Rahul',
      image: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=400',
      text: 'We found each other through Vivah Bandhan and got married within 6 months. The compatibility score was 98% and it was absolutely right!',
      location: 'Mumbai, Maharashtra'
    },
    {
      name: 'Ananya & Vikram',
      image: 'https://images.pexels.com/photos/1468379/pexels-photo-1468379.jpeg?auto=compress&cs=tinysrgb&w=400',
      text: 'The horoscope matching feature gave us confidence in our decision. Now we are happily married with a beautiful daughter.',
      location: 'Bangalore, Karnataka'
    },
    {
      name: 'Neha & Arjun',
      image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=400',
      text: 'The AI suggestions were so accurate. We connected instantly and knew we were meant for each other. Thank you Vivah Bandhan!',
      location: 'Delhi, NCR'
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50 pt-16 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-white/60"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
            >
              Find Your Perfect
              <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent"> Life Partner</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              India's most trusted matrimony platform powered by AI. We combine traditional values with modern technology to help you find your soulmate through advanced compatibility matching and horoscope analysis.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            >
              {onOpenRegisterModal ? (
                <Button size="lg" className="px-8 py-4" onClick={onOpenRegisterModal}>
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              ) : (
                <Link to="/register">
                  <Button size="lg" className="px-8 py-4">
                    Get Started Free
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              )}
              <Button variant="outline" size="lg" className="px-8 py-4">
                <Play className="mr-2 h-5 w-5" />
                Watch Success Stories
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto"
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl lg:text-4xl font-bold text-primary-600 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
        
        {/* Floating Hearts Animation */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-primary-200"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [-20, -60, -20],
                rotate: [0, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            >
              <Heart className="h-6 w-6" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Vivah Bandhan?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We combine cutting-edge AI technology with traditional matchmaking wisdom to create the perfect platform for finding your life partner.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 h-full hover:shadow-lg transition-shadow">
                  <div className="bg-gradient-to-r from-primary-500 to-secondary-500 w-12 h-12 rounded-lg flex items-center justify-center text-white mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Simple steps to find your perfect match
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: 'Create Your Profile',
                description: 'Fill in your details, preferences, and upload photos. Complete verification for better matches.',
                icon: <Users className="h-8 w-8" />
              },
              {
                step: '2',
                title: 'AI Finds Matches',
                description: 'Our advanced algorithm analyzes compatibility and presents you with the best potential partners.',
                icon: <Sparkles className="h-8 w-8" />
              },
              {
                step: '3',
                title: 'Connect & Meet',
                description: 'Chat securely, video call, and meet your matches. Let love blossom naturally.',
                icon: <Heart className="h-8 w-8" />
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="bg-gradient-to-r from-primary-500 to-secondary-500 w-16 h-16 rounded-full flex items-center justify-center text-white mx-auto mb-6">
                  {item.icon}
                </div>
                <div className="bg-primary-100 text-primary-600 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-gray-600">
              Real couples, real love stories
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 h-full">
                  <div className="flex items-center mb-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                      <p className="text-sm text-gray-500">{testimonial.location}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    "{testimonial.text}"
                  </p>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/success-stories">
              <Button variant="outline" size="lg">
                View More Stories
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl lg:text-4xl font-bold text-white mb-6"
          >
            Ready to Find Your Soulmate?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-primary-100 mb-8"
          >
            Join millions of Indians who found love through Vivah Bandhan. Your perfect match is just a click away.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            {onOpenRegisterModal ? (
              <Button 
                size="lg" 
                className="bg-white text-primary-600 hover:bg-gray-100 px-8 py-4"
                onClick={onOpenRegisterModal}
              >
                Start Your Journey Today
                <Heart className="ml-2 h-5 w-5" />
              </Button>
            ) : (
              <Link to="/register">
                <Button 
                  size="lg" 
                  className="bg-white text-primary-600 hover:bg-gray-100 px-8 py-4"
                >
                  Start Your Journey Today
                  <Heart className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            )}
          </motion.div>
        </div>
      </section>

      <FaqPage />
    </div>
  );
};