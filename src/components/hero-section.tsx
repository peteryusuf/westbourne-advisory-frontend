"use client";

import { ArrowRight, MessageCircle, Check, Shield, Star, Users, Clock, Heart } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background overlay - subtle */}
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Main content */}
          <div className="space-y-8">
            {/* Main headline */}
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight font-heading">
                Guiding You Through Every Step of Your{' '}
                <span className="text-gray-200">
                  Surrogacy Legal Journey
                </span>
              </h1>
              <p className="text-xl text-gray-200 leading-relaxed max-w-2xl">
                Expert legal support for intended parents across the UK. 
                We make the complex simple, so you can focus on what matters most.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-900 font-semibold rounded-full hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl">
                Start Your Journey
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>
              <button className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:border-gray-200 hover:bg-white hover:text-gray-900 transition-all duration-200">
                <MessageCircle className="mr-2 w-5 h-5" />
                Speak to Our Team
              </button>
            </div>

            {/* Trust indicators - simplified */}
            <div className="flex flex-wrap gap-6 pt-4">
              <div className="flex items-center space-x-2">
                <Heart className="w-5 h-5 text-gray-300" />
                <span className="text-sm font-medium text-gray-300">Expert Legal Support</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-gray-300" />
                <span className="text-sm font-medium text-gray-300">Personalized Service</span>
              </div>
            </div>
          </div>

          {/* Right side - Building Families photo */}
          <div className="flex justify-center lg:justify-end">
            <div className="bg-black bg-opacity-20 backdrop-blur-sm rounded-2xl shadow-xl p-8 max-w-md w-full border border-white border-opacity-20">
              <div className="text-center space-y-6">
                {/* Family photo placeholder - replace with actual photo */}
                <div className="w-full h-48 bg-gray-200 rounded-xl flex items-center justify-center">
                  <Heart className="w-16 h-16 text-gray-400" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-white font-heading">Building Families</h3>
                  <p className="text-gray-200 leading-relaxed">
                    We've helped families navigate their surrogacy journey with confidence and peace of mind.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 