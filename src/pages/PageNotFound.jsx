import React from 'react';
import { useNavigate } from 'react-router-dom'; // Assuming you're using React Router
import { motion } from 'framer-motion';

function PageNotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center px-4">
      {/* Animated 404 Text */}
      <motion.h1
        className="text-8xl font-extrabold text-blue-500"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        404
      </motion.h1>

      {/* Page Not Found Message */}
      <motion.p
        className="mt-4 text-xl md:text-2xl text-gray-700"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Oops! The page you’re looking for doesn’t exist.
      </motion.p>


      {/* Buttons */}
      <motion.div
        className="mt-6 flex flex-col sm:flex-row gap-4"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <button
          onClick={() => navigate('/')}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
        >
          Go to Home
        </button>
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-3 border border-blue-500 text-blue-500 rounded-lg shadow-md hover:bg-blue-50 transition"
        >
          Go Back
        </button>
      </motion.div>
    </div>
  );
}

export default PageNotFound;
