import React from 'react';

const testimonials = [
  {
    id: 1,
    quote: "After my accident at the oil rig, I didn't know if I'd ever work again. Their team fought for me and got me a $1.2M settlement that changed my life.",
    name: "Michael R.",
    location: "Midland, TX",
    image: "/images/oil-field-accidents/shutterstock_2299764821.jpg"
  },
  {
    id: 2,
    quote: "When the company tried to blame me for the equipment failure, these attorneys stepped in and proved it wasn't my fault. Got me the compensation I deserved.",
    name: "Robert J.",
    location: "Houston, TX",
    image: "/images/oil-field-accidents/shutterstock_1674620563.jpg"
  },
  {
    id: 3,
    quote: "After my chemical exposure injury, medical bills were piling up. They took my case on a no-win, no-fee basis and won me enough to cover all my treatments.",
    name: "James L.",
    location: "Odessa, TX",
    image: "/images/oil-field-accidents/shutterstock_2233075297.jpg"
  },
  {
    id: 4,
    quote: "My family was worried about how we'd make ends meet after my drilling accident. This firm took care of everything so I could focus on healing.",
    name: "Carlos M.",
    location: "San Antonio, TX",
    image: "/images/oil-field-accidents/shutterstock_312884789.jpg"
  },
  {
    id: 5,
    quote: "After 15 years on oil rigs, I never thought I'd be injured. When it happened, this team was by my side from day one and fought for my rights.",
    name: "David W.",
    location: "Dallas, TX",
    image: "/images/oil-field-accidents/shutterstock_2299764821.jpg"
  }
];

const Testimonials: React.FC = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Real Results for Texas Oil Field Workers</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See what our clients say about their experience working with our dedicated legal team.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.slice(0, 3).map((testimonial) => (
            <div 
              key={testimonial.id} 
              className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
            >
              <div className="mb-4 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full overflow-hidden relative mr-4">
                  <div
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${testimonial.image})` }}
                  ></div>
                </div>
                <div>
                  <p className="font-bold text-lg">{testimonial.name}</p>
                  <p className="text-gray-600">{testimonial.location}</p>
                </div>
              </div>
              
              <div className="text-center">
                <p className="italic text-lg mb-4">&ldquo;{testimonial.quote}&rdquo;</p>
                <div className="flex justify-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 flex flex-col items-center">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-6 max-w-2xl w-full">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <img 
                  src="https://img.icons8.com/color/48/000000/verified-badge.png"
                  alt="Verified"
                  className="w-8 h-8 mr-2"
                />
                <span className="font-bold text-xl">Our Track Record</span>
              </div>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 text-center mb-4">
              <div>
                <p className="text-3xl font-bold text-primary">1,000+</p>
                <p className="text-gray-600">Clients Helped</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary">$100M+</p>
                <p className="text-gray-600">Recovered</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary">97%</p>
                <p className="text-gray-600">Success Rate</p>
              </div>
            </div>
            
            <div className="flex justify-center">
              <a href="#contact-form" className="btn-primary">Get Your Free Consultation</a>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6">
            <img src="https://img.icons8.com/color/48/000000/bbb.png" alt="BBB Accredited" className="h-12" />
            <img src="https://img.icons8.com/color/48/000000/super-lawyer.png" alt="Super Lawyers" className="h-12" />
            <img src="https://img.icons8.com/color/48/000000/lawyer.png" alt="Texas Bar Association" className="h-12" />
            <img src="https://img.icons8.com/color/48/000000/scales.png" alt="Legal Excellence" className="h-12" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials; 