import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

type FormInputs = {
  // Contact Information (now step 3)
  name: string;
  phone: string;
  email: string;
  
  // Visible User-Facing Questions (now steps 1-2)
  whatHappened: string;
  whatHappenedDetails?: string; // Optional additional details for "Other" option
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

const accidentTypes = [
  "Slipped, tripped, or fell",
  "Equipment failure or malfunction",
  "Explosion or fire-related injury",
  "Exposure to toxic chemicals or fumes",
  "Struck by heavy machinery or falling object",
  "Caught in or between equipment",
  "Electrical shock or electrocution",
  "Severe burns or heat exposure",
  "Other (please describe briefly)"
];

const ContactForm: React.FC = () => {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormInputs>();
  const [submitted, setSubmitted] = useState(false);
  const [isQualified, setIsQualified] = useState(true);
  const [showThankYou, setShowThankYou] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;
  
  // For monitoring the selected accident type
  const selectedAccidentType = watch("whatHappened");
  const isOtherSelected = selectedAccidentType === "Other (please describe briefly)";
  
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
            {/* What happened to you? - Now Multiple Choice */}
            <div>
              <label className="block mb-1.5 font-medium text-gray-700">
                What happened to you? (Select the option that best describes your accident)
              </label>
              <div className="space-y-3 mt-2">
                {accidentTypes.map((type, index) => (
                  <label key={index} className="flex items-start p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="radio"
                      className="mt-0.5 form-radio text-primary focus:ring-primary"
                      value={type}
                      {...register('whatHappened', { required: 'Please select an accident type' })}
                    />
                    <span className="ml-2 text-gray-700">{type}</span>
                  </label>
                ))}
              </div>
              {errors.whatHappened && <p className="mt-1.5 text-sm text-red-600">{errors.whatHappened.message}</p>}
              
              {/* Additional details for "Other" option */}
              {isOtherSelected && (
                <div className="mt-3">
                  <label htmlFor="whatHappenedDetails" className="block mb-1.5 text-sm font-medium text-gray-700">
                    Please describe what happened
                  </label>
                  <textarea
                    id="whatHappenedDetails"
                    rows={3}
                    className={`form-input ${errors.whatHappenedDetails ? 'border-red-500 focus:ring-red-500' : ''}`}
                    placeholder="Please briefly describe what happened..."
                    {...register('whatHappenedDetails', { 
                      required: isOtherSelected ? 'Please provide details about your accident' : false 
                    })}
                  ></textarea>
                  {errors.whatHappenedDetails && <p className="mt-1.5 text-sm text-red-600">{errors.whatHappenedDetails.message}</p>}
                </div>
              )}
              
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
      
        {/* Step 2: Safety, Injuries and Documentation (Previously Step 2 - Second part) */}
        {currentStep === 2 && (
          <>
            {/* Were proper safety protocols in place? */}
            <div>
              <label htmlFor="safetyProtocols" className="block mb-1.5 font-medium text-gray-700">
                Were proper safety measures followed on the job site?
              </label>
              <p className="text-sm text-gray-500 mb-2">Your perception of safety standards at the time of the accident.</p>
              <select
                id="safetyProtocols"
                className={`form-select ${errors.safetyProtocols ? 'border-red-500 focus:ring-red-500' : ''}`}
                {...register('safetyProtocols', { required: 'Please make a selection' })}
              >
                <option value="">Select an option...</option>
                <option value="no-safety">No safety protocols were in place</option>
                <option value="inadequate">Safety measures were inadequate</option>
                <option value="ignored">Safety measures existed but were ignored</option>
                <option value="not-enforced">Safety rules weren't properly enforced</option>
                <option value="proper">All proper safety measures were in place</option>
                <option value="unsure">I'm unsure about the safety protocols</option>
              </select>
              {errors.safetyProtocols && <p className="mt-1.5 text-sm text-red-600">{errors.safetyProtocols.message}</p>}
              
              {/* Hidden field */}
              <input 
                type="hidden" 
                {...register('hasDocumentedSafetyProtocols')}
              />
            </div>
            
            {/* Describe your injuries */}
            <div>
              <label htmlFor="injuries" className="block mb-1.5 font-medium text-gray-700">
                Describe your injuries
              </label>
              <textarea
                id="injuries"
                rows={3}
                className={`form-input ${errors.injuries ? 'border-red-500 focus:ring-red-500' : ''}`}
                placeholder="Explain the injuries you sustained from the accident..."
                {...register('injuries', { required: 'Please describe your injuries' })}
              ></textarea>
              {errors.injuries && <p className="mt-1.5 text-sm text-red-600">{errors.injuries.message}</p>}
            </div>
            
            {/* Do you have documentation? */}
            <div>
              <label htmlFor="documentation" className="block mb-1.5 font-medium text-gray-700">
                Do you have any documentation or photos of the accident?
              </label>
              <p className="text-sm text-gray-500 mb-2">Upload any relevant documents or photos (optional).</p>
              <input
                id="documentation"
                type="file"
                multiple
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-medium
                  file:bg-primary/10 file:text-primary
                  hover:file:bg-primary/20"
                {...register('documentation')}
              />
              
              {/* Hidden field */}
              <div className="mt-3">
                <p className="text-sm text-gray-700 mb-1 font-medium">Do you have any of the following evidence?</p>
                <div className="flex items-center">
                  <input
                    id="hasEvidence"
                    type="checkbox"
                    className="form-checkbox text-primary focus:ring-primary h-4 w-4"
                    {...register('hasEvidence')}
                  />
                  <label htmlFor="hasEvidence" className="ml-2 text-sm text-gray-600">
                    Incident reports, medical records, witness statements, or other documentation
                  </label>
                </div>
              </div>
            </div>
            
            {/* What was your job role? */}
            <div>
              <label htmlFor="jobRole" className="block mb-1.5 font-medium text-gray-700">
                What was your job role at the time of the accident?
              </label>
              <input
                id="jobRole"
                type="text"
                className={`form-input ${errors.jobRole ? 'border-red-500 focus:ring-red-500' : ''}`}
                placeholder="Roughneck, Driller, Maintenance Technician, etc."
                {...register('jobRole', { required: 'Please enter your job role' })}
              />
              {errors.jobRole && <p className="mt-1.5 text-sm text-red-600">{errors.jobRole.message}</p>}
            </div>
            
            {/* Has insurance or employer contacted you? */}
            <div>
              <label htmlFor="contactedByInsurance" className="block mb-1.5 font-medium text-gray-700">
                Have you been contacted by insurance or your employer about the accident?
              </label>
              <select
                id="contactedByInsurance"
                className={`form-select ${errors.contactedByInsurance ? 'border-red-500 focus:ring-red-500' : ''}`}
                {...register('contactedByInsurance', { required: 'Please make a selection' })}
              >
                <option value="">Select an option...</option>
                <option value="no-contact">No, I haven't been contacted</option>
                <option value="employer-only">Only by my employer</option>
                <option value="insurance-only">Only by insurance</option>
                <option value="both">Yes, by both employer and insurance</option>
                <option value="settlement-offered">Yes, and a settlement was offered</option>
              </select>
              {errors.contactedByInsurance && <p className="mt-1.5 text-sm text-red-600">{errors.contactedByInsurance.message}</p>}
              
              {/* Hidden fields */}
              <input 
                type="hidden" 
                {...register('receivedSettlementOffer')}
                value={watch('contactedByInsurance') === 'settlement-offered' ? 'true' : 'false'}
              />
              <input 
                type="hidden" 
                {...register('spokenWithLegal')}
                value="false"
              />
            </div>
          </>
        )}
        
        {/* Step 3: Contact Information (Previously Step 1) */}
        {currentStep === 3 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block mb-1.5 font-medium text-gray-700">
                  <span className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Your Name
                  </span>
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="John Smith"
                  className={`form-input ${errors.name ? 'border-red-500 focus:ring-red-500' : ''}`}
                  {...register('name', { required: 'Name is required' })}
                />
                {errors.name && <p className="mt-1.5 text-sm text-red-600">{errors.name.message}</p>}
              </div>
              
              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block mb-1.5 font-medium text-gray-700">
                  <span className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Phone Number
                  </span>
                </label>
                <input
                  id="phone"
                  type="tel"
                  placeholder="(555) 123-4567"
                  className={`form-input ${errors.phone ? 'border-red-500 focus:ring-red-500' : ''}`}
                  {...register('phone', { 
                    required: 'Phone number is required',
                    pattern: {
                      value: /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
                      message: 'Please enter a valid phone number'
                    }
                  })}
                />
                {errors.phone && <p className="mt-1.5 text-sm text-red-600">{errors.phone.message}</p>}
              </div>
            </div>
            
            {/* Email */}
            <div>
              <label htmlFor="email" className="block mb-1.5 font-medium text-gray-700">
                <span className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Email Address
                </span>
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                className={`form-input ${errors.email ? 'border-red-500 focus:ring-red-500' : ''}`}
                {...register('email', { 
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Please enter a valid email address'
                  }
                })}
              />
              {errors.email && <p className="mt-1.5 text-sm text-red-600">{errors.email.message}</p>}
            </div>
            
            {/* Privacy Policy and Terms */}
            <div className="mt-6">
              <div className="flex items-start">
                <input
                  id="privacy-terms"
                  type="checkbox"
                  className="form-checkbox text-primary focus:ring-primary mt-1 h-4 w-4"
                  required
                />
                <label htmlFor="privacy-terms" className="ml-2 text-sm text-gray-600">
                  I agree to the <a href="#" className="text-primary hover:underline">Privacy Policy</a> and <a href="#" className="text-primary hover:underline">Terms of Service</a>. I understand that submitting this form does not create an attorney-client relationship, and my information will be used to evaluate my case.
                </label>
              </div>
            </div>
          </>
        )}
        
        {/* Navigation buttons */}
        <div className="flex items-center justify-between mt-8">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={handlePrev}
              className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>
          ) : (
            <div></div> // Empty div to maintain flex spacing
          )}
          
          {currentStep < totalSteps ? (
            <button
              type="button"
              onClick={handleNext}
              className="flex items-center px-4 py-2 text-sm font-medium text-white bg-primary border border-transparent rounded-md shadow-sm hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Continue
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ) : (
            <button
              type="submit"
              className="flex items-center px-6 py-2.5 text-sm font-medium text-white bg-primary border border-transparent rounded-md shadow-sm hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Submit Case Details
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ContactForm; 