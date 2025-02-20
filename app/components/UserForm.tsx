'use client'

import { useState } from 'react'

export default function UserForm() {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    email: '',
    phone: '',
    dob: ''
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const formattedData = {
        ...formData,
        age: parseInt(formData.age),
        dob: new Date(formData.dob).toISOString()
      }

      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedData),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to create user')
      }

      setFormData({ name: '', age: '', email: '', phone: '', dob: '' })
      alert('User created successfully!')
      window.location.reload()
    } catch (error) {
      console.error('Error:', error)
      alert(error instanceof Error ? error.message : 'Failed to create user')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto p-8 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl shadow-lg border border-purple-100">
      <h2 className="text-3xl font-bold text-indigo-800 mb-8 text-center">
        Register New User
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-bold text-indigo-700 mb-2">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 text-gray-900 placeholder-gray-400 border-2 border-indigo-200 rounded-lg 
              focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors bg-white
              hover:border-indigo-300"
            placeholder="Enter your full name"
            required
          />
        </div>
        
        <div>
          <label htmlFor="age" className="block text-sm font-bold text-indigo-700 mb-2">
            Age
          </label>
          <input
            type="number"
            id="age"
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
            className="w-full px-4 py-3 text-gray-900 placeholder-gray-400 border-2 border-indigo-200 rounded-lg 
              focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors bg-white
              hover:border-indigo-300"
            placeholder="Enter your age"
            min="0"
            max="150"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-bold text-indigo-700 mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-3 text-gray-900 placeholder-gray-400 border-2 border-indigo-200 rounded-lg 
              focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors bg-white
              hover:border-indigo-300"
            placeholder="your.email@example.com"
            required
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-bold text-indigo-700 mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-4 py-3 text-gray-900 placeholder-gray-400 border-2 border-indigo-200 rounded-lg 
              focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors bg-white
              hover:border-indigo-300"
            placeholder="Enter your phone number"
            required
          />
        </div>

        <div>
          <label htmlFor="dob" className="block text-sm font-bold text-indigo-700 mb-2">
            Date of Birth
          </label>
          <input
            type="date"
            id="dob"
            value={formData.dob}
            onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
            className="w-full px-4 py-3 text-gray-900 placeholder-gray-400 border-2 border-indigo-200 rounded-lg 
              focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors bg-white
              hover:border-indigo-300"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-4 px-6 rounded-lg text-white font-bold text-lg transition-all
            ${loading 
              ? 'bg-indigo-400 cursor-not-allowed' 
              : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg active:transform active:scale-98'
            } mt-8`}
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
          ) : (
            'Register User'
          )}
        </button>
      </form>
    </div>
  )
} 