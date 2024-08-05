/* eslint-disable no-unused-vars */
import React from 'react';

const LoadingBanner = () => {
  return (
    <div className="fixed top-0 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white text-center py-2 px-4 rounded-md z-50 shadow-lg">
      Loading, please wait...
    </div>
  );
};

export default LoadingBanner;