import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-bold mb-4">Texas Oil Field Accident Claims</h3>
            <p className="mb-4 text-gray-300">
              Dedicated to fighting for the rights of injured oil field workers throughout Texas.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-primary">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12.07c0-5.52-4.48-10-10-10s-10 4.48-10 10c0 4.96 3.66 9.07 8.44 9.83v-6.95H7.9v-2.88h2.54V9.85c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.88h-2.33v6.95c4.78-.76 8.44-4.87 8.44-9.83z"></path>
                </svg>
              </a>
              <a href="#" className="text-gray-300 hover:text-primary">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2zM7.5 8h-1a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.5-.5zM7 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm8 4c-.79 0-1.5.45-1.83 1.17L13 11V8.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-3.9l.16.09c.23.14.64.41 1.3.41 1.52 0 2.54-1.2 2.54-2.7S16.52 10 15 10z"></path>
                </svg>
              </a>
              <a href="#" className="text-gray-300 hover:text-primary">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Info</h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start">
                <span className="mr-2">📍</span>
                <span>123 Legal Avenue, Houston, TX 77002</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">📞</span>
                <a href="tel:+18005551234" className="hover:text-primary">(800) 555-1234</a>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✉️</span>
                <a href="mailto:help@texasoilinjury.com" className="hover:text-primary">help@texasoilinjury.com</a>
              </li>
              <li className="flex items-start">
                <span className="mr-2">⏰</span>
                <span>Available 24/7</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Practice Areas</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-primary">Oil Field Accidents</a></li>
              <li><a href="#" className="hover:text-primary">Worksite Injuries</a></li>
              <li><a href="#" className="hover:text-primary">Equipment Failures</a></li>
              <li><a href="#" className="hover:text-primary">Wrongful Death</a></li>
              <li><a href="#" className="hover:text-primary">Chemical Exposure</a></li>
              <li><a href="#" className="hover:text-primary">Oilfield Transportation</a></li>
              <li><a href="/photo-manager" className="hover:text-primary">Photo Manager</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Action</h3>
            <a 
              href="#contact-form" 
              className="btn-primary block text-center mb-4"
            >
              Free Case Evaluation
            </a>
            <a 
              href="tel:+18005551234" 
              className="btn-accent block text-center mb-4"
            >
              Call Now
            </a>
            <p className="text-gray-300 text-sm">
              We serve all major oil-producing areas in Texas including Midland, Odessa, Permian Basin, Eagle Ford Shale, and the Gulf Coast.
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="text-sm text-gray-400">
              <p>&copy; {currentYear} Texas Oil Field Accident Claims. All rights reserved.</p>
              <p>Attorney Advertising. Past results do not guarantee future outcomes.</p>
            </div>
            <div className="text-sm text-gray-400 md:text-right">
              <a href="#" className="mr-4 hover:text-primary">Privacy Policy</a>
              <a href="#" className="mr-4 hover:text-primary">Terms of Service</a>
              <a href="#" className="hover:text-primary">Sitemap</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 