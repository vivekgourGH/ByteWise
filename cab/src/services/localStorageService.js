// Local Storage Service for CabConnect
// This service handles all data operations using localStorage instead of backend APIs

class LocalStorageService {
  constructor() {
    this.initializeData();
  }

  // Initialize default data if not exists
  initializeData() {
    // Initialize users if not exists
    if (!localStorage.getItem('localUsers')) {
      const defaultUsers = [
        {
          id: 1,
          fullName: "Demo User",
          email: "user@example.com",
          password: "password123",
          phone: "9999999999",
          role: "user",
          adminApproval: "approved",
          blockStatus: "no",
          aadharNumber: null,
          licenseNumber: null,
          vehicleModel: null,
          vehicleNumber: null,
          comments: ""
        },
        {
          id: 2,
          fullName: "Demo Driver",
          email: "driver@example.com",
          password: "driverpass",
          phone: "8888888888",
          role: "driver",
          adminApproval: "approved",
          blockStatus: "no",
          aadharNumber: "123456789012",
          licenseNumber: "DL123456789",
          vehicleModel: "Maruti Ciaz",
          vehicleNumber: "TN 01 CB 1234",
          comments: ""
        },
        {
          id: 3,
          fullName: "Admin User",
          email: "admin@example.com",
          password: "adminpass",
          phone: "7777777777",
          role: "admin",
          adminApproval: "approved",
          blockStatus: "no",
          aadharNumber: null,
          licenseNumber: null,
          vehicleModel: null,
          vehicleNumber: null,
          comments: ""
        }
      ];
      localStorage.setItem('localUsers', JSON.stringify(defaultUsers));
    }

    // Initialize bookings if not exists
    if (!localStorage.getItem('localBookings')) {
      localStorage.setItem('localBookings', JSON.stringify([]));
    }

    // Initialize feedback if not exists
    if (!localStorage.getItem('localFeedback')) {
      localStorage.setItem('localFeedback', JSON.stringify([]));
    }
  }

  // User Management
  getUsers() {
    try {
      return JSON.parse(localStorage.getItem('localUsers') || '[]');
    } catch {
      return [];
    }
  }

  getUserByEmail(email) {
    const users = this.getUsers();
    return users.find(user => user.email.toLowerCase() === email.toLowerCase());
  }

  addUser(userData) {
    const users = this.getUsers();
    const nextId = users.length ? Math.max(...users.map(u => u.id || 0)) + 1 : 1;
    const newUser = { id: nextId, ...userData };
    users.push(newUser);
    localStorage.setItem('localUsers', JSON.stringify(users));
    return newUser;
  }

  updateUser(userId, updates) {
    const users = this.getUsers();
    const index = users.findIndex(user => user.id === userId);
    if (index !== -1) {
      users[index] = { ...users[index], ...updates };
      localStorage.setItem('localUsers', JSON.stringify(users));
      return users[index];
    }
    return null;
  }

  // Booking Management
  getBookings() {
    try {
      return JSON.parse(localStorage.getItem('localBookings') || '[]');
    } catch {
      return [];
    }
  }

  getBookingById(id) {
    const bookings = this.getBookings();
    return bookings.find(booking => booking.id === parseInt(id));
  }

  addBooking(bookingData) {
    const bookings = this.getBookings();
    const nextId = bookings.length ? Math.max(...bookings.map(b => b.id || 0)) + 1 : 1;
    
    const newBooking = {
      id: nextId,
      ...bookingData,
      status: 'PENDING',
      paymentStatus: 'PENDING',
      createdAt: new Date().toISOString(),
      driverName: null,
      driverPhone: null,
      vehicleNumber: null
    };
    
    bookings.push(newBooking);
    localStorage.setItem('localBookings', JSON.stringify(bookings));
    
    // Auto-assign driver after 3 seconds (simulate driver acceptance)
    setTimeout(() => {
      this.assignDriverToBooking(nextId);
    }, 3000);
    
    return newBooking;
  }

