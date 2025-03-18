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
    <div className="bg-white p-6 rounded-lg shadow-xl border border-gray-200">
      <h3 className="text-2xl font-bold mb-4 text-center">Start Your Free Case Evaluation</h3>
      <p className="mb-6 text-center text-gray-600">Fill out the form below and our legal team will contact you ASAP.</p>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="name" className="block mb-1 font-medium">Full Name</label>
          <input
            id="name"
            type="text"
            placeholder="John Doe"
            className={`form-input ${errors.name ? 'border-red-500' : ''}`}
            {...register('name', { required: 'Name is required' })}
          />
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
        </div>
        
        <div className="mb-4">
          <label htmlFor="phone" className="block mb-1 font-medium">Phone Number</label>
          <input
            id="phone"
            type="tel"
            placeholder="(123) 456-7890"
            className={`form-input ${errors.phone ? 'border-red-500' : ''}`}
            {...register('phone', { 
              required: 'Phone number is required',
              pattern: {
                value: /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
                message: 'Please enter a valid phone number'
              }
            })}
          />
          {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
        </div>
        
        <div className="mb-4">
          <label htmlFor="email" className="block mb-1 font-medium">Email Address</label>
          <input
            id="email"
            type="email"
            placeholder="john@example.com"
            className={`form-input ${errors.email ? 'border-red-500' : ''}`}
            {...register('email', { 
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Please enter a valid email address'
              }
            })}
          />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
        </div>
        
        <div className="mb-4">
          <label htmlFor="injuryDate" className="block mb-1 font-medium">Date of Injury</label>
          <input
            id="injuryDate"
            type="date"
            className={`form-input ${errors.injuryDate ? 'border-red-500' : ''}`}
            {...register('injuryDate', { required: 'Date of injury is required' })}
          />
          {errors.injuryDate && <p className="mt-1 text-sm text-red-600">{errors.injuryDate.message}</p>}
        </div>
        
        <div className="mb-6">
          <label htmlFor="description" className="block mb-1 font-medium">Brief Description of Accident</label>
          <textarea
            id="description"
            rows={4}
            className={`form-input ${errors.description ? 'border-red-500' : ''}`}
            placeholder="Please describe how the accident occurred..."
            {...register('description', { required: 'Description is required' })}
          ></textarea>
          {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>}
        </div>
        
        <button 
          type="submit" 
          className="w-full btn-accent text-lg font-bold py-4"
        >
          Submit Your Case
        </button>
        
        <p className="mt-4 text-sm text-center text-gray-600">
          By submitting, you agree to our <a href="#" className="text-primary underline">Privacy Policy</a> and <a href="#" className="text-primary underline">Terms of Service</a>.
        </p>
      </form>
    </div>
  );
};

export default ContactForm; 