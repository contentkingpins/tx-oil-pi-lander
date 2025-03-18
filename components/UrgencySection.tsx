import React from 'react';

const UrgencySection: React.FC = () => {
  return (
    <section className="py-16 bg-secondary text-white">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-accent inline-block px-4 py-2 text-white font-bold rounded mb-6">
            URGENT: Time-Sensitive Legal Notice
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Time is Limited – Texas Law Has Strict Deadlines!
          </h2>
          
          <p className="text-xl mb-8">
            In Texas, you have a limited time to file an oil field injury claim. Every day you wait:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-black bg-opacity-30 p-6 rounded-lg">
              <div className="text-4xl mb-2">⚠️</div>
              <h3 className="text-xl font-bold mb-2">Evidence Disappears</h3>
              <p>Critical evidence can be lost, destroyed, or altered if you delay taking action.</p>
            </div>
            
            <div className="bg-black bg-opacity-30 p-6 rounded-lg">
              <div className="text-4xl mb-2">⏱️</div>
              <h3 className="text-xl font-bold mb-2">Statute of Limitations</h3>
              <p>Missing the filing deadline means permanently losing your right to compensation.</p>
            </div>
            
            <div className="bg-black bg-opacity-30 p-6 rounded-lg">
              <div className="text-4xl mb-2">💰</div>
              <h3 className="text-xl font-bold mb-2">Reduced Settlement</h3>
              <p>Delays can weaken your case and potentially lower the compensation you receive.</p>
            </div>
          </div>
          
          <div className="bg-black bg-opacity-20 p-8 rounded-lg mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mr-4">
                <span className="text-2xl">🔔</span>
              </div>
              <h3 className="text-2xl font-bold">Don't Wait Until It's Too Late!</h3>
            </div>
            <p className="text-lg mb-6">
              The oil companies have teams of lawyers already building their defense. 
              Level the playing field by getting your own legal team working for YOU immediately.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href="#contact-form" 
                className="btn-primary text-lg font-bold w-full sm:w-auto"
              >
                Get Your Free Consultation
              </a>
              <a 
                href="tel:+18005551234" 
                className="btn-accent text-lg font-bold w-full sm:w-auto"
              >
                📞 Call (800) 555-1234 Now
              </a>
            </div>
          </div>
          
          <p className="text-lg italic">
            Remember: Consultations are FREE and we only get paid if YOU win. There's absolutely NO RISK to you.
          </p>
        </div>
      </div>
    </section>
  );
};

export default UrgencySection; 