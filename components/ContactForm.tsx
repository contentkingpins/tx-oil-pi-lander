import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

type FormInputs = {
  // Contact Information (now step 3)
  name: string;
  phone: string;
  email: string;
  
  // Visible User-Facing Questions (now steps 1-2)
  whatHappened: string;
  whenAndWhere: {
    date: string;
    time: string;
    location: string;
  };
  safetyProtocols: string;
  injuries: string;
  documentation: FileList;
  jobRole: string;
  contactedByInsurance: string;
  
  // Hidden Logic-Based Questions
  isWithinTwoYears: boolean;
  injurySeverity: number;
  spokenWithLegal: boolean;
  hasEvidence: boolean;
  receivedSettlementOffer: boolean;
  hasDocumentedSafetyProtocols: boolean;
};

const ContactForm: React.FC = () => {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormInputs>();
  const [submitted, setSubmitted] = useState(false);
  const [isQualified, setIsQualified] = useState(true);
  const [showThankYou, setShowThankYou] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;
  
  // Watch for date input to calculate if within 2 years
  const watchDate = watch("whenAndWhere.date");
  
  React.useEffect(() => {
    if (watchDate) {
      const accidentDate = new Date(watchDate);
      const twoYearsAgo = new Date();
      twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2);
      
      // Set hidden field
      setValue("isWithinTwoYears", accidentDate >= twoYearsAgo);
    }
  }, [watchDate, setValue]);
  
  const handleNext = () => {
    setCurrentStep(prev => Math.min(prev + 1, totalSteps));
  };
  
  const handlePrev = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };
  
  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    console.log(data);
    
    // Apply hidden logic-based filtering
    let qualificationIssues = [];
    let leadPriority = "normal";
    
    // Accident Timing Filter
    if (!data.isWithinTwoYears) {
      qualificationIssues.push("Potential expired claim (incident over 2 years old)");
    }
    
    // Injury Severity Filter
    if (data.injurySeverity < 3) {
      qualificationIssues.push("Low severity rating, may need additional details");
    }
    
    // Insurance Contact Filter
    if (data.spokenWithLegal) {
      qualificationIssues.push("Already consulted with legal professionals");
    }
    
    // Documentation Quality Filter
    if (!data.hasEvidence) {
      qualificationIssues.push("Lacks concrete evidence documentation");
    }
    
    // Employer/Insurance Communication Filter
    if (data.receivedSettlementOffer) {
      leadPriority = "high";
    }
    
    // Process the lead based on qualification
    if (qualificationIssues.length > 2) {
      setIsQualified(false);
      // In a real implementation, you might still save the lead but flag it for review
    } else {
      // Send lead data to your CRM/lead management system
      // This would be an API call in a real implementation
      const leadData = {
        ...data,
        qualificationIssues,
        leadPriority,
        submissionDate: new Date().toISOString()
      };
      
      console.log("Qualified lead:", leadData);
      setIsQualified(true);
    }
    
    setSubmitted(true);
    setShowThankYou(true);
  };

  if (showThankYou) {
    return (
      <div className="card shadow-soft-xl p-6 md:p-8 border-t-4 border-t-primary animate-fade-in">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-green-100 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="heading-sm mb-4">Thank You!</h3>
          <p className="text-gray-700 mb-6">
            {isQualified 
              ? "Your case information has been submitted. An attorney will contact you within 24 hours to discuss your oil field accident claim." 
              : "We've received your information. While your case may have some challenges, our team will review your details and contact you to discuss potential options."}
          </p>
          <p className="text-sm text-gray-600 font-medium">
            Case reference: #{Math.floor(Math.random() * 900000) + 100000}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="card shadow-soft-xl p-6 md:p-8 border-t-4 border-t-primary animate-fade-in">
      <div className="mb-6">
        <h3 className="heading-sm mb-3 text-center">Free Oil Field Accident Case Evaluation</h3>
        <p className="text-center text-gray-600">
          Tell us about your situation and our experienced Texas attorneys will analyze your case.
        </p>
        
        {/* Progress indicator */}
        <div className="mt-6 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">Step {currentStep} of {totalSteps}</span>
            <span className="text-sm text-gray-500">{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
            <div 
              className="bg-primary h-2.5 rounded-full transition-all duration-300 ease-in-out" 
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Step 1: What happened (Previously Step 2 - First part) */}
        {currentStep === 1 && (
          <>
            {/* What happened to you? */}
            <div>
              <label htmlFor="whatHappened" className="block mb-1.5 font-medium text-gray-700">
                What happened to you?
              </label>
              <p className="text-sm text-gray-500 mb-2">Tell us, in your own words, what went wrong on the job.</p>
              <textarea
                id="whatHappened"
                rows={4}
                className={`form-input ${errors.whatHappened ? 'border-red-500 focus:ring-red-500' : ''}`}
                placeholder="I was working on the drilling platform when..."
                {...register('whatHappened', { required: 'Please describe what happened' })}
              ></textarea>
              {errors.whatHappened && <p className="mt-1.5 text-sm text-red-600">{errors.whatHappened.message}</p>}
              
              {/* Hidden Injury Severity Rating */}
              <div className="mt-4">
                <label htmlFor="injurySeverity" className="block mb-1.5 font-medium text-gray-700">
                  How serious were your injuries? (1-10)
                </label>
                <p className="text-sm text-gray-500 mb-2">1 being minor, 10 being very severe</p>
                <input
                  type="range"
                  min="1"
                  max="10"
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  {...register('injurySeverity', { required: true })}
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Minor</span>
                  <span>Moderate</span>
                  <span>Severe</span>
                </div>
              </div>
            </div>
            
            {/* When and where did it occur? */}
            <div>
              <label className="block mb-1.5 font-medium text-gray-700">
                When and where did it occur?
              </label>
              <p className="text-sm text-gray-500 mb-2">Let's pinpoint the date, time, and location of your accident.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="accidentDate" className="block mb-1.5 text-sm font-medium text-gray-700">
                    Date
                  </label>
                  <input
                    id="accidentDate"
                    type="date"
                    className={`form-input ${errors.whenAndWhere?.date ? 'border-red-500 focus:ring-red-500' : ''}`}
                    {...register('whenAndWhere.date', { required: 'Date is required' })}
                  />
                  {errors.whenAndWhere?.date && 
                    <p className="mt-1.5 text-sm text-red-600">{errors.whenAndWhere.date.message}</p>
                  }
                </div>
                
                <div>
                  <label htmlFor="accidentTime" className="block mb-1.5 text-sm font-medium text-gray-700">
                    Approximate Time
                  </label>
                  <input
                    id="accidentTime"
                    type="time"
                    className={`form-input ${errors.whenAndWhere?.time ? 'border-red-500 focus:ring-red-500' : ''}`}
                    {...register('whenAndWhere.time', { required: 'Time is required' })}
                  />
                  {errors.whenAndWhere?.time && 
                    <p className="mt-1.5 text-sm text-red-600">{errors.whenAndWhere.time.message}</p>
                  }
                </div>
              </div>
              
              <div className="mt-3">
                <label htmlFor="accidentLocation" className="block mb-1.5 text-sm font-medium text-gray-700">
                  Location (Name of oil field, platform, or specific area)
                </label>
                <input
                  id="accidentLocation"
                  type="text"
                  placeholder="Permian Basin, Platform #4"
                  className={`form-input ${errors.whenAndWhere?.location ? 'border-red-500 focus:ring-red-500' : ''}`}
                  {...register('whenAndWhere.location', { required: 'Location is required' })}
                />
                {errors.whenAndWhere?.location && 
                  <p className="mt-1.5 text-sm text-red-600">{errors.whenAndWhere.location.message}</p>
                }
              </div>
            </div>
          </>
        )}
      
        {/* Step 2: More specific details (Previously Step 2 - Second part + Step 3 - First part) */}
        {currentStep === 2 && (
          <>
            {/* Were safety protocols followed? */}
            <div>
              <label htmlFor="safetyProtocols" className="block mb-1.5 font-medium text-gray-700">
                Were safety protocols followed?
              </label>
              <p className="text-sm text-gray-500 mb-2">Did you notice any shortcuts or missing safety measures before the incident?</p>
              <textarea
                id="safetyProtocols"
                rows={3}
                className={`form-input ${errors.safetyProtocols ? 'border-red-500 focus:ring-red-500' : ''}`}
                placeholder="Describe any safety concerns, missing equipment, or procedural shortcuts..."
                {...register('safetyProtocols', { required: 'Please provide safety protocol information' })}
              ></textarea>
              {errors.safetyProtocols && <p className="mt-1.5 text-sm text-red-600">{errors.safetyProtocols.message}</p>}
              
              {/* Hidden Safety Protocol Documentation Question */}
              <div className="mt-4">
                <label className="inline-flex items-center">
                  <input 
                    type="checkbox" 
                    className="form-checkbox text-primary" 
                    {...register('hasDocumentedSafetyProtocols')}
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    My job role had clearly defined safety protocols that were documented
                  </span>
                </label>
              </div>
            </div>
          
            {/* What injuries did you suffer? */}
            <div>
              <label htmlFor="injuries" className="block mb-1.5 font-medium text-gray-700">
                What injuries did you suffer?
              </label>
              <p className="text-sm text-gray-500 mb-2">Share the details of your injuries and any treatments you received.</p>
              <textarea
                id="injuries"
                rows={3}
                className={`form-input ${errors.injuries ? 'border-red-500 focus:ring-red-500' : ''}`}
                placeholder="Describe your injuries and medical treatments..."
                {...register('injuries', { required: 'Please describe your injuries' })}
              ></textarea>
              {errors.injuries && <p className="mt-1.5 text-sm text-red-600">{errors.injuries.message}</p>}
            </div>
            
            {/* Do you have any documentation? */}
            <div>
              <label htmlFor="documentation" className="block mb-1.5 font-medium text-gray-700">
                Do you have any documentation?
              </label>
              <p className="text-sm text-gray-500 mb-2">Upload accident reports, photos, witness statements, or medical records.</p>
              <input
                id="documentation"
                type="file"
                multiple
                className="form-input py-2"
                {...register('documentation')}
              />
              
              {/* Hidden Evidence Question */}
              <div className="mt-4">
                <label className="inline-flex items-center">
                  <input 
                    type="checkbox" 
                    className="form-checkbox text-primary" 
                    {...register('hasEvidence')}
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    I have at least one piece of evidence (accident report, photos, medical records)
                  </span>
                </label>
              </div>
            </div>
          </>
        )}
        
        {/* Step 3: Additional questions and contact information (Previously Step 3 - Second part + Step 1) */}
        {currentStep === 3 && (
          <>
            {/* What's your role at the oil field? */}
            <div>
              <label htmlFor="jobRole" className="block mb-1.5 font-medium text-gray-700">
                What's your role at the oil field?
              </label>
              <p className="text-sm text-gray-500 mb-2">Describe your position and any previous safety concerns you experienced.</p>
              <textarea
                id="jobRole"
                rows={2}
                className={`form-input ${errors.jobRole ? 'border-red-500 focus:ring-red-500' : ''}`}
                placeholder="Describe your position and responsibilities..."
                {...register('jobRole', { required: 'Please describe your job role' })}
              ></textarea>
              {errors.jobRole && <p className="mt-1.5 text-sm text-red-600">{errors.jobRole.message}</p>}
            </div>
            
            {/* Have you been contacted by insurance or your employer? */}
            <div>
              <label htmlFor="contactedByInsurance" className="block mb-1.5 font-medium text-gray-700">
                Have you been contacted by insurance or your employer?
              </label>
              <p className="text-sm text-gray-500 mb-2">Let us know if they've reached out since the accident.</p>
              
              <div className="flex flex-col gap-3">
                <label className="inline-flex items-center">
                  <input 
                    type="radio" 
                    value="yes_settlement" 
                    className="form-radio text-primary" 
                    {...register('contactedByInsurance', { required: 'Please answer this question' })}
                    onChange={() => setValue('receivedSettlementOffer', true)}
                  />
                  <span className="ml-2 text-gray-700">Yes, they've made a settlement offer</span>
                </label>
                
                <label className="inline-flex items-center">
                  <input 
                    type="radio" 
                    value="yes_no_settlement" 
                    className="form-radio text-primary" 
                    {...register('contactedByInsurance', { required: 'Please answer this question' })}
                    onChange={() => setValue('receivedSettlementOffer', false)}
                  />
                  <span className="ml-2 text-gray-700">Yes, but no settlement offer was made</span>
                </label>
                
                <label className="inline-flex items-center">
                  <input 
                    type="radio" 
                    value="no" 
                    className="form-radio text-primary" 
                    {...register('contactedByInsurance', { required: 'Please answer this question' })}
                    onChange={() => setValue('receivedSettlementOffer', false)}
                  />
                  <span className="ml-2 text-gray-700">No, I haven't been contacted</span>
                </label>
              </div>
              {errors.contactedByInsurance && <p className="mt-1.5 text-sm text-red-600">{errors.contactedByInsurance.message}</p>}
            </div>
            
            {/* Hidden - Have you spoken with legal professionals? */}
            <div>
              <label className="block mb-1.5 font-medium text-gray-700">
                Have you already consulted with a lawyer about this case?
              </label>
              <div className="flex gap-4">
                <label className="inline-flex items-center">
                  <input 
                    type="radio" 
                    value="yes" 
                    className="form-radio text-primary" 
                    {...register('spokenWithLegal')}
                    onChange={() => setValue('spokenWithLegal', true)}
                  />
                  <span className="ml-2 text-gray-700">Yes</span>
                </label>
                <label className="inline-flex items-center">
                  <input 
                    type="radio" 
                    value="no" 
                    className="form-radio text-primary" 
                    {...register('spokenWithLegal')}
                    onChange={() => setValue('spokenWithLegal', false)}
                  />
                  <span className="ml-2 text-gray-700">No</span>
                </label>
              </div>
            </div>
            
            {/* Contact Information - Moved to last step */}
            <div className="pt-6 border-t border-gray-200 mt-6">
              <h4 className="font-medium text-lg mb-4">Your Contact Information</h4>
              
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
              
              <div className="mt-4">
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
              
              <div className="mt-4">
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
            </div>
          </>
        )}
        
        {/* Navigation Buttons */}
        <div className="flex justify-between pt-4">
          {currentStep > 1 ? (
            <button 
              type="button" 
              onClick={handlePrev}
              className="btn-secondary text-base flex items-center gap-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Back
            </button>
          ) : (
            <div></div> // Empty div for spacing
          )}
          
          {currentStep < totalSteps ? (
            <button 
              type="button" 
              onClick={handleNext}
              className="btn-primary text-base flex items-center gap-1"
            >
              Continue
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          ) : (
            <button 
              type="submit" 
              className="btn-accent text-lg font-bold py-3 px-6 flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Submit Your Case
            </button>
          )}
        </div>
        
        {currentStep === totalSteps && (
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
        )}
      </form>
    </div>
  );
};

export default ContactForm; 