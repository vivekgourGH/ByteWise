import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { courses, categories } from '../../data/coursesData';
import localStorageService from '../../services/localStorageService';

const CourseBooking = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCourses, setFilteredCourses] = useState(courses);
  const [enrolling, setEnrolling] = useState(null);

  const levels = ['all', 'beginner', 'intermediate', 'advanced'];

  useEffect(() => {
    let filtered = courses;
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(course => course.category === selectedCategory);
    }
    
    if (selectedLevel !== 'all') {
      filtered = filtered.filter(course => course.level.toLowerCase().includes(selectedLevel));
    }
    
    if (searchTerm) {
      filtered = filtered.filter(course => 
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredCourses(filtered);
  }, [selectedCategory, selectedLevel, searchTerm]);

  const handleEnrollCourse = async (course) => {
    const username = sessionStorage.getItem('username');
    if (!username) {
      Swal.fire({
        title: 'Please Login',
        text: 'You need to login to enroll in courses.',
        icon: 'warning',
        confirmButtonColor: '#8b5cf6'
      });
      navigate('/login');
      return;
    }

    // Check if already enrolled
    const existingEnrollments = JSON.parse(localStorage.getItem('courseEnrollments') || '[]');
    const alreadyEnrolled = existingEnrollments.some(
      enrollment => enrollment.courseId === course.id && enrollment.enrolledBy === username
    );

    if (alreadyEnrolled) {
      Swal.fire({
        title: 'Already Enrolled',
        text: 'You are already enrolled in this course.',
        icon: 'info',
        confirmButtonColor: '#8b5cf6'
      });
      return;
    }

    // Redirect to payment page
    navigate('/course-payment', { state: { course } });
  };

  return (
    <section className="bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">Browse Courses</h1>
          <p className="text-slate-600">Discover and enroll in our expert-led courses</p>
        </div>

        {/* Filters */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 mb-8 border border-white/20">
          <div className="grid md:grid-cols-4 gap-4">
            <div>
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white/90"
              />
            </div>
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white/90"
              >
                <option value="all">All Categories</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.name}>{cat.name}</option>
                ))}
              </select>
            </div>
            <div>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white/90"
              >
                {levels.map(level => (
                  <option key={level} value={level}>
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div key={course.id} className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-white/20 hover:scale-105">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <span className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                    {course.category}
                  </span>
                  <div className="flex items-center">
                    <span className="text-yellow-400">★</span>
                    <span className="text-sm text-slate-600 ml-1">{course.rating}</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">{course.title}</h3>
                <p className="text-slate-600 mb-2">by {course.instructor}</p>
                <p className="text-sm text-slate-500 mb-4">{course.description}</p>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-2xl font-bold text-emerald-600">₹{course.price}</span>
                    <span className="text-sm text-slate-500 line-through ml-2">₹{course.originalPrice}</span>
                  </div>
                  <span className="text-sm text-slate-500">{course.students} students</span>
                </div>
                <div className="mb-4">
                  <p className="text-sm text-slate-600">Duration: {course.duration}</p>
                  <p className="text-sm text-slate-600">Next Batch: {course.nextBatch}</p>
                </div>
                <button
                  onClick={() => handleEnrollCourse(course)}
                  disabled={enrolling === course.id}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 disabled:opacity-50 shadow-lg hover:shadow-xl"
                >
                  {enrolling === course.id ? 'Enrolling...' : 'Enroll Now'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-600 text-lg">No courses found matching your criteria.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default CourseBooking;