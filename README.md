# ByteWise - Kids Coding Platform 🚀

A fun and interactive coding learning platform designed specifically for school students and young kids (ages 8-18) who want to learn programming as a hobby or explore the world of coding! Runs entirely on the frontend using localStorage - no backend server required!

## Features

✅ **Kid-Friendly Authentication**
- Student, Parent, and Instructor accounts
- Safe and secure local storage-based authentication
- Parental dashboard access

✅ **Age-Appropriate Course System**
- Coding courses designed for different age groups (8-18 years)
- Block programming (Scratch) for beginners
- Text programming (Python, JavaScript) for intermediate learners
- Game development and web development tracks
- Robotics and mobile app development

✅ **Affordable Pricing**
- Budget-friendly courses starting from ₹999
- Special discounts for multiple course enrollments
- Family-friendly payment options

✅ **Interactive Learning**
- Fun projects and games
- Visual programming with blocks
- Real coding with kid-friendly explanations
- Certificate rewards system

✅ **Parent-Friendly Features**
- Progress tracking for parents
- Safe learning environment
- Weekend and flexible scheduling

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

Create your account by signing up on the platform.

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

## Available Coding Adventures

The platform includes exciting course categories perfect for young learners:
- **Block Programming** 🧩 - Visual coding with Scratch (Ages 8-14)
- **Text Programming** 💻 - Python and JavaScript (Ages 10-16)
- **Game Development** 🎮 - Build your own video games (Ages 13-18)
- **Web Development** 🌐 - Create websites and web apps (Ages 12-17)
- **Mobile Development** 📱 - Build phone apps (Ages 14-18)
- **Robotics** 🤖 - Program robots and electronics (Ages 10-16)

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

### 🎆 Kid-Friendly Enrollment
- Age-appropriate course recommendations
- Visual course selection with fun graphics
- Parent approval system for younger students
- Progress tracking and achievement badges

### 💳 Family-Friendly Payments
- Affordable pricing for families
- Multiple payment options
- Special discounts and family packages
- Secure payment processing

### ⭐ Fun Feedback System
- Kid-friendly rating system with emojis
- Encouraging feedback messages
- Parent and student feedback options
- Achievement celebrations

### 👨‍👩‍👧‍👦 Family Account Management
- Student profiles with age verification
- Parent dashboard access
- Safe and secure environment
- Progress sharing with family

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

**Note:** This is a frontend-only kids coding platform using localStorage for data persistence. Perfect for young learners to start their coding journey in a safe, fun environment. No backend server required!