"use client";

import { useState } from 'react';
import { NavigationBar } from '@/components/navigation-bar';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface FormData {
  // Step 1 - Personal Details
  fullName: string;
  dateOfBirth: string;
  emailAddress: string;
  mobileNumber: string;
  address: string;
  city: string;
  countyState: string;
  postalCode: string;
  country: string;
  
  // Partner Information (Optional)
  partnerFullName: string;
  partnerEmail: string;
  
  // Emergency Contact
  emergencyContactName: string;
  emergencyContactPhone: string;
  
  // Step 2 - Relationship Status
  relationshipStatus: string;
  partnerInvolved: boolean;
  
  // Step 3 - Surrogacy Details
  surrogacyType: string;
  previousExperience: string;
  timeframe: string;
  
  // Step 4 - Legal & Final
  legalRepresentation: string;
  additionalInfo: string;
  agreeToTerms: boolean;
}

const initialFormData: FormData = {
  fullName: '',
  dateOfBirth: '',
  emailAddress: '',
  mobileNumber: '',
  address: '',
  city: '',
  countyState: '',
  postalCode: '',
  country: '',
  partnerFullName: '',
  partnerEmail: '',
  emergencyContactName: '',
  emergencyContactPhone: '',
  relationshipStatus: '',
  partnerInvolved: false,
  surrogacyType: '',
  previousExperience: '',
  timeframe: '',
  legalRepresentation: '',
  additionalInfo: '',
  agreeToTerms: false,
};

