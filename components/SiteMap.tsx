import React from 'react';

const SiteMap: React.FC = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Texas Oil Field Injuries</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-primary">Oil Rig Accidents</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary">Pipeline Explosions</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary">Chemical Exposure</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary">Equipment Failures</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary">Truck Accidents</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary">Fracking Accidents</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Legal Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-primary">Free Case Evaluation</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary">Workers' Compensation</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary">Third-Party Claims</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary">Wrongful Death</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary">FAQs</a></li>
              <li><a href="/photo-manager" className="text-gray-600 hover:text-primary">Photo Manager</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Oil Field Locations</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-primary">Permian Basin</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary">Eagle Ford Shale</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary">Barnett Shale</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary">Haynesville/Bossier Shale</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary">Granite Wash</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">About Our Firm</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-primary">Our Attorneys</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary">Case Results</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary">Testimonials</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary">Blog</a></li>
              <li><a href="#contact-form" className="text-gray-600 hover:text-primary">Contact Us</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SiteMap; 