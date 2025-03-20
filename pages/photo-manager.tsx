import React from 'react';
import Head from 'next/head';
import PhotoManager from '../components/PhotoManager';
import Footer from '../components/Footer';

const PhotoManagerPage: React.FC = () => {
  return (
    <div>
      <Head>
        <title>Photo Manager - Texas Oil Field Accident Claims</title>
        <meta name="description" content="Manage photos for Texas oil field accident claims - upload, categorize, and organize images for case documentation." />
      </Head>

      <div className="bg-neutral-50 min-h-screen">
        <header className="bg-secondary text-white py-4">
          <div className="container">
            <div className="flex justify-between items-center">
              <div>
                <a href="/" className="text-xl font-bold flex items-center">
                  <span className="text-primary mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </span>
                  Texas Oil Field Injury Lawyers
                </a>
              </div>
              <nav>
                <ul className="flex space-x-6">
                  <li><a href="/" className="hover:text-primary transition-colors">Home</a></li>
                  <li><a href="/#contact-form" className="btn-primary text-sm py-2">Get Help Now</a></li>
                </ul>
              </nav>
            </div>
          </div>
        </header>

        <main className="py-12">
          <div className="container">
            <div className="mb-8">
              <h1 className="heading-lg text-center mb-2">Texas Oil Field Accident Photo Manager</h1>
              <p className="text-center text-gray-600 max-w-3xl mx-auto">
                Upload and manage photos related to Texas oil field accidents for documentation and legal proceedings.
              </p>
            </div>
            
            <div className="max-w-6xl mx-auto">
              <PhotoManager />
            </div>
            
            <div className="mt-12 bg-white rounded-xl shadow-soft-md p-6 border border-gray-200 max-w-4xl mx-auto">
              <h2 className="heading-md mb-4">Why Document Oil Field Accidents?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-bold mb-2 text-primary">For Your Legal Claim</h3>
                  <p className="text-gray-700 mb-4">
                    Photographic evidence is crucial for establishing the facts of your accident case. 
                    Clear photos can show unsafe working conditions, equipment failures, and the extent of injuries.
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-gray-600">
                    <li>Document the accident scene before it changes</li>
                    <li>Show the equipment or machinery involved</li>
                    <li>Record any visible safety violations</li>
                    <li>Capture warning signs that were present (or missing)</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-primary">Types of Evidence to Collect</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-primary text-xl mr-2">✅</span>
                      <span>Wide shots of the entire accident scene</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary text-xl mr-2">✅</span>
                      <span>Close-ups of specific equipment failures</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary text-xl mr-2">✅</span>
                      <span>Photos of any safety hazards or violations</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary text-xl mr-2">✅</span>
                      <span>Documentation of personal protective equipment</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary text-xl mr-2">✅</span>
                      <span>Weather and environmental conditions</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default PhotoManagerPage; 