import React, { useState } from 'react';

const faqData = [
  {
    question: 'Is Vivah Bandhan free to use?',
    answer: 'You can create a profile and search for matches for free. Premium features are available for enhanced experience.'
  },
  {
    question: 'How does AI matchmaking work?',
    answer: 'Our AI analyzes your profile, preferences, and behavior to recommend the most compatible matches using advanced algorithms and traditional methods like horoscope matching.'
  },
  {
    question: 'Is my data safe and private?',
    answer: 'Yes, we use strong encryption and never share your personal information without your consent. You control your privacy settings.'
  },
  {
    question: 'Can I contact matches directly?',
    answer: 'You can send messages and connect with matches through our secure messaging system once both parties express interest.'
  },
  {
    question: 'How do I get support?',
    answer: 'Our support team is available 24/7 via chat and email to help you with any questions or issues.'
  }
];

export const FaqPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-16 bg-white border-t border-gray-100">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqData.map((faq, idx) => (
            <div key={idx} className="border rounded-lg overflow-hidden">
              <button
                className={`w-full flex justify-between items-center px-6 py-4 text-left focus:outline-none transition-colors ${openIndex === idx ? 'bg-primary-50 text-primary-700' : 'bg-white text-gray-900 hover:bg-gray-50'}`}
                onClick={() => toggle(idx)}
                aria-expanded={openIndex === idx}
              >
                <span className="font-semibold">{faq.question}</span>
                <span className={`ml-4 transform transition-transform ${openIndex === idx ? 'rotate-180' : ''}`}>▼</span>
              </button>
              {openIndex === idx && (
                <div className="px-6 pb-4 text-gray-700 animate-fade-in">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqPage;
