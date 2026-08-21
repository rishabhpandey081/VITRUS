import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMail, FiLock, FiUser, FiArrowRight, FiGithub } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';

export default function AuthForm({ onLogin }) {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md p-8 bg-zinc-900/80 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl text-white"
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight">
          {isSignUp ? 'Create your Kairos account' : 'Welcome back to Kairos'}
        </h2>
        <p className="text-sm text-zinc-400 mt-2">
          {isSignUp ? 'Start your journey to elite tech roles today.' : 'Please enter your details to sign in.'}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <button
          type="button"
          onClick={onLogin}
          className="flex items-center justify-center gap-2 py-2.5 px-4 bg-zinc-800/60 hover:bg-zinc-800 border border-white/10 rounded-lg text-sm font-medium transition-colors"
        >
          <FcGoogle className="text-lg" />
          <span>Google</span>
        </button>
        <button
          type="button"
          onClick={onLogin}
          className="flex items-center justify-center gap-2 py-2.5 px-4 bg-zinc-800/60 hover:bg-zinc-800 border border-white/10 rounded-lg text-sm font-medium transition-colors"
        >
          <FiGithub className="text-lg" />
          <span>GitHub</span>
        </button>
      </div>

      <div className="relative flex items-center justify-center mb-6">
        <div className="border-t border-white/10 w-full"></div>
        <span className="bg-zinc-900 px-3 text-xs uppercase tracking-widest text-zinc-500 absolute">
          Or continue with
        </span>
      </div>

      <form onSubmit={(e) => { e.preventDefault(); onLogin(); }} className="space-y-4">
        <AnimatePresence mode="wait">
          {isSignUp && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
                Full Name
              </label>
              <div className="relative">
                <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 text-lg" />
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full pl-11 pr-4 py-3 bg-zinc-800/50 border border-white/10 rounded-lg focus:outline-none focus:border-indigo-500 text-white placeholder-zinc-600 transition-colors text-sm"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
            Email Address
          </label>
          <div className="relative">
            <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 text-lg" />
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full pl-11 pr-4 py-3 bg-zinc-800/50 border border-white/10 rounded-lg focus:outline-none focus:border-indigo-500 text-white placeholder-zinc-600 transition-colors text-sm"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Password
            </label>
            {!isSignUp && (
              <a href="#" className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors">
                Forgot password?
              </a>
            )}
          </div>
          <div className="relative">
            <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 text-lg" />
            <input
              type="password"
              placeholder="••••••••"
              className="w-full pl-11 pr-4 py-3 bg-zinc-800/50 border border-white/10 rounded-lg focus:outline-none focus:border-indigo-500 text-white placeholder-zinc-600 transition-colors text-sm"
            />
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          type="submit"
          className="w-full py-3 mt-2 bg-indigo-600 hover:bg-indigo-500 font-semibold rounded-lg transition-colors shadow-lg shadow-indigo-600/30 text-white flex items-center justify-center gap-2 text-sm"
        >
          <span>{isSignUp ? 'Get Started' : 'Sign In'}</span>
          <FiArrowRight className="text-lg" />
        </motion.button>
      </form>

      <div className="mt-8 text-center text-sm text-zinc-400">
        {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
        <button
          onClick={() => setIsSignUp(!isSignUp)}
          className="text-indigo-400 hover:text-indigo-300 font-semibold ml-1 transition-colors"
        >
          {isSignUp ? 'Sign In' : 'Create one'}
        </button>
      </div>
    </motion.div>
  );
}