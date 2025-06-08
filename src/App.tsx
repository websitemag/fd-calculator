import React, { useState, useEffect } from 'react';
import { FDForm } from './components/FDForm';
import { FDResult } from './components/FDResult';
import { DownloadPDFButton } from './components/DownloadPDFButton';
import { DarkModeToggle } from './components/DarkModeToggle';
import { useDarkMode } from './hooks/useDarkMode';
import { calculateFD, getDefaultValues, FDInput } from './utils/calculateFD';

function App() {
  const { isDark, toggleDarkMode } = useDarkMode();
  const [input, setInput] = useState<FDInput>(getDefaultValues());

  const result = calculateFD(input);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 transition-colors duration-300">
      <DarkModeToggle isDark={isDark} onToggle={toggleDarkMode} />
      <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3 sm:mb-4">
            Fixed Deposit Calculator
          </h1>
          <p className="text-base sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Calculate your FD maturity amount with compound interest. Plan your investments wisely with our accurate calculator.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 max-w-7xl mx-auto">
          <div className="space-y-4 sm:space-y-6">
            <FDForm input={input} onChange={setInput} />
            <DownloadPDFButton result={result} input={input} />
          </div>
          <div className="lg:sticky lg:top-8 mt-6 lg:mt-0">
            <FDResult result={result} input={input} />
          </div>
        </div>
        <div className="mt-10 sm:mt-16 text-center">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 sm:p-8 max-w-4xl mx-auto">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
              How Fixed Deposit Interest is Calculated
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4 sm:mb-6 leading-relaxed">
              Fixed Deposit interest is calculated using the compound interest formula: <strong>A = P(1 + r/n)^(nt)</strong>
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 text-sm">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-3 sm:p-4 rounded-lg">
                <div className="font-semibold text-blue-800 dark:text-blue-300">A</div>
                <div className="text-blue-600 dark:text-blue-400">Maturity Amount</div>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 p-3 sm:p-4 rounded-lg">
                <div className="font-semibold text-green-800 dark:text-green-300">P</div>
                <div className="text-green-600 dark:text-green-400">Principal Amount</div>
              </div>
              <div className="bg-orange-50 dark:bg-orange-900/20 p-3 sm:p-4 rounded-lg">
                <div className="font-semibold text-orange-800 dark:text-orange-300">r</div>
                <div className="text-orange-600 dark:text-orange-400">Annual Interest Rate</div>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/20 p-3 sm:p-4 rounded-lg">
                <div className="font-semibold text-purple-800 dark:text-purple-300">n×t</div>
                <div className="text-purple-600 dark:text-purple-400">Compounding × Time</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;