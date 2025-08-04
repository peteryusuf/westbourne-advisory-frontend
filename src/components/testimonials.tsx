"use client";

import { useEffect, useState } from 'react';
import { Star, Quote } from 'lucide-react';
import { strapiAPI, Testimonial } from '@/lib/api';

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await strapiAPI.getTestimonials(true);
        setTestimonials(response.data || []);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
        // Fallback to default testimonials if API fails - Intended Parents only
        setTestimonials([
          {
            id: 1,
            attributes: {
              name: "Sarah & James",
              role: "Intended Parents, London",
              quote: "Westbourne Advisory made the complex legal process feel manageable and stress-free. Their expertise and compassionate support were invaluable throughout our entire surrogacy journey. We couldn't have done it without them.",
              rating: 5,
              featured: true,
              location: "London",
              avatar: {
                data: {
                  attributes: {
                    url: "",
                    alternativeText: "Sarah & James"
                  }
                }
              }
            }
          },
          {
            id: 2,
            attributes: {
              name: "Michael & Lisa",
              role: "Intended Parents, Birmingham", 
              quote: "The professionalism and attention to detail provided by Westbourne Advisory gave us complete confidence throughout the process. They truly understand the unique needs of intended parents.",
              rating: 5,
              featured: true,
              location: "Birmingham",
              avatar: {
                data: {
                  attributes: {
                    url: "",
                    alternativeText: "Michael & Lisa"
                  }
                }
              }
            }
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  if (loading) {
    return (
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold text-gray-900 font-heading">What Our Clients Say</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Don&apos;t just take our word for it. Here&apos;s what intended parents say about their experience with Westbourne Advisory.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[1, 2].map((i) => (
              <div key={i} className="bg-black bg-opacity-20 backdrop-blur-sm rounded-2xl shadow-lg p-8 animate-pulse">
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-32"></div>
                      <div className="h-3 bg-gray-200 rounded w-24"></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="w-5 h-5 bg-gray-200 rounded"></div>
                    ))}
                  </div>
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
          <h2 className="text-4xl font-bold text-white font-heading">What Our Clients Say</h2>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Don&apos;t just take our word for it. Here&apos;s what intended parents say about their experience with Westbourne Advisory.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-black bg-opacity-20 backdrop-blur-sm rounded-2xl shadow-lg p-8 relative border border-white border-opacity-20">
              {/* Quote icon */}
              <div className="absolute top-6 right-6 text-gray-300">
                <Quote className="w-12 h-12" />
              </div>

              <div className="space-y-6">
                {/* Avatar and name */}
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 ${testimonial.attributes.avatar?.data ? 'bg-cover bg-center' : 'bg-gray-800'} rounded-full flex items-center justify-center text-white font-semibold`}
                       style={testimonial.attributes.avatar?.data ? {
                         backgroundImage: `url(${process.env.NEXT_PUBLIC_STRAPI_URL}${testimonial.attributes.avatar.data.attributes.url})`
                       } : {}}>
                    {!testimonial.attributes.avatar?.data && testimonial.attributes.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.attributes.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.attributes.role}</div>
                  </div>
                </div>

                {/* Quote */}
                <p className="text-gray-600 leading-relaxed text-lg">
                  &ldquo;{testimonial.attributes.quote}&rdquo;
                </p>

                {/* Star rating */}
                <div className="flex space-x-1">
                  {[...Array(testimonial.attributes.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 