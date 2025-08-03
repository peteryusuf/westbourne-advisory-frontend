"use client";

import { Send } from 'lucide-react';

export default function ContactSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl font-bold text-white font-heading">Start Your Journey Today</h2>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Get in touch with our expert legal team to discuss your surrogacy journey. We're here to guide you every step of the way.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-black bg-opacity-20 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white border-opacity-20">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Enter your email address"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-white mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter your phone number"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-white mb-2">
                  Tell us about your situation
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                  placeholder="Share your story and what you're looking for..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-4 px-8 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center"
              >
                <Send className="mr-2 w-5 h-5" />
                Send Message
              </button>
            </form>

            <p className="text-sm text-gray-500 text-center mt-6">
              We'll get back to you within 24 hours. All consultations are confidential.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
} 