"use client";

import { ArrowRight, Check } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      number: "1",
      title: "Tell us your story",
      description: "Share your journey and goals with our experienced legal team in a confidential consultation. We'll listen, understand, and plan.",
      link: "Free Consultation",
      color: "from-gray-600 to-gray-800"
    },
    {
      number: "2", 
      title: "We prepare your legal roadmap",
      description: "Our experts create a comprehensive plan tailored to your specific situation, covering all legal requirements and timelines.",
      link: "Personalized Plan",
      color: "from-gray-700 to-gray-900"
    },
    {
      number: "3",
      title: "You move forward with confidence", 
      description: "We guide you through each legal step, ensuring a smooth journey to parenthood with ongoing support and expertise.",
      link: "Ongoing Support",
      color: "from-gray-800 to-black"
    }
  ];

  return (
    <section className="py-32">
      <div className="container mx-auto px-4">
        <div 
          className="text-center p-12 rounded-2xl max-w-4xl mx-auto mb-16 border border-white border-opacity-20"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)'
          }}
        >
          <h2 className="text-4xl font-bold text-white font-heading mb-6">How It Works</h2>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Our proven three-step process has helped families navigate the legal aspects of surrogacy with confidence and clarity.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="text-center space-y-6 p-8 rounded-2xl border border-white border-opacity-20"
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)'
              }}
            >
              {/* Number circle */}
              <div className={`w-20 h-20 bg-gradient-to-br ${step.color} rounded-full flex items-center justify-center mx-auto shadow-lg`}>
                <span className="text-2xl font-bold text-white">{step.number}</span>
              </div>

              {/* Content */}
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-white font-heading">{step.title}</h3>
                <p className="text-gray-200 leading-relaxed">
                  {step.description}
                </p>
                <div className="pt-4">
                  <a 
                    href="#" 
                    className="inline-flex items-center text-gray-300 hover:text-white font-medium transition-colors"
                  >
                    {step.link}
                    {index < 2 ? (
                      <ArrowRight className="ml-2 w-4 h-4" />
                    ) : (
                      <Check className="ml-2 w-4 h-4" />
                    )}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 