  assignDriverToBooking(bookingId) {
    const bookings = this.getBookings();
    const users = this.getUsers();
    const booking = bookings.find(b => b.id === bookingId);
    
    if (!booking || booking.status !== 'PENDING') return;

    // Find available drivers
    const availableDrivers = users.filter(user => 
      user.role === 'driver' && 
      user.adminApproval === 'approved' && 
      user.blockStatus === 'no'
    );

    if (availableDrivers.length > 0) {
      // Randomly assign a driver
      const driver = availableDrivers[Math.floor(Math.random() * availableDrivers.length)];
      
      booking.status = 'ACCEPTED';
      booking.driverName = driver.fullName;
      booking.driverPhone = driver.phone;
      booking.vehicleNumber = driver.vehicleNumber || 'TN 01 CB 1234';
      booking.acceptedAt = new Date().toISOString();
      
      localStorage.setItem('localBookings', JSON.stringify(bookings));
    } else {
      // No drivers available
      booking.status = 'DENIED';
      booking.deniedAt = new Date().toISOString();
      localStorage.setItem('localBookings', JSON.stringify(bookings));
    }
  }

  updateBookingStatus(bookingId, status, additionalData = {}) {
    const bookings = this.getBookings();
    const booking = bookings.find(b => b.id === parseInt(bookingId));
    
    if (booking) {
      booking.status = status;
      Object.assign(booking, additionalData);
      
      if (status === 'COMPLETED') {
        booking.completedAt = new Date().toISOString();
      } else if (status === 'CANCELLED') {
        booking.cancelledAt = new Date().toISOString();
      }
      
      localStorage.setItem('localBookings', JSON.stringify(bookings));
      return booking;
    }
    return null;
  }

  updateBookingPayment(bookingId, paymentStatus) {
    const bookings = this.getBookings();
    const booking = bookings.find(b => b.id === parseInt(bookingId));
    
    if (booking) {
      booking.paymentStatus = paymentStatus;
      if (paymentStatus === 'COMPLETED') {
        booking.paidAt = new Date().toISOString();
        booking.status = 'COMPLETED'; // Mark ride as completed when payment is done
      }
      localStorage.setItem('localBookings', JSON.stringify(bookings));
      return booking;
    }
    return null;
  }

  deleteBooking(bookingId) {
    const bookings = this.getBookings();
    const index = bookings.findIndex(b => b.id === parseInt(bookingId));
    
    if (index !== -1) {
      // Instead of deleting, mark as cancelled
      bookings[index].status = 'CANCELLED';
      bookings[index].cancelledAt = new Date().toISOString();
      localStorage.setItem('localBookings', JSON.stringify(bookings));
      return true;
    }
    return false;
  }

  getUserBookings(username) {
    const bookings = this.getBookings();
    return bookings.filter(booking => 
      booking.bookedBy && booking.bookedBy.toLowerCase() === username.toLowerCase()
    );
  }

  getDriverBookings(driverName) {
    const bookings = this.getBookings();
    return bookings.filter(booking => 
      booking.driverName && booking.driverName.toLowerCase() === driverName.toLowerCase()
    );
  }

  // Feedback Management
  getFeedback() {
    try {
      return JSON.parse(localStorage.getItem('localFeedback') || '[]');
    } catch {
      return [];
    }
  }

  addFeedback(feedbackData) {
    const feedback = this.getFeedback();
    const nextId = feedback.length ? Math.max(...feedback.map(f => f.id || 0)) + 1 : 1;
    
    const newFeedback = {
      id: nextId,
      ...feedbackData,
      createdAt: new Date().toISOString()
    };
    
    feedback.push(newFeedback);
    localStorage.setItem('localFeedback', JSON.stringify(feedback));
    return newFeedback;
  }

  // Authentication helpers
  authenticateUser(email, password, role) {
    const user = this.getUserByEmail(email);
    
    if (!user) {
      return { success: false, message: 'User not found' };
    }
    
    if (user.role !== role) {
      return { success: false, message: 'Invalid role' };
    }
    
    if (user.password !== password) {
      return { success: false, message: 'Invalid password' };
    }
    
    if (user.blockStatus === 'yes') {
      return { success: false, message: 'Account is blocked' };
    }
    
    if (user.role === 'driver' && user.adminApproval !== 'approved') {
      return { success: false, message: 'Driver account pending approval' };
    }
    
    return { success: true, user };
  }

  // Generate mock JWT token for session
  generateToken(user) {
    return `local-token-${user.id}-${Date.now()}`;
  }

  // Clear all data (for testing)
  clearAllData() {
    localStorage.removeItem('localUsers');
    localStorage.removeItem('localBookings');
    localStorage.removeItem('localFeedback');
    this.initializeData();
  }
}

// Export singleton instance
const localStorageService = new LocalStorageService();
export default localStorageService;