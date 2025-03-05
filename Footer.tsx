// src/components/Footer.tsx

import React from 'react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  return (
    <motion.footer
      className="bg-gray-800 text-white py-8 mt-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="container mx-auto text-center">
        <p className="text-lg">&copy; 2025 Media Downloader. All Rights Reserved.</p>
        <div className="flex justify-center space-x-6 mt-6">
          <motion.a
            href="https://facebook.com"
            className="hover:text-blue-500 text-2xl"
            whileHover={{ scale: 1.2, rotate: 10 }}
            whileTap={{ scale: 0.95 }}
          >
            Facebook
          </motion.a>
          <motion.a
            href="https://twitter.com"
            className="hover:text-blue-500 text-2xl"
            whileHover={{ scale: 1.2, rotate: 10 }}
            whileTap={{ scale: 0.95 }}
          >
            Twitter
          </motion.a>
          <motion.a
            href="https://instagram.com"
            className="hover:text-blue-500 text-2xl"
            whileHover={{ scale: 1.2, rotate: 10 }}
            whileTap={{ scale: 0.95 }}
          >
            Instagram
          </motion.a>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
