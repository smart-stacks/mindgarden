import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
import App from './App.tsx'
import { AuthProvider } from './contexts/AuthContext'
import './index.css'

// Get Google Client ID from environment variable with enhanced debugging
const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

// Debug: Check if the client ID is loaded correctly with detailed logging
console.log('Environment Variables Debug:')
console.log('- VITE_GOOGLE_CLIENT_ID:', googleClientId ? 'ID is present' : 'ID is missing');
console.log('- All env variables available:', Object.keys(import.meta.env).join(', '));

// Create a fallback mechanism for development/testing without auth
const useGoogleAuth = googleClientId && googleClientId.length > 10;

if (!useGoogleAuth) {
  console.warn('⚠️ Google Client ID is missing or invalid! Authentication features will be limited.');
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      {useGoogleAuth ? (
        <GoogleOAuthProvider clientId={googleClientId}>
          <AuthProvider>
            <App />
          </AuthProvider>
        </GoogleOAuthProvider>
      ) : (
        <AuthProvider>
          <App />
        </AuthProvider>
      )}
    </BrowserRouter>
  </React.StrictMode>
)