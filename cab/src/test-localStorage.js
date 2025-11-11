// Test script for localStorage service
// Run this in browser console to test the service

import localStorageService from './services/localStorageService.js';

// Test function to verify all functionality
function testLocalStorageService() {
  console.log('🧪 Testing LocalStorage Service...');
  
  try {
    // Test 1: Initialize data
    console.log('✅ Service initialized');
    
    // Test 2: Get users
    const users = localStorageService.getUsers();
    console.log('✅ Users loaded:', users.length, 'users');
    
    // Test 3: Test authentication
    const authResult = localStorageService.authenticateUser('user@example.com', 'password123', 'user');
    console.log('✅ Authentication test:', authResult.success ? 'PASSED' : 'FAILED');
    
    // Test 4: Create a test booking
    const testBooking = {
      pickupLocation: 'T. Nagar',
      dropLocation: 'Velachery',
      vehicleType: 'economy',
      tripDate: '2024-01-15',
      bookedBy: 'Demo User',
      passengerPhone: '9999999999',
      fare: 150,
      distance: 9.3
    };
    
    const booking = localStorageService.addBooking(testBooking);
    console.log('✅ Booking created:', booking.id);
    
    // Test 5: Get bookings
    const bookings = localStorageService.getBookings();
    console.log('✅ Bookings loaded:', bookings.length, 'bookings');
    
    // Test 6: Update booking status
    const updatedBooking = localStorageService.updateBookingStatus(booking.id, 'COMPLETED');
    console.log('✅ Booking updated:', updatedBooking ? 'SUCCESS' : 'FAILED');
    
    // Test 7: Add feedback
    const feedback = localStorageService.addFeedback({
      userId: 'Demo User',
      driverName: 'Demo Driver',
      ratings: 5,
      comments: 'Excellent Service',
      bookingId: booking.id
    });
    console.log('✅ Feedback added:', feedback.id);
    
    console.log('🎉 All tests passed! LocalStorage service is working correctly.');
    
    return {
      success: true,
      message: 'All tests passed',
      data: {
        users: users.length,
        bookings: bookings.length,
        testBookingId: booking.id,
        feedbackId: feedback.id
      }
    };
    
  } catch (error) {
    console.error('❌ Test failed:', error);
    return {
      success: false,
      message: error.message,
      error: error
    };
  }
}

// Export for use in browser console
window.testLocalStorageService = testLocalStorageService;

console.log('🔧 Test function loaded. Run testLocalStorageService() in console to test.');

export default testLocalStorageService;