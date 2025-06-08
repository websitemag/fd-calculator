import React from 'react';
import { Calculator, IndianRupee, Calendar, Percent, RotateCcw } from 'lucide-react';
import { FDInput } from '../utils/calculateFD';

interface FDFormProps {
  input: FDInput;
  onChange: (input: FDInput) => void;
}

export function FDForm({ input, onChange }: FDFormProps) {
  const updateInput = (field: keyof FDInput, value: any) => {
    onChange({ ...input, [field]: value });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 sm:p-8 transition-all duration-300 w-full max-w-xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-xl">
          <Calculator className="w-6 h-6 text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Fixed Deposit Calculator</h2>
          <p className="text-gray-600 dark:text-gray-400">Calculate your FD maturity amount</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Principal Amount */}
        <div className="group">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            <IndianRupee className="w-4 h-4" />
            Principal Amount
          </label>
          <div className="relative">
            <input
              type="number"
              value={input.principal}
              onChange={(e) => updateInput('principal', Number(e.target.value) || 0)}
              className="w-full px-4 py-3 sm:py-4 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200 text-base sm:text-lg font-medium text-gray-900 dark:text-white"
              placeholder="Enter amount"
              min="1"
            />
            <div className="absolute right-4 top-3 sm:top-4 text-gray-500 dark:text-gray-400 font-medium">
              ₹
            </div>
          </div>
        </div>

        {/* Interest Rate */}
        <div className="group">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            <Percent className="w-4 h-4" />
            Annual Interest Rate
          </label>
          <div className="relative">
            <input
              type="number"
              step="0.1"
              value={input.rate}
              onChange={(e) => updateInput('rate', Number(e.target.value) || 0)}
              className="w-full px-4 py-3 sm:py-4 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200 text-base sm:text-lg font-medium text-gray-900 dark:text-white"
              placeholder="7.5"
              min="0.1"
              max="20"
            />
            <div className="absolute right-4 top-3 sm:top-4 text-gray-500 dark:text-gray-400 font-medium">
              %
            </div>
          </div>
        </div>

        {/* Tenure */}
        <div className="group">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            <Calendar className="w-4 h-4" />
            Tenure
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="number"
              value={input.tenure}
              onChange={(e) => updateInput('tenure', Number(e.target.value) || 0)}
              className="flex-1 px-4 py-3 sm:py-4 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200 text-base sm:text-lg font-medium text-gray-900 dark:text-white"
              placeholder="5"
              min="1"
            />
            <select
              value={input.tenureUnit}
              onChange={(e) => updateInput('tenureUnit', e.target.value)}
              className="px-4 py-3 sm:py-4 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200 text-base sm:text-lg font-medium text-gray-900 dark:text-white"
            >
              <option value="years">Years</option>
              <option value="months">Months</option>
            </select>
          </div>
        </div>

        {/* Compounding Frequency */}
        <div className="group">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            <RotateCcw className="w-4 h-4" />
            Compounding Frequency
          </label>
          <select
            value={input.compounding}
            onChange={(e) => updateInput('compounding', e.target.value)}
            className="w-full px-4 py-3 sm:py-4 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200 text-base sm:text-lg font-medium text-gray-900 dark:text-white"
          >
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
            <option value="half-yearly">Half-Yearly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>
      </div>
    </div>
  );
}