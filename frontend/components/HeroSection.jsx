import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

/**
 * Hero Section Component
 * Premium landing section with company intro
 */
export default function HeroSection() {
  const [email, setEmail] = useState('');

  const handleNewsletterSignup = (e) => {
    e.preventDefault();
    console.log('Newsletter signup:', email);
    setEmail('');
  };

  return (
    <section className="relative w-full min-h-screen bg-gradient-to-br from-blue-900 via-slate-900 to-slate-800 overflow-hidden">
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl delay-4000"></div>
      </div>

      {/* Navigation Bar */}
      <nav className="relative z-50 flex items-center justify-between px-6 py-4 md:px-12 md:py-6">
        <div className="flex items-center gap-2">
          {/* Logo */}
          <div className="w-12 h-12 md:w-16 md:h-16 relative">
            <Image
              src="/logo.png"
              alt="MAI - SAJE LIMITED"
              width={64}
              height={64}
              priority
              className="object-contain"
            />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-white font-bold text-lg md:text-xl">MAI - SAJE</h1>
            <p className="text-yellow-400 text-xs md:text-sm">Premium Rice Solutions</p>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="hidden lg:flex items-center gap-8">
          <Link href="#about" className="text-white hover:text-yellow-400 transition">About</Link>
          <Link href="#products" className="text-white hover:text-yellow-400 transition">Products</Link>
          <Link href="#contact" className="text-white hover:text-yellow-400 transition">Contact</Link>
        </div>

        {/* CTA Buttons */}
        <div className="flex items-center gap-3">
          <Link href="/login" className="text-white hover:text-yellow-400 transition text-sm md:text-base">
            Login
          </Link>
          <Link href="/register" className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 font-bold px-4 md:px-6 py-2 rounded-lg transition text-sm md:text-base">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-100px)] px-6 md:px-12">
        <div className="grid md:grid-cols-2 gap-12 max-w-7xl w-full items-center">
          
          {/* Left Content */}
          <div className="text-white space-y-6">
            <div className="inline-block bg-yellow-500 bg-opacity-20 border border-yellow-500 rounded-full px-4 py-2">
              <p className="text-yellow-400 text-sm font-semibold">🌾 Welcome to Premium Rice Excellence</p>
            </div>

            <h2 className="text-4xl md:text-6xl font-bold leading-tight">
              Premium Nigerian Rice
              <span className="text-yellow-400 block">Delivered with Excellence</span>
            </h2>

            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
              Experience the finest quality rice from Nigeria's leading agricultural technology company. 
              From farm to table, we ensure quality, integrity, innovation, and excellence in every grain.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/shop" className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 font-bold px-8 py-4 rounded-lg transition text-center">
                Start Shopping
              </Link>
              <Link href="#about" className="border-2 border-yellow-500 text-yellow-400 hover:bg-yellow-500 hover:text-blue-900 font-bold px-8 py-4 rounded-lg transition text-center">
                Learn More
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-8">
              <div>
                <p className="text-3xl font-bold text-yellow-400">50K+</p>
                <p className="text-gray-400 text-sm">Happy Customers</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-yellow-400">15K+</p>
                <p className="text-gray-400 text-sm">Tons/Year</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-yellow-400">25+</p>
                <p className="text-gray-400 text-sm">Partner States</p>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="hidden md:flex items-center justify-center">
            <div className="relative w-full h-96 md:h-full rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/hero-rice.jpg"
                alt="Premium Rice Products"
                layout="fill"
                objectFit="cover"
                priority
                className="rounded-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900 via-transparent to-transparent"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className="relative z-10 border-t border-gray-700 px-6 md:px-12 py-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-white font-bold text-lg">Subscribe to Our Newsletter</h3>
            <p className="text-gray-400">Get updates on new products and exclusive offers</p>
          </div>
          <form onSubmit={handleNewsletterSignup} className="w-full md:w-auto flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="px-4 py-3 rounded-lg text-slate-900 flex-1 md:flex-none w-full md:w-64"
              required
            />
            <button
              type="submit"
              className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 font-bold px-6 py-3 rounded-lg transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="animate-bounce text-yellow-400">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
}
