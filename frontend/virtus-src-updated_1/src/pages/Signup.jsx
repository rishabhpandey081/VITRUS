import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    // Handle registration logic here, then route to dashboard or login
    navigate('/dashboard');
  };

  return (
    <div className="relative min-h-screen w-full bg-[#d8eae6] overflow-hidden flex items-center justify-end pr-16 py-10">
      {/* Background Graphic Layer */}
      <img 
        src="/bg.png" 
        alt="Background" 
        className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
      />

      {/* Right Glass Box */}
      <div className="relative z-10 w-full max-w-md bg-white/70 backdrop-blur-md p-8 rounded-[30px] shadow-2xl border border-white/40 my-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Create Account</h1>

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-white/50 focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-800 text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="name@example.com"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-white/50 focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-800 text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-white/50 focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-800 text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-white/50 focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-800 text-sm pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-white/50 focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-800 text-sm pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showConfirmPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-[#7aa8a2] hover:bg-[#68958f] text-white font-semibold rounded-xl shadow-lg transition duration-200 mt-2"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-teal-800 font-medium hover:underline">
            Log in.
          </Link>
        </p>
      </div>
    </div>
  );
}