export default function StartJourneyPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const totalSteps = 4;

  const updateFormData = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    // Here you would submit the form data to your backend
    console.log('Form submitted:', formData);
    alert('Thank you! Your application has been submitted. We will be in touch within 24 hours.');
  };

  const renderProgressBar = () => (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">Step {currentStep} of {totalSteps}</span>
        <span className="text-sm text-gray-500">{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        ></div>
      </div>
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Personal Details</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Let&apos;s start with your basic information. This helps us understand your background and 
          ensures we can provide you with the most appropriate legal guidance.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name <span className="text-red-500">*</span>
          </label>
          <Input
            type="text"
            value={formData.fullName}
            onChange={(e) => updateFormData('fullName', e.target.value)}
            placeholder="Enter your full name"
            className="w-full"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date of Birth <span className="text-red-500">*</span>
          </label>
          <Input
            type="date"
            value={formData.dateOfBirth}
            onChange={(e) => updateFormData('dateOfBirth', e.target.value)}
            className="w-full"
            required
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address <span className="text-red-500">*</span>
          </label>
          <Input
            type="email"
            value={formData.emailAddress}
            onChange={(e) => updateFormData('emailAddress', e.target.value)}
            placeholder="your.email@example.com"
            className="w-full"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mobile Number <span className="text-red-500">*</span>
          </label>
          <Input
            type="tel"
            value={formData.mobileNumber}
            onChange={(e) => updateFormData('mobileNumber', e.target.value)}
            placeholder="+44 7XXX XXXXXX"
            className="w-full"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Address <span className="text-red-500">*</span>
        </label>
        <textarea
          value={formData.address}
          onChange={(e) => updateFormData('address', e.target.value)}
          placeholder="Enter your full address"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
          rows={3}
          required
        />
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            City <span className="text-red-500">*</span>
          </label>
          <Input
            type="text"
            value={formData.city}
            onChange={(e) => updateFormData('city', e.target.value)}
            placeholder="City"
            className="w-full"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            County/State <span className="text-red-500">*</span>
          </label>
          <Input
            type="text"
            value={formData.countyState}
            onChange={(e) => updateFormData('countyState', e.target.value)}
            placeholder="County/State"
            className="w-full"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Postal Code <span className="text-red-500">*</span>
          </label>
          <Input
            type="text"
            value={formData.postalCode}
            onChange={(e) => updateFormData('postalCode', e.target.value)}
            placeholder="SW1A 1AA"
            className="w-full"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Country <span className="text-red-500">*</span>
        </label>
        <select
          value={formData.country}
          onChange={(e) => updateFormData('country', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
        >
          <option value="">Select Country</option>
          <option value="United Kingdom">United Kingdom</option>
          <option value="Ireland">Ireland</option>
          <option value="United States">United States</option>
          <option value="Canada">Canada</option>
          <option value="Australia">Australia</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Partner Information */}
      <div className="border-t pt-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Partner Information (Optional)</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Partner&apos;s Full Name
            </label>
            <Input
              type="text"
              value={formData.partnerFullName}
              onChange={(e) => updateFormData('partnerFullName', e.target.value)}
              placeholder="Partner's full name"
              className="w-full"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Partner&apos;s Email
            </label>
            <Input
              type="email"
              value={formData.partnerEmail}
              onChange={(e) => updateFormData('partnerEmail', e.target.value)}
              placeholder="partner.email@example.com"
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Emergency Contact */}
      <div className="border-t pt-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Emergency Contact</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Emergency Contact Name <span className="text-red-500">*</span>
            </label>
            <Input
              type="text"
              value={formData.emergencyContactName}
              onChange={(e) => updateFormData('emergencyContactName', e.target.value)}
              placeholder="Emergency contact name"
              className="w-full"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Emergency Contact Phone <span className="text-red-500">*</span>
            </label>
            <Input
              type="tel"
              value={formData.emergencyContactPhone}
              onChange={(e) => updateFormData('emergencyContactPhone', e.target.value)}
              placeholder="+44 7XXX XXXXXX"
              className="w-full"
              required
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Relationship Status</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Understanding your relationship status helps us provide the most appropriate legal guidance for your situation.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-4">
          What is your current relationship status? <span className="text-red-500">*</span>
        </label>
        <div className="space-y-3">
          {[
            'Single',
            'Married',
            'Civil Partnership',
            'In a relationship (not married)',
            'Divorced',
            'Widowed',
            'Prefer not to say'
          ].map((status) => (
            <label key={status} className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
              <input
                type="radio"
                name="relationshipStatus"
                value={status}
                checked={formData.relationshipStatus === status}
                onChange={(e) => updateFormData('relationshipStatus', e.target.value)}
                className="mr-3 text-blue-600"
              />
              <span className="text-gray-900">{status}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-4">
          Will your partner be involved in the surrogacy process?
        </label>
        <div className="space-y-3">
          <label className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
            <input
              type="radio"
              name="partnerInvolved"
              value="yes"
              checked={formData.partnerInvolved === true}
              onChange={() => updateFormData('partnerInvolved', true)}
              className="mr-3 text-blue-600"
            />
            <span className="text-gray-900">Yes, my partner will be fully involved</span>
          </label>
          <label className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
            <input
              type="radio"
              name="partnerInvolved"
              value="no"
              checked={formData.partnerInvolved === false}
              onChange={() => updateFormData('partnerInvolved', false)}
              className="mr-3 text-blue-600"
            />
            <span className="text-gray-900">No, I will be proceeding alone</span>
          </label>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Surrogacy Details</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Tell us about your surrogacy preferences and timeline to help us provide the most relevant guidance.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-4">
          What type of surrogacy arrangement are you considering? <span className="text-red-500">*</span>
        </label>
        <div className="space-y-3">
          {[
            'Traditional surrogacy (surrogate uses her own egg)',
            'Gestational surrogacy (using your egg/donor egg)',
            'Not sure yet - need guidance',
            'Prefer to discuss with legal advisor'
          ].map((type) => (
            <label key={type} className="flex items-start p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
              <input
                type="radio"
                name="surrogacyType"
                value={type}
                checked={formData.surrogacyType === type}
                onChange={(e) => updateFormData('surrogacyType', e.target.value)}
                className="mr-3 mt-1 text-blue-600"
              />
              <span className="text-gray-900">{type}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-4">
          Do you have any previous experience with surrogacy?
        </label>
        <div className="space-y-3">
          {[
            'This is my first time considering surrogacy',
            'I have researched surrogacy but not proceeded before',
            'I have attempted surrogacy previously (unsuccessful)',
            'I have successfully had a child through surrogacy before'
          ].map((experience) => (
            <label key={experience} className="flex items-start p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
              <input
                type="radio"
                name="previousExperience"
                value={experience}
                checked={formData.previousExperience === experience}
                onChange={(e) => updateFormData('previousExperience', e.target.value)}
                className="mr-3 mt-1 text-blue-600"
              />
              <span className="text-gray-900">{experience}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-4">
          What is your preferred timeframe to begin the process?
        </label>
        <div className="space-y-3">
          {[
            'Immediately (within 1-2 months)',
            'Within 3-6 months',
            'Within 6-12 months',
            'More than 12 months',
            'Just exploring options for now'
          ].map((time) => (
            <label key={time} className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
              <input
                type="radio"
                name="timeframe"
                value={time}
                checked={formData.timeframe === time}
                onChange={(e) => updateFormData('timeframe', e.target.value)}
                className="mr-3 text-blue-600"
              />
              <span className="text-gray-900">{time}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Legal & Final Details</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Just a few final questions to ensure we can provide you with the most comprehensive legal support.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-4">
          Do you currently have legal representation for surrogacy matters?
        </label>
        <div className="space-y-3">
          {[
            'No, I need legal representation',
            'Yes, but looking for a second opinion',
            'Yes, but not satisfied with current representation',
            'Not sure if I need legal representation'
          ].map((option) => (
            <label key={option} className="flex items-start p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
              <input
                type="radio"
                name="legalRepresentation"
                value={option}
                checked={formData.legalRepresentation === option}
                onChange={(e) => updateFormData('legalRepresentation', e.target.value)}
                className="mr-3 mt-1 text-blue-600"
              />
              <span className="text-gray-900">{option}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Is there anything else you&apos;d like us to know about your situation?
        </label>
        <textarea
          value={formData.additionalInfo}
          onChange={(e) => updateFormData('additionalInfo', e.target.value)}
          placeholder="Please share any additional information that might help us understand your situation better..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
          rows={4}
        />
      </div>

      <div className="border-t pt-6">
        <label className="flex items-start p-4 border border-gray-200 rounded-lg">
          <input
            type="checkbox"
            checked={formData.agreeToTerms}
            onChange={(e) => updateFormData('agreeToTerms', e.target.checked)}
            className="mr-3 mt-1 text-blue-600"
            required
          />
          <span className="text-sm text-gray-700">
            I agree to the{' '}
            <a href="/terms" className="text-blue-600 hover:underline" target="_blank">
              Terms and Conditions
            </a>{' '}
            and{' '}
            <a href="/privacy" className="text-blue-600 hover:underline" target="_blank">
              Privacy Policy
            </a>
            . I understand that this information will be used to assess my situation and provide appropriate legal guidance.
            <span className="text-red-500 ml-1">*</span>
          </span>
        </label>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationBar />
      
      <main className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Intended Parent Onboarding</h1>
            <p className="text-xl text-gray-600">
              Begin your surrogacy journey with expert legal guidance
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            {renderProgressBar()}
            
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
            {currentStep === 4 && renderStep4()}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-12 pt-8 border-t border-gray-200">
              {currentStep > 1 ? (
                <Button
                  variant="outline"
                  onClick={prevStep}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Step {currentStep - 1}
                </Button>
              ) : (
                <div></div>
              )}

              {currentStep < totalSteps ? (
                <Button
                  onClick={nextStep}
                  className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                >
                  Continue to Step {currentStep + 1}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={!formData.agreeToTerms}
                  className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 disabled:opacity-50"
                >
                  Submit Application
                  <ArrowRight className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}