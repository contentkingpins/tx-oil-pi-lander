import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

type FormInputs = {
  name: string;
  phone: string;
  email: string;
  injuryDate: string;
  description: string;
};

const ContactForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>();
  
  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    console.log(data);
    // This would be replaced with actual form submission logic
    alert('Thank you! Your case information has been submitted. An attorney will contact you shortly.');
  };

  return (
    <div className="card shadow-soft-xl p-6 md:p-8 border-t-4 border-t-primary animate-fade-in">
      <div className="mb-6">
        <h3 className="heading-sm mb-3 text-center">Start Your Free Case Evaluation</h3>
        <p className="text-center text-gray-600">
          Fill out the form below and our legal team will contact you within 24 hours.
        </p>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label htmlFor="name" className="block mb-1.5 font-medium text-gray-700">
            Full Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              id="name"
              type="text"
              placeholder="John Doe"
              className={`form-input pl-10 ${errors.name ? 'border-red-500 focus:ring-red-500' : ''}`}
              {...register('name', { required: 'Name is required' })}
            />
          </div>
          {errors.name && <p className="mt-1.5 text-sm text-red-600">{errors.name.message}</p>}
        </div>
        
        <div>
          <label htmlFor="phone" className="block mb-1.5 font-medium text-gray-700">
            Phone Number
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
            </div>
            <input
              id="phone"
              type="tel"
              placeholder="(123) 456-7890"
              className={`form-input pl-10 ${errors.phone ? 'border-red-500 focus:ring-red-500' : ''}`}
              {...register('phone', { 
                required: 'Phone number is required',
                pattern: {
                  value: /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
                  message: 'Please enter a valid phone number'
                }
              })}
            />
          </div>
          {errors.phone && <p className="mt-1.5 text-sm text-red-600">{errors.phone.message}</p>}
        </div>
        
        <div>
          <label htmlFor="email" className="block mb-1.5 font-medium text-gray-700">
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
            </div>
            <input
              id="email"
              type="email"
              placeholder="john@example.com"
              className={`form-input pl-10 ${errors.email ? 'border-red-500 focus:ring-red-500' : ''}`}
              {...register('email', { 
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Please enter a valid email address'
                }
              })}
            />
          </div>
          {errors.email && <p className="mt-1.5 text-sm text-red-600">{errors.email.message}</p>}
        </div>
        
        <div>
          <label htmlFor="injuryDate" className="block mb-1.5 font-medium text-gray-700">
            Date of Injury
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              id="injuryDate"
              type="date"
              className={`form-input pl-10 ${errors.injuryDate ? 'border-red-500 focus:ring-red-500' : ''}`}
              {...register('injuryDate', { required: 'Date of injury is required' })}
            />
          </div>
          {errors.injuryDate && <p className="mt-1.5 text-sm text-red-600">{errors.injuryDate.message}</p>}
        </div>
        
        <div>
          <label htmlFor="description" className="block mb-1.5 font-medium text-gray-700">
            Brief Description of Accident
          </label>
          <textarea
            id="description"
            rows={4}
            className={`form-input ${errors.description ? 'border-red-500 focus:ring-red-500' : ''}`}
            placeholder="Please describe how the accident occurred..."
            {...register('description', { required: 'Description is required' })}
          ></textarea>
          {errors.description && <p className="mt-1.5 text-sm text-red-600">{errors.description.message}</p>}
        </div>
        
        <div className="pt-2">
          <button 
            type="submit" 
            className="w-full btn-accent text-lg font-bold py-4 flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Submit Your Case
          </button>
        </div>
        
        <div className="pt-2">
          <p className="text-sm text-center text-gray-600">
            By submitting, you agree to our <a href="#" className="text-primary hover:underline font-medium">Privacy Policy</a> and <a href="#" className="text-primary hover:underline font-medium">Terms of Service</a>.
          </p>
          <p className="text-sm text-center text-gray-500 mt-2">
            <span className="inline-flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              Your information is secure and encrypted
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default ContactForm; 