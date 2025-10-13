'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { Mail, Lock, Eye, EyeOff } from 'lucide-react'

const primaryColor = '#5FE089'
const cardBg = '#F4F4F4'

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center">
      {/* Left Side Login Card */}
      <div className="w-full md:flex-1 flex items-center justify-center h-[60vh] md:h-screen">
        <div className="bg-[#F4F4F4] px-6 py-8 md:px-20 rounded-2xl shadow-xl w-full max-w-[95vw] md:max-w-[600px] flex flex-col justify-between">
          {/* Logo */}
          <div>
            <div className="text-center mb-8">
              <Image
                src="/assets/Logo.png"
                alt="Logo"
                width={80}
                height={80}
                className="mx-auto mb-2 object-contain"
                priority
              />
              <h2
                className="text-2xl font-bold"
                style={{ color: primaryColor }}
              >
                Welcome Back
              </h2>
              <p className="text-gray-500 mt-2 mb-0">Login to your account</p>
            </div>
            {/* Login Form */}
            <form>
              <div className="mb-6">
                <label className="block mb-1 text-gray-800 font-medium">Email</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <Mail size={20} />
                  </span>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full pl-10 pr-3 py-3 rounded-lg border border-gray-300 outline-none text-base"
                  />
                </div>
              </div>
              <div className="mb-8">
                <label className="block mb-1 text-gray-800 font-medium">Password</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <Lock size={20} />
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-10 py-3 rounded-lg border border-gray-300 outline-none text-base"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                    tabIndex={-1}
                    onClick={() => setShowPassword((v) => !v)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-3 font-semibold text-lg rounded-lg"
                style={{
                  background: primaryColor,
                  color: '#fff',
                  boxShadow: '0 2px 8px rgba(95,224,137,0.15)'
                }}
              >
                Login
              </button>
            </form>
          </div>
          {/* Divider */}
          <div className="my-8 flex items-center">
            <div className="flex-grow h-px bg-gray-300" />
            <span className="mx-3 text-gray-400 text-sm">or</span>
            <div className="flex-grow h-px bg-gray-300" />
          </div>
          {/* Register Section */}
          <div className="text-center">
            <span className="text-gray-600 text-base">Not registered?</span>
            <a
              href="/register"
              className="ml-2 text-base font-semibold"
              style={{ color: primaryColor }}
            >
              Register first
            </a>
          </div>
        </div>
      </div>
      {/* Right Side Image */}
      <div className="relative w-full md:flex-1 h-[40vh] md:h-screen hidden md:block">
        <Image
          src="/images/image.webp"
          alt="Login Visual"
          fill
          className="object-cover w-full h-full"
          priority
        />
        <div
          className="absolute inset-0"
        
        />
      </div>
    </div>
  )
}

export default LoginPage
