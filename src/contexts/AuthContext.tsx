import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

// Define the shape of the user object
interface User {
  id: string;
  email: string;
  name?: string;
  picture?: string;
  email_verified?: boolean;
}

// Define the shape of the auth context
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isGuest: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: (token: string) => Promise<void>;
  initiateGoogleLogin: () => void;
  continueAsGuest: () => void;
  logout: () => void;
  error: string | null;
}

// Create the auth context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  isGuest: false,
  login: async () => {},
  loginWithGoogle: async () => {},
  initiateGoogleLogin: () => {},
  continueAsGuest: () => {},
  logout: () => {},
  error: null,
});

// Define props for the AuthProvider component
interface AuthProviderProps {
  children: ReactNode;
}

// Create the API URL based on environment
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080' || 'http://localhost:8081';

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isGuest, setIsGuest] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Check if user is already authenticated or in guest mode on component mount
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        // Check for token in URL (from OAuth redirect)
        const params = new URLSearchParams(location.search);
        const tokenFromUrl = params.get('token');
        
        if (tokenFromUrl) {
          // Save the token from URL
          localStorage.setItem('token', tokenFromUrl);
          
          // Set default auth header
          axios.defaults.headers.common['Authorization'] = `Bearer ${tokenFromUrl}`;
          
          try {
            // Get user info from token
            const response = await axios.get(`${API_URL}/auth/me`, {
              headers: { Authorization: `Bearer ${tokenFromUrl}` }
            });
            
            const userData = response.data;
            localStorage.setItem('user', JSON.stringify(userData));
            setUser(userData);
            
            // Remove token from URL to prevent bookmarking issues
            navigate(location.pathname, { replace: true });
            return;
          } catch (tokenErr) {
            console.error('Error validating token from URL:', tokenErr);
            localStorage.removeItem('token');
          }
        }
        
        // Check for guest mode
        const guestMode = localStorage.getItem('guestMode');
        if (guestMode === 'true') {
          setIsGuest(true);
          setUser(null);
          return;
        }
        
        // Check for authenticated user from localStorage
        const token = localStorage.getItem('token');
        if (token) {
          // Set default auth header for all axios requests
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          
          // Get user data from localStorage
          const userData = JSON.parse(localStorage.getItem('user') || '{}');
          if (userData && userData.id) {
            setUser(userData);
          } else {
            // If no valid user data, try to fetch from API
            try {
              const response = await axios.get(`${API_URL}/auth/me`);
              const userData = response.data;
              localStorage.setItem('user', JSON.stringify(userData));
              setUser(userData);
            } catch (apiErr) {
              console.error('Error fetching user data:', apiErr);
              // Clear any invalid auth data
              localStorage.removeItem('token');
              localStorage.removeItem('user');
            }
          }
        }
      } catch (err) {
        console.error('Auth check error:', err);
        // Clear any invalid auth data
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, [location, navigate]);

  // Regular email/password login
  const login = async (email: string, password: string) => {
    try {
      setError(null);
      setIsLoading(true);
      
      // Implement your regular login API call here
      const response = await axios.post(`${API_URL}/auth/login`, { email, password });
      
      const { access_token, user } = response.data;
      
      // Save token and user data
      localStorage.setItem('token', access_token);
      localStorage.setItem('user', JSON.stringify(user));
      
      // Set default auth header
      axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
      
      setUser(user);
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.response?.data?.detail || 'Login failed. Please try again.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Google login with client-side token (for backward compatibility)
  const loginWithGoogle = async (token: string) => {
    try {
      setError(null);
      setIsLoading(true);
      
      // Call backend to verify Google token and get JWT
      const response = await axios.post(`${API_URL}/auth/verify-google-token`, { token });
      
      const { access_token, user } = response.data;
      
      // Save token and user data
      localStorage.setItem('token', access_token);
      localStorage.setItem('user', JSON.stringify(user));
      
      // Set default auth header
      axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
      
      setUser(user);
    } catch (err: any) {
      console.error('Google login error:', err);
      setError(err.response?.data?.detail || 'Google login failed. Please try again.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Initiate server-side Google OAuth flow
  const initiateGoogleLogin = () => {
    // Redirect to backend OAuth endpoint
    window.location.href = `${API_URL}/auth/google`;
  };

  // Continue as guest
  const continueAsGuest = () => {
    // Clear any existing auth data
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Remove default auth header
    delete axios.defaults.headers.common['Authorization'];
    
    // Set guest mode
    setIsGuest(true);
    setUser(null);
    setIsLoading(false);
    localStorage.setItem('guestMode', 'true');
  };

  // Logout
  const logout = () => {
    // Clear auth data
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('guestMode');
    
    // Remove default auth header
    delete axios.defaults.headers.common['Authorization'];
    
    // Explicitly set user to null to trigger isAuthenticated update
    setUser(null);
    setIsGuest(false);
    
    console.log('Logout called, user state cleared');
  };

  // Compute authentication status
  const isAuthenticated = !!user;

  // Provide the auth context to children
  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        isGuest,
        login,
        loginWithGoogle,
        initiateGoogleLogin,
        continueAsGuest,
        logout,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

export default AuthContext;
