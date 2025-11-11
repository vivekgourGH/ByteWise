import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import {
  FaBars,
  FaUserCircle,
  FaHistory,
  FaSignOutAlt,

  FaTags,
  FaQuestionCircle,
  FaTimes,
  FaUserEdit,

  FaCar,
} from "react-icons/fa";
import Logo from "./Logo";
 
// Helper component for sidebar navigation links to reduce repetition
const NavLink = ({ icon, text, onClick, isDanger = false }) => (
  <li>
    <button
      onClick={onClick}
      className={`group w-full flex items-center p-3 rounded-lg transition-colors duration-200 text-left ${
        isDanger
          ? "text-red-600 hover:bg-red-500 hover:text-white"
          : "text-gray-700 hover:bg-purple-100 hover:text-purple-900"
      }`}
    >
      {React.cloneElement(icon, { className: `mr-4 w-5 h-5 ${isDanger ? 'text-red-500 group-hover:text-white' : 'text-gray-500 group-hover:text-black'}` })}
      <span className="font-medium">{text}</span>
    </button>
  </li>
);

const Header = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userProfile, setUserProfile] = useState({
    name: 'Guest',
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ✅ FIXED: Check both 'token' and 'jwtToken' for session status
  useEffect(() => {
    const username = sessionStorage.getItem('username') || sessionStorage.getItem('driverName');
    const token = sessionStorage.getItem('token') || sessionStorage.getItem('jwtToken'); // ✅ Check both keys
    
    console.log('Header - Checking session:', { username, token: token ? 'exists' : 'missing' });
    console.log('Header - All sessionStorage keys:', Object.keys(sessionStorage));
    
    setUserProfile({ name: username || 'Guest' });
    setIsLoggedIn(!!token && !!username);
  }, [location.pathname]);

  // ✅ FIXED: Refresh user data when sidebar opens - check both token keys
  useEffect(() => {
    if (sidebarOpen) {
      const username = sessionStorage.getItem('username') || sessionStorage.getItem('driverName');
      const token = sessionStorage.getItem('token') || sessionStorage.getItem('jwtToken'); // ✅ Check both keys
      
      console.log('Header - Sidebar opened, checking session:', { username, token: token ? 'exists' : 'missing' });
      
      setUserProfile({ name: username || '' });
      setIsLoggedIn(!!token && !!username);
    }
  }, [sidebarOpen]);

  const handleAuthenticatedNavigate = (path) => {
    navigate(path);
  };

  const handleNavigateAndScroll = (targetId) => {
    if (location.pathname === '/') {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      navigate('/', { state: { scrollTo: targetId } });
    }
  };

  const handleLogoutClick = () => {
    setSidebarOpen(false);
    checkOngoingRidesBeforeLogout();
  };

  // Check for ongoing rides using local storage
  const checkOngoingRidesBeforeLogout = () => {
    const username = sessionStorage.getItem('username') || sessionStorage.getItem('driverName');
    
    if (username) {
      try {
        // Import localStorageService dynamically to avoid circular imports
        import('../services/localStorageService').then(({ default: localStorageService }) => {
          const userBookings = localStorageService.getUserBookings(username);
          
          // Check if user has any ongoing rides (ACCEPTED or ONGOING status)
          const userOngoingRides = userBookings.filter(booking => 
            booking.status === 'ACCEPTED' || booking.status === 'ONGOING'
          );

          if (userOngoingRides.length > 0) {
            Swal.fire({
              icon: 'warning',
              title: 'Ongoing Course Active',
              html: `You cannot logout while you have an ongoing course.<br><br>Please complete your current course first.`,
              confirmButtonText: 'Got it',
              confirmButtonColor: '#f59e0b'
            });
            return;
          }
          
          // If no ongoing rides, proceed with normal logout
          proceedWithLogout();
        }).catch(() => {
          // If import fails, proceed with logout anyway
          proceedWithLogout();
        });
      } catch (error) {
        console.error('Error checking ongoing rides:', error);
        proceedWithLogout();
      }
    } else {
      proceedWithLogout();
    }
  };

  const proceedWithLogout = () => {
    Swal.fire({
      title: 'Confirm Logout',
      text: "Are you sure you want to log out?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, Logout',
      customClass: {
        popup: 'rounded-xl shadow-lg',
      }
    }).then((result) => {
      if (result.isConfirmed) {
        // ✅ Clear all user-related data from localStorage and sessionStorage
        localStorage.removeItem('authToken');
        localStorage.removeItem('userRole');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('username');
        localStorage.removeItem('userPhone');
        
        // Clear all sessionStorage
        sessionStorage.clear();

        // ✅ Update state immediately after clearing
        setIsLoggedIn(false);
        setUserProfile({ name: 'Guest' });

        // Navigate to login after clearing data
        navigate('/login');
      }
    });
  };


 
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

 
  const prevPathname = useRef(location.pathname);

  // Close sidebar on route change, but keep it open if requested by navigation state
  useEffect(() => {
    if (location.state?.openSidebar) {
      setSidebarOpen(true);
      // Clean the state to prevent re-opening on refresh or back/forward
      const { openSidebar: _, ...restState } = location.state;
      navigate(location.pathname, {
        state: restState,
        replace: true,
      });
    } else if (prevPathname.current !== location.pathname) {
      // This is a navigation to a new page, and we didn't get the openSidebar signal.
      setSidebarOpen(false);
    }
    prevPathname.current = location.pathname;
  }, [location]);
 

 
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-slate-900 shadow-lg text-white z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left: Sidebar Toggle + Logo */}
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-md text-white hover:text-white hover:bg-slate-800 focus:outline-none transition"
              >
                <FaBars className="h-6 w-6" />
              </button>
              <Logo className="h-10" />
            </div>
 
            {/* Right: Auth Links or User Icons */}
            <div className="flex items-center space-x-2">
              {/* Logged-in user view */}
              <>

                {/* Profile Icon */}
                <button onClick={toggleSidebar} className="p-1 rounded-full text-white hover:text-white hover:bg-slate-800 transition">
                  <FaUserCircle className="h-8 w-8" />
                </button>
              </>
            </div>
          </div>
        </div>
      </nav>
 
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-white text-black shadow-2xl z-[60] transform transition-transform duration-300 ease-in-out flex flex-col ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center">
            <Logo className="h-8 mr-2" />
          </div>
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-full text-gray-500 hover:bg-gray-200 hover:text-black transition-all"
          >
            <FaTimes className="h-5 w-5" />
          </button>
        </div>

       {/* User Profile Section */}
<div className="p-4 text-center border-b border-gray-200">
  <FaUserCircle className="h-20 w-20 text-purple-500 mb-2 mx-auto" />
  
  {/* ✅ Clean display - name in light green when logged in */}
  {isLoggedIn ? (
    <p className="font-bold text-lg text-green-400">{userProfile.name}</p>
  ) : (
    <>
      <p className="font-bold text-lg text-gray-900">{userProfile.name}</p>
      <p className="text-sm text-gray-500 mt-1">Please login to continue</p>
    </>
  )}
</div>

        {/* Main Navigation */}
        <nav className="flex-grow p-4">
          <ul className="space-y-1">
            <NavLink icon={<FaCar />} text="Browse Courses" onClick={() => handleNavigateAndScroll('booking-section')} />
            <NavLink icon={<FaHistory />} text="Learning History" onClick={() => handleAuthenticatedNavigate("/ride-history")} />
            <NavLink icon={<FaUserEdit />} text="My Profile" onClick={() => handleAuthenticatedNavigate("/profile")} />

          </ul>
        </nav>

        {/* Footer Navigation */}
        <div className="p-4 border-t border-gray-200">
          <ul className="space-y-1">
            <NavLink icon={<FaQuestionCircle />} text="Support" onClick={() => navigate("/support")} />
            <NavLink icon={<FaTags />} text="Promotions" onClick={() => navigate("/promotions")} />
            {isLoggedIn && (
              <NavLink icon={<FaSignOutAlt />} text="Logout" onClick={handleLogoutClick} isDanger={true} />
            )}
            {!isLoggedIn && (
              <NavLink icon={<FaSignOutAlt />} text="Login" onClick={() => navigate("/login")} />
            )}
          </ul>
        </div>
      </aside>
 
      {/* Sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
 
      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? "lg:ml-64" : "ml-0"}`}>
        <main className="pt-16">{children}</main>
      </div>
    </div>
  );
};
 
export default Header;