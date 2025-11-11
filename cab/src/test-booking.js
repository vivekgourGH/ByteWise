// Test booking functionality
// Run this in browser console to test booking flow

function testBookingFlow() {
  console.log('🧪 Testing Booking Flow...');
  
  // Test 1: Check if localStorageService is available
  try {
    const service = window.localStorageService || JSON.parse(localStorage.getItem('localUsers'));
    console.log('✅ Local storage accessible');
  } catch (e) {
    console.error('❌ Local storage not accessible:', e);
    return;
  }
  
  // Test 2: Check route data
  try {
    const routeTest = fetch('/src/data/routeData.json')
      .then(r => r.json())
      .then(data => {
        console.log('✅ Route data loaded:', Object.keys(data).length, 'routes');
        
        // Test a sample route
        const testRoute = data['t. nagar-velachery'];
        if (testRoute) {
          console.log('✅ Sample route found:', testRoute);
        } else {
          console.log('❌ Sample route not found');
        }
      })
      .catch(e => console.error('❌ Route data failed:', e));
  } catch (e) {
    console.error('❌ Route data test failed:', e);
  }
  
  // Test 3: Check if user is logged in
  const username = sessionStorage.getItem('username');
  const token = sessionStorage.getItem('jwtToken');
  
  if (username && token) {
    console.log('✅ User logged in:', username);
  } else {
    console.log('⚠️ User not logged in - some features may not work');
  }
  
  // Test 4: Simulate booking creation
  try {
    const testBooking = {
      pickupLocation: 'T. Nagar',
      dropLocation: 'Velachery',
      vehicleType: 'economy',
      tripDate: '2024-01-15',
      bookedBy: username || 'Test User',
      passengerPhone: '9999999999',
      fare: 150,
      distance: 9.3
    };
    
    // Store in localStorage directly for testing
    const bookings = JSON.parse(localStorage.getItem('localBookings') || '[]');
    const newBooking = { ...testBooking, id: Date.now(), status: 'PENDING' };
    bookings.push(newBooking);
    localStorage.setItem('localBookings', JSON.stringify(bookings));
    
    console.log('✅ Test booking created:', newBooking.id);
    
    // Clean up test booking
    setTimeout(() => {
      const updatedBookings = JSON.parse(localStorage.getItem('localBookings') || '[]');
      const filtered = updatedBookings.filter(b => b.id !== newBooking.id);
      localStorage.setItem('localBookings', JSON.stringify(filtered));
      console.log('🧹 Test booking cleaned up');
    }, 1000);
    
  } catch (e) {
    console.error('❌ Booking test failed:', e);
  }
  
  console.log('🎉 Booking flow test completed!');
}

// Make function available globally
window.testBookingFlow = testBookingFlow;

console.log('🔧 Booking test loaded. Run testBookingFlow() to test.');

export default testBookingFlow;