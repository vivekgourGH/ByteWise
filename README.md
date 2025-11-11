# BytWise - Local Frontend Application

A complete EdTech learning platform that runs entirely on the frontend using localStorage for data persistence. No backend server required!

## Features

✅ **Complete User Authentication**
- Student, Instructor, and Admin login/signup
- Local storage-based authentication
- Session management

✅ **Course Enrollment System**
- Real-time course booking with category selection
- Instructor assignment simulation
- Enrollment confirmation and management
- Learning history tracking

✅ **Payment Integration**
- Multiple payment methods (Card, UPI)
- Coupon system with discounts
- Payment status tracking

✅ **Feedback System**
- Star ratings and comments
- Instructor feedback collection

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

### Instructor Account
- **Email:** `instructor@example.com`
- **Password:** `instructorpass`

### Admin Account
- **Email:** `admin@bytewise.com`
- **Password:** `admin123`
- **Admin Key:** `codered`

## How It Works

### Data Storage
- All data is stored in browser's localStorage
- No external database required
- Data persists between browser sessions

### Course Enrollment Flow
1. **Select Category:** Choose from available course categories
2. **Choose Course:** Select from Beginner, Intermediate, or Advanced courses
3. **Find Courses:** System calculates price and duration
4. **Enroll Course:** Confirm enrollment details
5. **Instructor Assignment:** Automatic instructor assignment (simulated)
6. **Payment:** Complete payment with multiple options
7. **Feedback:** Rate your learning experience

### Key Components

- **LocalStorageService:** Handles all data operations
- **Enrollment System:** Course selection and instructor assignment
- **Authentication:** User login/signup with role management
- **Payment Gateway:** Simulated payment processing
- **Feedback System:** Rating and review collection

## Available Courses

The application includes predefined course categories:
- Programming & Development
- Data Science & Analytics
- Web Design & UI/UX
- Digital Marketing
- And many more...

## Project Structure

```
cab/
├── src/
│   ├── Components/
│   │   ├── Homesections/
│   │   │   └── courseBooking.jsx    # Main course enrollment component
│   │   ├── Login_authenticator/
│   │   │   ├── Login.jsx            # Login component
│   │   │   └── Signup.jsx           # Signup component
│   │   ├── confirmbook.jsx          # Enrollment confirmation
│   │   ├── payment.jsx              # Payment processing
│   │   ├── feedback.jsx             # Feedback system
│   │   └── learninghistory.jsx      # Learning history
│   ├── services/
│   │   └── localStorageService.js   # Data management service
│   ├── data/
│   │   └── coursesData.js           # Course information
│   └── contexts/
│       └── AuthContext.jsx          # Authentication context
```

## Features in Detail

### 📚 Enrollment System
- Real-time price calculation based on course level
- Course type selection (Beginner/Intermediate/Advanced)
- Automatic instructor assignment
- Enrollment status tracking

### 💳 Payment System
- Credit/Debit card payments
- UPI payments (Google Pay, PhonePe, Paytm)
- Coupon codes with discounts
- Payment confirmation

### ⭐ Feedback System
- 5-star rating system
- Predefined feedback tags
- Instructor-specific feedback

### 👤 User Management
- Profile editing
- Role-based access (Student/Instructor/Admin)
- Session management

## Troubleshooting

### Common Issues

1. **Data not persisting**
   - Check if localStorage is enabled in your browser
   - Clear browser cache and try again

2. **Courses not working**
   - Ensure you're selecting valid course categories
   - Check the coursesData.js file for available courses

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

### Adding New Courses
Edit `src/data/coursesData.js` to add new courses:
```javascript
{
  "new-course-category": { "duration": 40, "price": 2999 },
  "existing-course-advanced": { "duration": 60, "price": 4999 }
}
```

### Customizing Course Types
Edit the `courses` array in `src/Components/Homesections/courseBooking.jsx`

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge

## License

This project is for educational purposes only.

---

**Note:** This is a frontend-only EdTech application using localStorage for data persistence. No backend server is required to run this application.