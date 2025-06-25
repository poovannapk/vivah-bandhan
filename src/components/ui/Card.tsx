import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hover = false,
}) => {
  return (
    <motion.div
      className={`
        bg-white rounded-xl shadow-md border border-gray-100
        ${hover ? 'hover:shadow-lg hover:scale-105' : ''}
        transition-all duration-300
        ${className}
      `}
      whileHover={hover ? { y: -5 } : {}}
    >
      {children}
    </motion.div>
  );
};