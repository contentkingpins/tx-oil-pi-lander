import React from 'react';

const accidentTypes = [
  {
    id: 1,
    title: 'Explosions & Fires',
    icon: '🔥',
    description: 'Oil field explosions and fires can cause severe burns, lung damage, and traumatic injuries. We help victims get compensation for medical bills, lost wages, and pain and suffering.'
  },
  {
    id: 2,
    title: 'Equipment Failures',
    icon: '⚙️',
    description: 'Defective or improperly maintained equipment can lead to crushing injuries, amputations, and other serious trauma. Our team investigates to hold manufacturers and employers accountable.'
  },
  {
    id: 3,
    title: 'Toxic Chemical Exposure',
    icon: '☠️',
    description: 'Exposure to hydrogen sulfide, silica, benzene, and other chemicals can cause respiratory issues, cancer, and neurological damage. We fight for long-term care compensation.'
  },
  {
    id: 4,
    title: 'Falls from Heights',
    icon: '🏗',
    description: 'Oil derricks, platforms, and other structures pose serious fall hazards. These accidents often result in spinal injuries, fractures, and traumatic brain injuries requiring extensive care.'
  },
  {
    id: 5,
    title: 'Vehicle Accidents',
    icon: '🚛',
    description: 'Transportation incidents are a leading cause of oil field fatalities. Whether involving trucks, heavy machinery, or service vehicles, we help victims recover damages.'
  },
  {
    id: 6,
    title: 'Drilling & Fracking Injuries',
    icon: '🛢',
    description: 'High-pressure equipment, rotating machinery, and other drilling hazards can cause catastrophic injuries. Our attorneys specialize in these complex claims.'
  }
];

const AccidentTypes: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">We Handle All Types of Oil Field Accidents</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our experienced legal team has successfully represented clients in all types of oil field accident cases across Texas.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {accidentTypes.map((type) => (
            <div 
              key={type.id} 
              className="bg-gray-50 p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-4xl mb-4">{type.icon}</div>
              <h3 className="text-xl font-bold mb-3">{type.title}</h3>
              <p className="text-gray-700">{type.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-lg mb-6 max-w-3xl mx-auto">
            Don't see your specific accident type listed? Contact us anyway – our team handles all oil field injury cases. We'll fight for your rights no matter how the injury occurred.
          </p>
          <a 
            href="#contact-form" 
            className="btn-primary text-lg inline-block"
          >
            Discuss Your Case – Free Consultation
          </a>
        </div>
      </div>
    </section>
  );
};

export default AccidentTypes; 