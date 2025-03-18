import React from 'react';

const SiteMap: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container">
        <h2 className="text-3xl font-bold mb-8 text-center">Site Map</h2>
        
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-4">Main Sections</h3>
          
          <ul className="space-y-6">
            <li>
              <div className="font-bold text-primary mb-2">Home / Landing Page</div>
              <ul className="list-disc pl-8 space-y-2 text-gray-700">
                <li>Hero Section with CTA</li>
                <li>Contact Form</li>
                <li>Testimonials</li>
                <li>Types of Accidents</li>
                <li>Urgency Section</li>
                <li>Footer with Contact Info</li>
              </ul>
            </li>
            
            <li>
              <div className="font-bold text-primary mb-2">About Us (Future Page)</div>
              <ul className="list-disc pl-8 space-y-2 text-gray-700">
                <li>Our Legal Team</li>
                <li>Experience & Expertise</li>
                <li>Texas Locations Served</li>
                <li>Our Approach</li>
              </ul>
            </li>
            
            <li>
              <div className="font-bold text-primary mb-2">Oil Field Accidents (Future Page)</div>
              <ul className="list-disc pl-8 space-y-2 text-gray-700">
                <li>Explosions & Fires</li>
                <li>Equipment Failures</li>
                <li>Toxic Chemical Exposure</li>
                <li>Falls from Heights</li>
                <li>Vehicle Accidents</li>
                <li>Drilling & Fracking Injuries</li>
              </ul>
            </li>
            
            <li>
              <div className="font-bold text-primary mb-2">Legal Resources (Future Page)</div>
              <ul className="list-disc pl-8 space-y-2 text-gray-700">
                <li>Oil Field Laws in Texas</li>
                <li>Worker Rights</li>
                <li>Compensation Types</li>
                <li>Legal Process</li>
                <li>FAQ</li>
              </ul>
            </li>
            
            <li>
              <div className="font-bold text-primary mb-2">Contact (Future Page)</div>
              <ul className="list-disc pl-8 space-y-2 text-gray-700">
                <li>Extended Contact Form</li>
                <li>Office Locations</li>
                <li>Phone & Email</li>
                <li>Live Chat</li>
              </ul>
            </li>
            
            <li>
              <div className="font-bold text-primary mb-2">Case Results (Future Page)</div>
              <ul className="list-disc pl-8 space-y-2 text-gray-700">
                <li>Success Stories</li>
                <li>Settlement Amounts</li>
                <li>Client Testimonials</li>
                <li>Case Studies</li>
              </ul>
            </li>
          </ul>
          
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-xl font-bold mb-4">Legal Pages</h3>
            <ul className="grid grid-cols-2 gap-2 text-gray-700">
              <li><a href="#" className="hover:text-primary">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary">Terms of Service</a></li>
              <li><a href="#" className="hover:text-primary">Disclaimer</a></li>
              <li><a href="#" className="hover:text-primary">Accessibility</a></li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SiteMap; 