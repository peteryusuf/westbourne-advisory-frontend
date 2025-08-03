"use client";

import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { strapiAPI, FAQ } from '@/lib/api';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const response = await strapiAPI.getFAQs();
        setFaqs(response.data || []);
      } catch (error) {
        console.error('Error fetching FAQs:', error);
        // Fallback to default FAQs if API fails
        setFaqs([
          {
            id: 1,
            attributes: {
              question: "What is the legal process for surrogacy in the UK?",
              answer: "The legal process for surrogacy in the UK involves several key steps: establishing a surrogacy agreement, obtaining parental orders, and ensuring all parties' rights are protected. We guide you through each step to ensure compliance with UK law.",
              category: "Legal Process",
              order: 1
            }
          },
          {
            id: 2,
            attributes: {
              question: "When should we start the legal process?",
              answer: "It's best to start the legal process early, ideally before conception. This allows time to properly establish agreements, understand your rights, and ensure all legal requirements are met before the baby is born.",
              category: "Timing",
              order: 2
            }
          },
          {
            id: 3,
            attributes: {
              question: "What are parental orders and why are they important?",
              answer: "Parental orders transfer legal parenthood from the surrogate to the intended parents. They're crucial because without them, the surrogate remains the legal parent, which can cause significant issues with decision-making and inheritance rights.",
              category: "Legal Requirements",
              order: 3
            }
          },
          {
            id: 4,
            attributes: {
              question: "How long does the legal process typically take?",
              answer: "The legal process typically takes 6-12 months from start to finish, depending on the complexity of your situation. We work efficiently to ensure your journey progresses smoothly while maintaining thorough legal compliance.",
              category: "Timing",
              order: 4
            }
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchFAQs();
  }, []);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (loading) {
    return (
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold text-gray-900">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get answers to the most common questions about surrogacy law in the UK.
            </p>
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="border border-gray-200 rounded-lg overflow-hidden animate-pulse">
                <div className="px-6 py-4 bg-white">
                  <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl font-bold text-gray-900">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get answers to the most common questions about surrogacy law in the UK.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div key={faq.id} className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left bg-white hover:bg-gray-50 transition-colors duration-200 flex items-center justify-between"
              >
                <span className="font-semibold text-gray-900 text-lg">
                  {faq.attributes.question}
                </span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4 bg-gray-50">
                  <p className="text-gray-600 leading-relaxed">
                    {faq.attributes.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 