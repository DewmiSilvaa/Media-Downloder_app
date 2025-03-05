// src/components/Header.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Header: React.FC = () => {
  return (
    <motion.header
      className="bg-gray-900 text-white p-6 shadow-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-3xl font-bold hover:text-blue-500">
          Media Downloader
        </Link>
        <nav>
          <ul className="flex space-x-8">
            <motion.li
              className="hover:text-blue-500"
              whileHover={{ scale: 1.1, color: "#38bdf8" }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/home">Home</Link>
            </motion.li>
            <motion.li
              className="hover:text-blue-500"
              whileHover={{ scale: 1.1, color: "#38bdf8" }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/about">About</Link>
            </motion.li>
            <motion.li
              className="hover:text-blue-500"
              whileHover={{ scale: 1.1, color: "#38bdf8" }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/contact">Contact</Link>
            </motion.li>
          </ul>
        </nav>
      </div>
    </motion.header>
  );
};

export default Header;
