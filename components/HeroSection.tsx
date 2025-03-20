import React from 'react';
import Image from 'next/image';

const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-full">
          <div className="absolute inset-0 bg-gradient-to-b from-secondary/80 to-secondary/60 backdrop-blur-sm"></div>
          <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1586423702505-b13505519074')] bg-cover bg-center"></div>
        </div>
      </div>

      {/* Hero Content */}
      <div className="container relative z-10 text-white py-16">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <div className="inline-block mb-4 md:mb-6">
            <span className="badge-accent py-2 px-4 text-base md:text-lg">Texas Oil Field Injury Specialists</span>
          </div>
          
          <h1 className="heading-xl mb-6 md:mb-8">
            Injured in an Oil Field Accident?<br />
            <span className="text-primary">You Have Rights – We Can Help!</span>
          </h1>
          
          <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8 md:mb-10 opacity-90">
            Workplace injuries in Texas oil fields can be life-altering. Our expert legal team fights for injured workers to get the maximum compensation they deserve.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-12 md:mb-16 animate-slide-up">
            <a 
              href="#contact-form" 
              className="btn-primary text-lg md:text-xl w-full sm:w-auto gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              Get a Free Case Review
            </a>
            
            <a 
              href="tel:+18005551234" 
              className="btn-accent text-lg md:text-xl w-full sm:w-auto gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              Call Now (800) 555-1234
            </a>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-base md:text-lg font-medium max-w-4xl mx-auto">
            <div className="card bg-white/10 backdrop-blur-sm hover:bg-white/20 border-none text-white">
              <div className="text-primary text-xl mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <span>Max Settlements</span>
            </div>
            <div className="card bg-white/10 backdrop-blur-sm hover:bg-white/20 border-none text-white">
              <div className="text-primary text-xl mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <span>No Win, No Fee</span>
            </div>
            <div className="card bg-white/10 backdrop-blur-sm hover:bg-white/20 border-none text-white">
              <div className="text-primary text-xl mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <span>Texas-Based Attorneys</span>
            </div>
            <div className="card bg-white/10 backdrop-blur-sm hover:bg-white/20 border-none text-white">
              <div className="text-primary text-xl mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <span>Available 24/7</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 