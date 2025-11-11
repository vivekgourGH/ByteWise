# CabConnect - Local Frontend Application

A complete cab booking application that runs entirely on the frontend using localStorage for data persistence. No backend server required!

## Features

✅ **Complete User Authentication**
- User, Driver, and Admin login/signup
- Local storage-based authentication
- Session management

✅ **Booking System**
- Real-time cab booking with route calculation
- Driver assignment simulation
- Booking confirmation and management
- Ride history tracking

✅ **Payment Integration**
- Multiple payment methods (Card, UPI)
- Coupon system with discounts
- Payment status tracking

✅ **Feedback System**
- Star ratings and comments
- Driver feedback collection

✅ **Profile Management**
- User profile editing
- Phone and email updates

## Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd cabconnect
   ```

2. **Install dependencies**
   ```bash
   cd cab
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## Default Login Credentials

### User Account
- **Email:** `user@example.com`
- **Password:** `password123`

### Driver Account
- **Email:** `driver@example.com`
- **Password:** `driverpass`

### Admin Account
- **Email:** `admin@cabconnect.com`
- **Password:** `admin123`
- **Admin Key:** `codered`

## How It Works

### Data Storage
- All data is stored in browser's localStorage
- No external database required
- Data persists between browser sessions

### Booking Flow
1. **Select Route:** Choose pickup and drop locations from predefined Chennai routes
2. **Choose Vehicle:** Select from Economy, Standard, or Luxury cabs
3. **Find Cabs:** System calculates fare and distance
4. **Book Ride:** Confirm booking details
5. **Driver Assignment:** Automatic driver assignment (simulated)
6. **Payment:** Complete payment with multiple options
7. **Feedback:** Rate your ride experience

### Key Components

- **LocalStorageService:** Handles all data operations
- **Booking System:** Route calculation and cab assignment
- **Authentication:** User login/signup with role management
- **Payment Gateway:** Simulated payment processing
- **Feedback System:** Rating and review collection

## Available Routes

The application includes predefined routes in Chennai:
- T. Nagar ↔ Velachery
- Anna Nagar ↔ Guindy
- Tambaram ↔ OMR
- Marina Beach ↔ Porur
- And many more...

## Project Structure

```
cab/
├── src/
│   ├── Components/
│   │   ├── Homesections/
│   │   │   └── booking.jsx          # Main booking component
│   │   ├── Login_authenticator/
│   │   │   ├── Login.jsx            # Login component
│   │   │   └── Signup.jsx           # Signup component
│   │   ├── confirmbook.jsx          # Booking confirmation
│   │   ├── payment.jsx              # Payment processing
│   │   ├── feedback.jsx             # Feedback system
│   │   └── ridehistory.jsx          # Ride history
│   ├── services/
│   │   └── localStorageService.js   # Data management service
│   ├── data/
│   │   └── routeData.json           # Route information
│   └── contexts/
│       └── AuthContext.jsx          # Authentication context
```

## Features in Detail

### 🚗 Booking System
- Real-time fare calculation based on distance
- Vehicle type selection (Economy/Standard/Luxury)
- Automatic driver assignment
- Booking status tracking

### 💳 Payment System
- Credit/Debit card payments
- UPI payments (Google Pay, PhonePe, Paytm)
- Coupon codes with discounts
- Payment confirmation

### ⭐ Feedback System
- 5-star rating system
- Predefined feedback tags
- Driver-specific feedback

### 👤 User Management
- Profile editing
- Role-based access (User/Driver/Admin)
- Session management

## Troubleshooting

### Common Issues

1. **Data not persisting**
   - Check if localStorage is enabled in your browser
   - Clear browser cache and try again

2. **Routes not working**
   - Ensure you're selecting valid pickup/drop combinations
   - Check the routeData.json file for available routes

3. **Login issues**
   - Use the default credentials provided above
   - Clear localStorage and try again: `localStorage.clear()`

### Reset Application Data

To reset all application data:
```javascript
// Open browser console and run:
localStorage.clear();
// Then refresh the page
```

## Development

### Adding New Routes
Edit `src/data/routeData.json` to add new routes:
```json
{
  "new-location-existing-location": { "distance": 15.5 },
  "existing-location-new-location": { "distance": 15.5 }
}
```

### Customizing Vehicle Types
Edit the `vehicles` array in `src/Components/Homesections/booking.jsx`

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge

## License

This project is for educational purposes only.

---

**Note:** This is a frontend-only application using localStorage for data persistence. No backend server is required to run this application.