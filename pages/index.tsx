import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import HeroSection from '../components/HeroSection';
import ContactForm from '../components/ContactForm';
import Testimonials from '../components/Testimonials';
import AccidentTypes from '../components/AccidentTypes';
import UrgencySection from '../components/UrgencySection';
import SiteMap from '../components/SiteMap';
import Footer from '../components/Footer';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Texas Oil Field Accident Claims – Get the Compensation You Deserve!</title>
        <meta name="description" content="Injured in a Texas oil field accident? Our expert legal team fights for injured workers to get the compensation they deserve. No upfront costs, just results." />
      </Head>

      <main>
        {/* Hero Section */}
        <HeroSection />
        
        {/* Contact Form */}
        <section id="contact-form" className="py-12 bg-white">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="md:pr-8">
                <h2 className="text-3xl md:text-4xl mb-6">You Have Rights – We Can Help!</h2>
                <p className="text-lg mb-6">
                  Workplace injuries in Texas oil fields can be life-altering. Our expert legal team fights for injured workers to get the compensation they deserve. No upfront costs, just results.
                </p>
                <div className="bg-gray-100 p-6 rounded-lg mb-6">
                  <h3 className="text-xl font-bold mb-4">Why Choose Us?</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-primary text-xl mr-2">✅</span>
                      <span>Max Settlements for Injured Workers</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary text-xl mr-2">✅</span>
                      <span>No Win, No Fee Guarantee</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary text-xl mr-2">✅</span>
                      <span>Texas-Based Attorneys Who Know Oil Field Law</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary text-xl mr-2">✅</span>
                      <span>Available 24/7 – Call Now</span>
                    </li>
                  </ul>
                </div>
                <a href="tel:+18005551234" className="btn-primary block md:inline-block text-center mb-4">
                  📞 Call Now: (800) 555-1234
                </a>
              </div>
              <ContactForm />
            </div>
          </div>
        </section>
        
        {/* Testimonials */}
        <Testimonials />
        
        {/* Accident Types */}
        <AccidentTypes />
        
        {/* Urgency Section */}
        <UrgencySection />
        
        {/* Site Map */}
        <SiteMap />
      </main>

      <Footer />
    </div>
  );
};

export default Home; 