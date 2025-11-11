import React from 'react';

const Download = () => {
  return (
    <section className="p-10 text-center text-black bg-gradient-to-br from-slate-100 to-purple-100">
      <h2 className="text-2xl text-purple-600 font-semibold">START LEARNING</h2>
      <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">GET THE BEST LEARNING EXPERIENCE</h3>
      <p className="text-slate-700 mb-6 max-w-2xl mx-auto">Join thousands of students already learning with Bytwise! Access courses anytime, anywhere and transform your career with industry-relevant skills.</p>
      <div className="flex flex-col md:flex-row justify-center gap-4 mt-4">
        <button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl">
          Browse Courses
        </button>
        <button className="bg-gradient-to-r from-pink-500 to-orange-400 hover:from-pink-600 hover:to-orange-500 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl">
          Start Free Trial
        </button>
      </div>
    </section>
  );
};

export default Download;