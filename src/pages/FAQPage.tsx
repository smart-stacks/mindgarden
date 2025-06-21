import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'

const FAQPage: React.FC = () => {
  const [openItem, setOpenItem] = useState<number | null>(null)

  const faqItems = [
    {
      id: 1,
      question: "Is this service anonymous?",
      answer: "Yes, your privacy is our top priority. All conversations are confidential and your personal information is protected. You can use our service without providing any identifying information."
    },
    {
      id: 2,
      question: "What happens if I trigger a crisis alert?",
      answer: "If our system detects you're in crisis, we'll immediately connect you with emergency resources. This may include crisis hotlines, emergency services, or nearby mental health professionals. Your safety is our primary concern."
    },
    {
      id: 3,
      question: "Can I speak to a real person?",
      answer: "While our AI agents provide immediate support, we can connect you with human mental health professionals when needed. Our escalation system ensures you get the right level of care."
    },
    {
      id: 4,
      question: "Is this available 24/7?",
      answer: "Yes! Our AI support is available 24/7. Crisis resources and emergency services are also available around the clock. You're never alone, no matter what time it is."
    },
    {
      id: 5,
      question: "How is my data protected?",
      answer: "We use industry-standard encryption and security measures to protect your data. We never share your information without your explicit consent, except in emergency situations where safety is at risk."
    }
  ]

  const toggleItem = (id: number) => {
    setOpenItem(openItem === id ? null : id)
  }

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <div className="text-center max-w-3xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="content-card"
        >
          <div className="text-6xl mb-6">❓</div>
          <h1 className="section-title">Frequently Asked Questions</h1>
          <p className="text-lg text-gray-600 mb-8">
            Find answers to common questions about MindGarden and our mental health support services.
          </p>
          
          <div className="space-y-4 mb-8">
            {faqItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
              >
                <button
                  onClick={() => toggleItem(item.id)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-200"
                >
                  <span className="font-semibold text-gray-800">{item.question}</span>
                  <span className={`text-2xl transition-transform duration-200 ${openItem === item.id ? 'rotate-45' : ''}`}>
                    +
                  </span>
                </button>
                
                <AnimatePresence>
                  {openItem === item.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-4 text-gray-600 leading-relaxed">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-primary-dark text-white rounded-xl hover:from-primary-dark hover:to-primary transition-all duration-200 shadow-md hover:scale-105"
            >
              <span>←</span>
              Back to Home
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default FAQPage 