import React from 'react';
import Image from 'next/image';

const HeroSection: React.FC = () => {
  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-full">
          {/* This would be replaced with an actual image in production */}
          <div className="absolute inset-0 bg-secondary opacity-60"></div>
          <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1586423702505-b13505519074')] bg-cover bg-center"></div>
        </div>
      </div>

      {/* Hero Content */}
      <div className="container relative z-10 text-white text-center px-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
          Injured in an Oil Field Accident?<br />
          <span className="text-primary">You Have Rights – We Can Help!</span>
        </h1>
        
        <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8">
          Workplace injuries in Texas oil fields can be life-altering. Our expert legal team fights for injured workers to get the compensation they deserve.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <a 
            href="#contact-form" 
            className="btn-primary text-xl w-full sm:w-auto"
          >
            Get a Free Case Review
          </a>
          
          <a 
            href="tel:+18005551234" 
            className="btn-accent text-xl w-full sm:w-auto"
          >
            📞 Call Now
          </a>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-lg font-semibold max-w-4xl mx-auto">
          <div className="bg-black bg-opacity-50 p-4 rounded-lg">
            <span className="text-primary text-xl block mb-1">✅</span>
            Max Settlements
          </div>
          <div className="bg-black bg-opacity-50 p-4 rounded-lg">
            <span className="text-primary text-xl block mb-1">✅</span>
            No Win, No Fee
          </div>
          <div className="bg-black bg-opacity-50 p-4 rounded-lg">
            <span className="text-primary text-xl block mb-1">✅</span>
            Texas-Based Attorneys
          </div>
          <div className="bg-black bg-opacity-50 p-4 rounded-lg">
            <span className="text-primary text-xl block mb-1">✅</span>
            Available 24/7
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 