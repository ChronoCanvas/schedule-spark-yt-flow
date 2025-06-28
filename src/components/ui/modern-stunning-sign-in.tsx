
"use client" 

import * as React from "react"
import { useState } from "react";
import { ArrowRight } from "lucide-react";

interface SignInProps {
  mode?: 'signin' | 'signup';
  onModeChange?: (mode: 'signin' | 'signup') => void;
}

const SignIn1 = ({ mode = 'signin', onModeChange }: SignInProps) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [fullName, setFullName] = React.useState("");
  const [error, setError] = React.useState("");
 
  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
 
  const handleSubmit = () => {
    if (mode === 'signup') {
      if (!fullName || !email || !password || !confirmPassword) {
        setError("Please fill in all fields.");
        return;
      }
      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }
    } else {
      if (!email || !password) {
        setError("Please enter both email and password.");
        return;
      }
    }
    
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    alert(`${mode === 'signin' ? 'Sign in' : 'Sign up'} successful! (Demo)`);
  };
 
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#121212] relative overflow-hidden w-full rounded-xl">
      {/* Centered glass card */}
      <div className="relative z-10 w-full max-w-sm rounded-3xl bg-gradient-to-r from-[#ffffff10] to-[#121212] backdrop-blur-sm shadow-2xl p-8 flex flex-col items-center">
        {/* Logo */}
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/20 mb-6 shadow-lg">
          <ArrowRight className="text-white h-6 w-6" />
        </div>
        {/* Title */}
        <h2 className="text-2xl font-semibold text-white mb-6 text-center">
          SpotPlan
        </h2>
        {/* Form */}
        <div className="flex flex-col w-full gap-4">
          <div className="w-full flex flex-col gap-3">
            {mode === 'signup' && (
              <input
                placeholder="Full Name"
                type="text"
                value={fullName}
                className="w-full px-5 py-3 rounded-xl bg-white/10 text-white placeholder-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                onChange={(e) => setFullName(e.target.value)}
              />
            )}
            <input
              placeholder="Email"
              type="email"
              value={email}
              className="w-full px-5 py-3 rounded-xl bg-white/10 text-white placeholder-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              placeholder="Password"
              type="password"
              value={password}
              className="w-full px-5 py-3 rounded-xl bg-white/10 text-white placeholder-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
              onChange={(e) => setPassword(e.target.value)}
            />
            {mode === 'signup' && (
              <input
                placeholder="Confirm Password"
                type="password"
                value={confirmPassword}
                className="w-full px-5 py-3 rounded-xl bg-white/10 text-white placeholder-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            )}
            {error && (
              <div className="text-sm text-red-400 text-left">{error}</div>
            )}
          </div>
          <hr className="opacity-10" />
          <div>
            <button
              onClick={handleSubmit}
              className="w-full bg-white/10 text-white font-medium px-5 py-3 rounded-full shadow hover:bg-white/20 transition mb-3 text-sm"
            >
              {mode === 'signin' ? 'Sign in' : 'Create Account'}
            </button>
            {/* Google Sign In */}
            <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-b from-[#232526] to-[#2d2e30] rounded-full px-5 py-3 font-medium text-white shadow hover:brightness-110 transition mb-2 text-sm">
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-5 h-5"
              />
              Continue with Google
            </button>
            <div className="w-full text-center mt-2">
              <span className="text-xs text-gray-400">
                {mode === 'signin' ? "Don't have an account?" : "Already have an account?"}{" "}
                <button
                  onClick={() => onModeChange?.(mode === 'signin' ? 'signup' : 'signin')}
                  className="underline text-white/80 hover:text-white"
                >
                  {mode === 'signin' ? "Sign up, it's free!" : "Sign in here"}
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* User count and avatars */}
      <div className="relative z-10 mt-12 flex flex-col items-center text-center">
        <p className="text-gray-400 text-sm mb-2">
          Join <span className="font-medium text-white">thousands</span> of
          travelers who are already using SpotPlan.
        </p>
        <div className="flex">
          <img
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="user"
            className="w-8 h-8 rounded-full border-2 border-[#181824] object-cover"
          />
          <img
            src="https://randomuser.me/api/portraits/women/44.jpg"
            alt="user"
            className="w-8 h-8 rounded-full border-2 border-[#181824] object-cover"
          />
          <img
            src="https://randomuser.me/api/portraits/men/54.jpg"
            alt="user"
            className="w-8 h-8 rounded-full border-2 border-[#181824] object-cover"
          />
          <img
            src="https://randomuser.me/api/portraits/women/68.jpg"
            alt="user"
            className="w-8 h-8 rounded-full border-2 border-[#181824] object-cover"
          />
        </div>
      </div>
    </div>
  );
};
 
export { SignIn1 };
