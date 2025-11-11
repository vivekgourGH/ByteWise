import React, { createContext, useContext, useState, useEffect } from 'react';
// Note: For local-only mode we avoid backend calls and use localStorage

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize auth state from sessionStorage
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const sessionId = sessionStorage.getItem('sessionId');
        const role = sessionStorage.getItem('role');
        
        if (sessionId && role) {
          // Validate session locally by checking sessionStorage presence and localUsers list
          const storedEmail = sessionStorage.getItem('email');
          const usersRaw = localStorage.getItem('localUsers');
          let users = [];
          if (usersRaw) {
            try { users = JSON.parse(usersRaw); } catch { users = []; }
          }

          const match = users.find(u => u.email.toLowerCase() === (storedEmail || '').toLowerCase());
          if (match) {
            setUser({
              sessionId,
              role,
              username: sessionStorage.getItem('username'),
              email: sessionStorage.getItem('email'),
              driverName: sessionStorage.getItem('driverName')
            });
          } else {
            // No local user found, clear storage
            clearAuth();
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        clearAuth();
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const validateSession = async (sessionId, role) => {
    // Local validation: session presence only
    try {
      const stored = sessionStorage.getItem('sessionId');
      return stored === sessionId;
    } catch (e) {
      return false;
    }
  };

  const login = async (credentials, role) => {
    try {
      setLoading(true);
      // Local-only login: try to find user in localUsers
      const usersRaw = localStorage.getItem('localUsers');
      let users = [];
      if (usersRaw) {
        try { users = JSON.parse(usersRaw); } catch { users = []; }
      }

      const match = users.find(u => u.email.toLowerCase() === (credentials.email || '').toLowerCase() && u.role === (role || 'user'));
      if (!match) return { success: false, message: 'User not found' };

      // For demo: no hashing
      if (credentials.password && match.password !== credentials.password) return { success: false, message: 'Invalid password' };

      const sessionId = `local-${Date.now()}`;
      sessionStorage.setItem('sessionId', sessionId);
      sessionStorage.setItem('role', (match.role || 'user').toUpperCase());
      sessionStorage.setItem('email', match.email);
      if (match.fullName) sessionStorage.setItem('username', match.fullName);

      const userData = { sessionId, role: (match.role || 'user').toUpperCase(), email: match.email, username: match.fullName };
      setUser(userData);
      return { success: true, data: userData };
    } catch (error) {
      return { success: false, message: error.message || 'Login failed' };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      const sessionId = sessionStorage.getItem('sessionId');
      const role = sessionStorage.getItem('role');
      // Local-only: nothing to call on backend
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      clearAuth();
    }
  };

  const clearAuth = () => {
    sessionStorage.removeItem('sessionId');
    sessionStorage.removeItem('role');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('driverName');
    sessionStorage.removeItem('phone');
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('jwtToken');
    sessionStorage.removeItem('userProfile');
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
    isUser: user?.role === 'USER',
    isDriver: user?.role === 'DRIVER',
    isAdmin: user?.role === 'ADMIN'
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
