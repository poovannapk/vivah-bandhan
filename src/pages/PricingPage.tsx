import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Check, 
  Crown, 
  Star, 
  Heart, 
  MessageCircle, 
  Shield, 
  Zap,
  Gift,
  CreditCard
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

export const PricingPage: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const plans = [
    {
      name: 'Free',
      type: 'free' as const,
      price: { monthly: 0, yearly: 0 },
      originalPrice: { monthly: 0, yearly: 0 },
      description: 'Perfect for getting started',
      features: [
        'Create basic profile',
        'Browse 10 profiles per day',
        'Send 5 interests per day',
        'Basic search filters',
        'Horoscope compatibility',
        'Email support'
      ],
      limitations: [
        'Limited profile views',
        'No direct messaging',
        'Basic customer support'
      ],
      popular: false,
      buttonText: 'Current Plan',
      buttonVariant: 'outline' as const
    },
    {
      name: 'Premium',
      type: 'premium' as const,
      price: { monthly: 1999, yearly: 19990 },
      originalPrice: { monthly: 2999, yearly: 35988 },
      description: 'Most popular choice for serious seekers',
      features: [
        'Everything in Free',
        'Unlimited profile browsing',
        'Send unlimited interests',
        'Direct messaging',
        'Advanced search filters',
        'View who liked your profile',
        'Priority customer support',
        'Verified badge',
        'Hide last seen status',
        'Ad-free experience'
      ],
      popular: true,
      buttonText: 'Upgrade to Premium',
      buttonVariant: 'primary' as const
    },
    {
      name: 'Elite',
      type: 'elite' as const,
      price: { monthly: 3999, yearly: 39990 },
      originalPrice: { monthly: 5999, yearly: 71988 },
      description: 'Complete matrimony solution',
      features: [
        'Everything in Premium',
        'Personal relationship manager',
        'Profile highlighted in search',
        'Get 3x more profile visits',
        'Video calling feature',
        'Compatibility score insights',
        'Family member access',
        'Exclusive elite member events',
        'Priority matching algorithm',
        'Phone support'
      ],
      popular: false,
      buttonText: 'Go Elite',
      buttonVariant: 'secondary' as const
    }
  ];

  const calculateSavings = (monthly: number, yearly: number) => {
    if (monthly === 0) return 0;
    const monthlyCost = monthly * 12;
    const savings = monthlyCost - yearly;
    const percentage = Math.round((savings / monthlyCost) * 100);
    return percentage;
  };

  const features = [
    {
      icon: <Shield className="h-6 w-6" />,
      title: 'Verified Profiles',
      description: 'All profiles verified with Aadhar and phone number'
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: 'AI Matching',
      description: 'Advanced algorithms for perfect compatibility'
    },
    {
      icon: <Star className="h-6 w-6" />,
      title: 'Horoscope Matching',
      description: 'Traditional kundli matching for perfect harmony'
    },
    {
      icon: <MessageCircle className="h-6 w-6" />,
      title: 'Secure Chat',
      description: 'End-to-end encrypted messaging and video calls'
    }
  ];

  const testimonials = [
    {
      name: 'Rajesh & Priya',
      text: 'Premium plan helped us connect quickly. The messaging feature was amazing!',
      avatar: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=100',
      plan: 'Premium'
    },
    {
      name: 'Vikram & Ananya',
      text: 'Elite plan with personal manager made our journey smooth and successful.',
      avatar: 'https://images.pexels.com/photos/1468379/pexels-photo-1468379.jpeg?auto=compress&cs=tinysrgb&w=100',
      plan: 'Elite'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-8 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
          >
            Choose Your Perfect Plan
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Find your soulmate with our carefully crafted plans designed for every need and budget
          </motion.p>
        </div>

        {/* Billing Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <div className="bg-gray-200 p-1 rounded-lg">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-md font-medium transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-6 py-2 rounded-md font-medium transition-all relative ${
                billingCycle === 'yearly'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Yearly
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                Save 44%
              </span>
            </button>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              className="relative"
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                </div>
              )}
              
              <Card className={`p-8 h-full ${plan.popular ? 'ring-2 ring-primary-500 shadow-xl' : ''}`}>
                <div className="text-center mb-8">
                  <div className="flex justify-center mb-4">
                    <div className={`p-3 rounded-full ${
                      plan.type === 'free' 
                        ? 'bg-gray-100' 
                        : plan.type === 'premium' 
                        ? 'bg-gradient-to-r from-primary-500 to-secondary-500' 
                        : 'bg-gradient-to-r from-accent-500 to-secondary-500'
                    }`}>
                      {plan.type === 'free' ? (
                        <Heart className="h-8 w-8 text-gray-600" />
                      ) : plan.type === 'premium' ? (
                        <Star className="h-8 w-8 text-white" />
                      ) : (
                        <Crown className="h-8 w-8 text-white" />
                      )}
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-6">{plan.description}</p>
                  
                  <div className="mb-6">
                    <div className="flex items-center justify-center mb-2">
                      <span className="text-4xl font-bold text-gray-900">
                        ₹{plan.price[billingCycle].toLocaleString()}
                      </span>
                      {plan.price[billingCycle] > 0 && (
                        <span className="text-gray-500 ml-2">
                          /{billingCycle === 'monthly' ? 'month' : 'year'}
                        </span>
                      )}
                    </div>
                    
                    {plan.originalPrice[billingCycle] > plan.price[billingCycle] && (
                      <div className="flex items-center justify-center space-x-2">
                        <span className="text-lg text-gray-400 line-through">
                          ₹{plan.originalPrice[billingCycle].toLocaleString()}
                        </span>
                        <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-sm font-medium">
                          {calculateSavings(plan.price.monthly, plan.price.yearly)}% OFF
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <Button
                    variant={plan.buttonVariant}
                    size="lg"
                    className="w-full mb-6"
                  >
                    {plan.type === 'elite' && <Crown className="h-5 w-5 mr-2" />}
                    {plan.type === 'premium' && <Star className="h-5 w-5 mr-2" />}
                    {plan.buttonText}
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900 flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    Features Included:
                  </h4>
                  
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <Check className="h-4 w-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {plan.limitations && (
                    <div className="pt-4 border-t border-gray-200">
                      <ul className="space-y-2">
                        {plan.limitations.map((limitation, limitIndex) => (
                          <li key={limitIndex} className="flex items-start">
                            <span className="text-gray-400 mr-3">•</span>
                            <span className="text-gray-500 text-sm">{limitation}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-16"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Vivah Bandhan?
            </h2>
            <p className="text-xl text-gray-600">
              Experience the best features in matrimony
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 text-center">
                <div className="bg-primary-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <div className="text-primary-600">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mb-16"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-gray-600">
              See what our members are saying
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <div className="flex items-center">
                      <span className="bg-primary-100 text-primary-600 px-2 py-1 rounded-full text-xs font-medium">
                        {testimonial.plan} Plan
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.text}"</p>
                <div className="flex text-yellow-400 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mb-16"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  question: 'Can I change my plan anytime?',
                  answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.'
                },
                {
                  question: 'Is there a refund policy?',
                  answer: 'We offer a 7-day money-back guarantee for all paid plans if you are not satisfied with our service.'
                },
                {
                  question: 'How secure is my data?',
                  answer: 'We use industry-standard encryption and security measures to protect your personal information and conversations.'
                },
                {
                  question: 'Do you verify all profiles?',
                  answer: 'Yes, all profiles go through our verification process including phone number and Aadhar verification for authenticity.'
                }
              ].map((faq, index) => (
                <Card key={index} className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                  <p className="text-gray-600 text-sm">{faq.answer}</p>
                </Card>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="text-center"
        >
          <Card className="p-12 bg-gradient-to-r from-primary-500 to-secondary-500 text-white">
            <Gift className="h-16 w-16 mx-auto mb-6 text-yellow-300" />
            <h2 className="text-3xl font-bold mb-4">
              Ready to Find Your Perfect Match?
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Join millions of Indians who found their soulmate through Vivah Bandhan. 
              Start your journey today with our premium features.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-primary-600 hover:bg-gray-100">
                <CreditCard className="h-5 w-5 mr-2" />
                Start Premium Trial
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                <Zap className="h-5 w-5 mr-2" />
                View Success Stories
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};