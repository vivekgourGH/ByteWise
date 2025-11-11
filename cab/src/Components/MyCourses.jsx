import React, { useState, useEffect } from 'react';
import { FaBook, FaClock, FaCalendar, FaPlay, FaCheckCircle } from 'react-icons/fa';

const MyCourses = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const username = sessionStorage.getItem('username');
    if (username) {
      // Get enrolled courses from localStorage
      const enrollments = JSON.parse(localStorage.getItem('courseEnrollments') || '[]');
      const userEnrollments = enrollments.filter(enrollment => enrollment.enrolledBy === username);
      setEnrolledCourses(userEnrollments);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">My Courses</h1>
          <p className="text-slate-600">Track your learning progress and continue your journey</p>
        </div>

        {enrolledCourses.length === 0 ? (
          <div className="text-center py-12">
            <FaBook className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No courses enrolled yet</h3>
            <p className="text-gray-500 mb-6">Start your learning journey by enrolling in a course</p>
            <a 
              href="#booking-section" 
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Browse Courses
            </a>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrolledCourses.map((enrollment) => (
              <div key={enrollment.id} className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-white/20 hover:scale-105">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      {enrollment.status === 'enrolled' ? 'Active' : enrollment.status}
                    </span>
                    <FaCheckCircle className="text-green-500 h-5 w-5" />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">{enrollment.courseName}</h3>
                  <p className="text-gray-600 mb-4">by {enrollment.instructor}</p>
                  
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Progress</span>
                      <span>{enrollment.progress || 0}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${enrollment.progress || 0}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <FaCalendar className="h-4 w-4 mr-2" />
                    <span>Enrolled: {new Date(enrollment.enrollmentDate).toLocaleDateString()}</span>
                  </div>
                  
                  <button className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl">
                    <FaPlay className="h-4 w-4 mr-2" />
                    Continue Learning
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCourses;