import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ErrorBoundary from './Components/ErrorBoundary';
import Header from './Components/Header';
import Homepage from './Components/homepage';
import Confirmbook from './Components/confirmbook';
import RideHistory from './Components/ridehistory';
import DriverLayout from './Components/DriverDashboard/DriverLayout';
import DriverHome from './Components/DriverDashboard/DriverHome';
import DriverRideHistory from './Components/DriverDashboard/DriverRideHistory';
import DriverProfile from './Components/DriverDashboard/DriverProfile';
import AdminLayout from './Components/AdminDashboard/AdminLayout';
import AdminDashboard from './Components/AdminDashboard/AdminDashboard';
import Users from './Components/AdminDashboard/Users';
import AllDrivers from './Components/AdminDashboard/AllDrivers';
import Reports from './Components/AdminDashboard/Reports';
import RateManagement from './Components/AdminDashboard/RateManagement';
import Profile from './Components/Profile';
import MyCourses from './Components/MyCourses';
import CoursePayment from './Components/CoursePayment';
import Support from './Components/Support';
import Promotions from './Components/Promotions';
import Login from './Components/Login_authenticator/Login';
import Signup from './Components/Login_authenticator/Signup';
import Payment from './Components/payment';
import Feedback from './Components/feedback';






const App = () => {



  return (
    <ErrorBoundary>
      <Router>
        <Header>
          <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/booking-confirm" element={<Confirmbook />} />
           <Route path="/payment" element={<Payment />} />
            <Route path="/feedback" element={<Feedback />} />
          <Route path="/ride-history" element={<RideHistory />} />
          <Route path="/ridehistory" element={<RideHistory />} />
          <Route path="/my-courses" element={<MyCourses />} />
          <Route path="/course-payment" element={<CoursePayment />} />
          <Route path="/profile" element={<Profile/>} />

          <Route path="/support" element={<Support />} />
          <Route path="/promotions" element={<Promotions />} />





        <Route path="/login" element={<Login  />} />
           <Route path="/signup" element={<Signup />} />


           
          

          <Route path="/driverdashboard" element={<DriverLayout />}>
            <Route index element={<DriverHome />} />
            <Route path="ridehistory" element={<DriverRideHistory />} /> 
            <Route path="profile" element={<DriverProfile />} />
            <Route path="support" element={<Support />} />
          </Route>

          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="drivers" element={<AllDrivers />} />
            <Route path="rates" element={<RateManagement />} />
            <Route path="reports" element={<Reports />} />
          </Route>
          </Routes>
        </Header>
      </Router>
    </ErrorBoundary>
  )
}

export default App
