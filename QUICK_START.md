# CabConnect - Quick Start Guide

## 🚀 How to Run

1. **Open Terminal/Command Prompt**
   ```bash
   cd d:\Projects\cabconnect\cab
   ```

2. **Install Dependencies** (if not already done)
   ```bash
   npm install
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

4. **Open Browser**
   - Go to `http://localhost:5173`

## 🔑 Login Credentials

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

## 🧪 Testing the Application

1. **Login as User**
   - Use user credentials above
   - Navigate to booking section
   - Select pickup: "T. Nagar"
   - Select drop: "Velachery"
   - Choose vehicle type
   - Click "Find Cabs"
   - Wait 3 seconds for results
   - Click "Proceed to Book"
   - Confirm booking
   - Wait for driver assignment (3 seconds)
   - Complete payment flow
   - Provide feedback

2. **Check Data Persistence**
   - Open browser console (F12)
   - Run: `localStorage.getItem('localBookings')`
   - Should show your booking data

## 🔧 Troubleshooting

### If the app doesn't start:
1. Check Node.js version: `node --version` (should be 14+)
2. Clear npm cache: `npm cache clean --force`
3. Delete node_modules and reinstall:
   ```bash
   rm -rf node_modules
   npm install
   ```

### If booking doesn't work:
1. Open browser console (F12)
2. Check for error messages
3. Verify you're logged in
4. Try clearing localStorage: `localStorage.clear()`

### If navigation fails:
1. Check browser console for errors
2. Refresh the page
3. Try logging out and back in

## 📊 Data Storage

All data is stored in browser's localStorage:
- **Users:** `localUsers`
- **Bookings:** `localBookings`
- **Feedback:** `localFeedback`

To reset all data:
```javascript
localStorage.clear()
```

## 🎯 Key Features to Test

1. ✅ **User Registration & Login**
2. ✅ **Booking Flow** (Pickup → Drop → Vehicle → Book)
3. ✅ **Driver Assignment** (Automatic after 3 seconds)
4. ✅ **Payment Processing** (Multiple methods)
5. ✅ **Feedback System** (Star ratings)
6. ✅ **Ride History** (View past bookings)
7. ✅ **Profile Management** (Edit user details)

## 🆘 Common Issues

**Issue:** "Cannot find module" errors
**Solution:** Run `npm install` in the cab directory

**Issue:** Blank page or white screen
**Solution:** Check browser console for errors, try refreshing

**Issue:** Booking not working
**Solution:** Ensure you're logged in and have selected all required fields

**Issue:** Navigation not working
**Solution:** Check that all routes are properly defined in App.jsx

---

**Need Help?** Check the browser console (F12) for detailed error messages.