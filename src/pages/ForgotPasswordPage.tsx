import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) {
      setError('Please enter your email address')
      return
    }
    
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address')
      return
    }
    
    // TODO: Implement actual password reset logic here
    console.log('Password reset requested for:', email)
    
    // Simulate successful request
    setIsSubmitted(true)
    setError('')
  }

  return (
    <div className="min-h-screen bg-gradient-mindgarden flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        {/* Forgot Password Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100"
        >
          {/* Header */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-center mb-8"
          >
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Forgot Password?
            </h1>
            <p className="text-lg italic text-[#CBAACB] font-medium">
              🌱 Don't worry, we'll help you get back to your peaceful mind.
            </p>
          </motion.div>

          {!isSubmitted ? (
            <>
              <p className="text-gray-600 text-center mb-6">
                Enter your email address and we'll send you a link to reset your password.
              </p>

              {/* Reset Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <motion.div
                    whileFocus={{ scale: 1.02 }}
                    className="relative"
                  >
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value)
                        if (error) setError('')
                      }}
                      className={`w-full px-4 py-4 rounded-2xl border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#CBAACB] focus:border-transparent ${
                        error 
                          ? 'border-[#F4A259] bg-[#F4A259]/5' 
                          : 'border-gray-200 focus:border-[#CBAACB]'
                      }`}
                      placeholder="Enter your email"
                    />
                    {error && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-[#F4A259] text-sm mt-1 ml-1"
                      >
                        {error}
                      </motion.p>
                    )}
                  </motion.div>
                </div>

                {/* Submit Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-[#F6BD60] text-white font-semibold py-4 px-6 rounded-2xl hover:bg-[#E5A94A] transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Send Reset Link
                </motion.button>
              </form>
            </>
          ) : (
            /* Success Message */
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <div className="mb-6">
                <div className="w-16 h-16 bg-[#CBAACB] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  Check Your Email
                </h2>
                <p className="text-gray-600">
                  We've sent a password reset link to <strong>{email}</strong>
                </p>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsSubmitted(false)}
                className="w-full bg-[#CBAACB] text-white font-semibold py-4 px-6 rounded-2xl hover:bg-[#B89AB8] transition-all duration-200 shadow-lg hover:shadow-xl mb-4"
              >
                Send Another Email
              </motion.button>
            </motion.div>
          )}

          {/* Back to Login Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Remember your password?{' '}
              <Link
                to="/login"
                className="text-[#CBAACB] hover:text-[#B89AB8] font-medium transition-colors"
              >
                Back to login
              </Link>
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default ForgotPasswordPage 