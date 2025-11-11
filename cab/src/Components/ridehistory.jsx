import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaCalendarAlt, FaMapMarkerAlt, FaArrowRight, FaCar, FaArrowLeft } from "react-icons/fa";
import localStorageService from '../services/localStorageService';

const RideHistory = () => {
  const navigate = useNavigate();
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user's ride history from local storage
  useEffect(() => {
    const fetchUserRideHistory = () => {
      try {
        const currentUserName = sessionStorage.getItem('name') || 
                              sessionStorage.getItem('username') || 
                              sessionStorage.getItem('driverName') ||
                              sessionStorage.getItem('email') ||
                              sessionStorage.getItem('userEmail');

        if (!currentUserName) {
          setRides([]);
          setLoading(false);
          return;
        }

        const userBookings = localStorageService.getUserBookings(currentUserName);
        
        // Only show completed courses for users (no denied/cancelled enrollments)
        const completedBookings = userBookings.filter(booking => 
          booking.status === 'COMPLETED' || booking.status === 'ACCEPTED'
        );

        setRides(completedBookings.map(booking => ({
          id: booking.id,
          date: booking.tripDate,
          category: booking.pickupLocation,
          level: booking.dropLocation,
          instructor: booking.driverName || 'Not assigned',
          courseType: booking.vehicleType,
          fee: parseFloat(booking.fare) || 0,
          status: booking.status,
          duration: booking.distance || 'N/A',
          studentPhone: booking.passengerPhone
        })));
      } catch (error) {
        console.error('Error fetching ride history:', error);
        setRides([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUserRideHistory();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading your learning history...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-800 mb-2">My Learning History</h2>
          <p className="text-gray-600">Your completed courses and learning details</p>
          
          {/* Back to Home Button */}
          <div className="mt-6">
            <button
              onClick={() => navigate('/')}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors inline-flex items-center"
            >
              <FaArrowLeft className="mr-2" />
              Back to Home
            </button>
          </div>
        </div>

        {rides.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <FaCar className="mx-auto h-16 w-16 text-gray-300 mb-6" />
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">No Completed Courses Yet</h3>
            <p className="text-gray-600 mb-8">Enroll in your first course to see your learning history here!</p>
            <button
              onClick={() => navigate('/')}
              className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
            >
              Enroll in Course
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {rides.map((ride) => (
              <div key={ride.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <FaCalendarAlt className="mr-2" />
                      {ride.date ? new Date(ride.date + 'T00:00:00').toLocaleDateString('en-GB', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      }) : 'N/A'}
                    </div>
                    
                    <div className="flex items-center text-gray-800 mb-2">
                      <div className="flex items-center">
                        <FaMapMarkerAlt className="text-green-500 mr-2 flex-shrink-0" />
                        <span className="font-medium">{ride.category}</span>
                      </div>
                      <FaArrowRight className="mx-4 text-gray-400" />
                      <div className="flex items-center">
                        <FaMapMarkerAlt className="text-red-500 mr-2 flex-shrink-0" />
                        <span className="font-medium">{ride.level}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                      <span>Instructor: <strong>{ride.instructor}</strong></span>
                      <span>Course Type: <strong>{ride.courseType}</strong></span>
                      <span>Duration: <strong>{ride.duration} hours</strong></span>
                    </div>
                  </div>
                  
                  <div className="text-right ml-6">
                    <div className="text-2xl font-bold text-green-600 flex items-center justify-end mb-2">
                      <span>₹{ride.fee}</span>
                    </div>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                      ride.status === 'COMPLETED' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {ride.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RideHistory;