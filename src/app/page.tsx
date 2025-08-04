import { VideoBackgroundSimple } from '@/components/video-background-simple';
import { NavigationBar } from '@/components/navigation-bar';
import HowItWorks from '@/components/how-it-works';
import Testimonials from '@/components/testimonials';
import FAQSection from '@/components/faq-section';
import ContactSection from '@/components/contact-section';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <>
      {/* Simple Video Background Throughout */}
      <VideoBackgroundSimple />
      
      {/* Navigation Bar */}
      <NavigationBar />
      
      {/* All content with proper z-index */}
      <main className="relative z-20">
        {/* Hero Section */}
        <section 
          id="hero"
          data-section="hero"
          className="flex items-center justify-center min-h-screen px-4 py-20"
        >
          <div 
            className="text-center p-12 rounded-2xl max-w-4xl border border-white border-opacity-20"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)'
            }}
          >
            <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 font-heading">
              Guiding You Through Every Step of Your{' '}
              <span className="text-gray-200">Surrogacy Legal Journey</span>
            </h1>
            <p className="text-xl text-gray-200 leading-relaxed mb-8 max-w-2xl mx-auto">
              Expert legal support for intended parents across the UK. 
              We make the complex simple, so you can focus on what matters most.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/start-journey" className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-900 font-semibold rounded-full hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl">
                Start Your Journey
              </a>
              <a href="#contact" className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:border-gray-200 hover:bg-white hover:text-gray-900 transition-all duration-200">
                Speak to Our Team
              </a>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" data-section="how-it-works">
          <HowItWorks />
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" data-section="testimonials">
          <Testimonials />
        </section>

        {/* FAQ Section */}
        <section id="faq" data-section="faq">
          <FAQSection />
        </section>

        {/* Contact Section */}
        <section id="contact" data-section="contact">
          <ContactSection />
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
