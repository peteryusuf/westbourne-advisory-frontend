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
          },
          {
            id: 5,
            attributes: {
              question: "What costs are involved in surrogacy?",
              answer: "Surrogacy costs include legal fees, medical expenses, and reasonable expenses for the surrogate. Commercial surrogacy is prohibited in the UK, but surrogates can be reimbursed for legitimate expenses like medical care, maternity clothes, and lost earnings.",
              category: "Financial",
              order: 5
            }
          },
          {
            id: 6,
            attributes: {
              question: "Do we need separate legal representation?",
              answer: "Yes, it's essential that intended parents and surrogates have independent legal representation. This ensures both parties fully understand their rights and obligations, and helps prevent conflicts of interest.",
              category: "Legal Requirements",
              order: 6
            }
          },
          {
            id: 7,
            attributes: {
              question: "What happens if the surrogate changes her mind?",
              answer: "In the UK, the surrogate has the legal right to keep the baby until a parental order is granted. However, with proper legal agreements and counseling in place, this situation is extremely rare. We help manage these risks through comprehensive preparation.",
              category: "Legal Process",
              order: 7
            }
          },
          {
            id: 8,
            attributes: {
              question: "Can international surrogacy arrangements be recognized in the UK?",
              answer: "International surrogacy can be complex, with different countries having varying laws. UK courts can grant parental orders for children born abroad, but the process requires careful legal planning and compliance with both jurisdictions.",
              category: "International",
              order: 8
            }
          },
          {
            id: 9,
            attributes: {
              question: "What medical decisions can intended parents make during pregnancy?",
              answer: "During pregnancy, the surrogate retains the right to make medical decisions about her body and the pregnancy. However, surrogacy agreements can outline preferences and expectations, and good communication is essential throughout the process.",
              category: "Medical",
              order: 9
            }
          },
          {
            id: 10,
            attributes: {
              question: "How do we find a suitable surrogate?",
              answer: "Surrogates can be found through licensed agencies, support groups, or personal connections. We provide guidance on the legal requirements and help ensure any arrangements comply with UK law and protect all parties involved.",
              category: "Process",
              order: 10
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
          <h2 className="text-4xl font-bold text-white font-heading mb-6">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Get answers to the most common questions about surrogacy law in the UK.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={faq.id} 
              className="rounded-lg overflow-hidden border border-white border-opacity-20"
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)'
              }}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left hover:bg-black hover:bg-opacity-20 transition-colors duration-200 flex items-center justify-between"
              >
                <span className="font-semibold text-white text-lg">
                  {faq.attributes.question}
                </span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-gray-300" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-300" />
                )}
              </button>
              {openIndex === index && (
                <div 
                  className="px-6 pb-4"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)'
                  }}
                >
                  <p className="text-gray-200 leading-relaxed">
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