import React, { useState } from 'react';
import { Heart, Shield, Eye, DollarSign, ChevronRight } from 'lucide-react';

export const BenefitsEnrollment: React.FC = () => {
  const [step, setStep] = useState(1);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Benefits Enrollment</h1>

      <div className="mb-8">
        <div className="flex items-center justify-between">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center flex-1">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  step >= s ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'
                }`}
              >
                {s}
              </div>
              {s < 4 && (
                <div className={`flex-1 h-1 mx-2 ${step > s ? 'bg-blue-600' : 'bg-gray-300'}`} />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2 text-sm text-gray-600">
          <span>Health</span>
          <span>Dental</span>
          <span>Vision</span>
          <span>Review</span>
        </div>
      </div>

      {step === 1 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-6 flex items-center">
            <Heart className="mr-3 h-6 w-6 text-red-500" />
            Select Health Insurance Plan
          </h2>
          <div className="space-y-4">
            {[
              { name: 'PPO Gold', premium: '$450/mo', deductible: '$1,000', coverage: '80/20', recommended: true },
              { name: 'PPO Silver', premium: '$350/mo', deductible: '$2,500', coverage: '70/30', recommended: false },
              { name: 'HMO Basic', premium: '$250/mo', deductible: '$3,500', coverage: '60/40', recommended: false },
            ].map((plan) => (
              <div
                key={plan.name}
                className={`border-2 rounded-lg p-6 cursor-pointer hover:border-blue-500 transition-all ${
                  plan.recommended ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold flex items-center gap-2">
                      {plan.name}
                      {plan.recommended && (
                        <span className="px-2 py-1 bg-blue-600 text-white text-xs rounded">Recommended</span>
                      )}
                    </h3>
                    <div className="mt-3 grid grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Monthly Premium</p>
                        <p className="font-bold">{plan.premium}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Deductible</p>
                        <p className="font-bold">{plan.deductible}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Coverage</p>
                        <p className="font-bold">{plan.coverage}</p>
                      </div>
                    </div>
                  </div>
                  <input type="radio" name="health" className="h-5 w-5" defaultChecked={plan.recommended} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-end">
            <button
              onClick={() => setStep(2)}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Next Step
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-6 flex items-center">
            <Shield className="mr-3 h-6 w-6 text-blue-500" />
            Select Dental Insurance Plan
          </h2>
          <div className="space-y-4">
            {[
              { name: 'Dental Premium', premium: '$75/mo', coverage: 'Full Coverage' },
              { name: 'Dental Basic', premium: '$45/mo', coverage: 'Basic Coverage' },
            ].map((plan) => (
              <div key={plan.name} className="border-2 border-gray-200 rounded-lg p-6 cursor-pointer hover:border-blue-500">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-semibold">{plan.name}</h3>
                    <div className="mt-2 flex gap-8">
                      <div>
                        <p className="text-sm text-gray-500">Monthly Premium</p>
                        <p className="font-bold">{plan.premium}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Coverage</p>
                        <p className="font-bold">{plan.coverage}</p>
                      </div>
                    </div>
                  </div>
                  <input type="radio" name="dental" className="h-5 w-5" />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-between">
            <button onClick={() => setStep(1)} className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
              Back
            </button>
            <button
              onClick={() => setStep(3)}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Next Step
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-6 flex items-center">
            <Eye className="mr-3 h-6 w-6 text-green-500" />
            Select Vision Insurance Plan
          </h2>
          <div className="space-y-4">
            {[
              { name: 'Vision Standard', premium: '$25/mo', exams: '1 per year', frames: '$150 allowance' },
              { name: 'Vision Enhanced', premium: '$40/mo', exams: '2 per year', frames: '$250 allowance' },
            ].map((plan) => (
              <div key={plan.name} className="border-2 border-gray-200 rounded-lg p-6 cursor-pointer hover:border-blue-500">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold">{plan.name}</h3>
                    <div className="mt-2 grid grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Monthly Premium</p>
                        <p className="font-bold">{plan.premium}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Eye Exams</p>
                        <p className="font-bold">{plan.exams}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Frames</p>
                        <p className="font-bold">{plan.frames}</p>
                      </div>
                    </div>
                  </div>
                  <input type="radio" name="vision" className="h-5 w-5" />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-between">
            <button onClick={() => setStep(2)} className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
              Back
            </button>
            <button
              onClick={() => setStep(4)}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Review Selections
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-6">Review Your Selections</h2>
          <div className="space-y-4 mb-6">
            <div className="border-l-4 border-red-500 bg-red-50 p-4 rounded">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">Health Insurance</p>
                  <p className="text-gray-600">PPO Gold</p>
                </div>
                <p className="text-xl font-bold">$450/mo</p>
              </div>
            </div>
            <div className="border-l-4 border-blue-500 bg-blue-50 p-4 rounded">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">Dental Insurance</p>
                  <p className="text-gray-600">Dental Premium</p>
                </div>
                <p className="text-xl font-bold">$75/mo</p>
              </div>
            </div>
            <div className="border-l-4 border-green-500 bg-green-50 p-4 rounded">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">Vision Insurance</p>
                  <p className="text-gray-600">Vision Standard</p>
                </div>
                <p className="text-xl font-bold">$25/mo</p>
              </div>
            </div>
          </div>
          <div className="border-t pt-4">
            <div className="flex justify-between items-center text-xl font-bold">
              <span>Total Monthly Premium:</span>
              <span className="text-blue-600">$550/mo</span>
            </div>
          </div>
          <div className="mt-6 flex justify-between">
            <button onClick={() => setStep(3)} className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
              Back
            </button>
            <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700">
              Complete Enrollment
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
