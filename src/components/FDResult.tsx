import React from 'react';
import { TrendingUp, Wallet, PiggyBank, Target, Share2 } from 'lucide-react';
import { FDResult as FDResultType, FDInput, generateShareableURL } from '../utils/calculateFD';

interface FDResultProps {
  result: FDResultType;
  input: FDInput;
}

export function FDResult({ result, input }: FDResultProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleShare = async () => {
    const shareableURL = generateShareableURL(input);
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Fixed Deposit Calculator',
          text: `Check out this FD calculation: ${formatCurrency(input.principal)} at ${input.rate}% for ${input.tenure} ${input.tenureUnit} = ${formatCurrency(result.maturityAmount)}`,
          url: shareableURL,
        });
      } catch (error) {
        // Fallback to clipboard
        await navigator.clipboard.writeText(shareableURL);
        alert('Link copied to clipboard!');
      }
    } else {
      await navigator.clipboard.writeText(shareableURL);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 transition-all duration-300">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-green-100 dark:bg-green-900 rounded-xl">
            <Target className="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Your FD Results</h2>
            <p className="text-gray-600 dark:text-gray-400">Maturity calculation breakdown</p>
          </div>
        </div>
        <button
          onClick={handleShare}
          className="p-3 rounded-xl bg-blue-50 dark:bg-blue-900 hover:bg-blue-100 dark:hover:bg-blue-800 transition-colors duration-200"
          title="Share this calculation"
        >
          <Share2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        </button>
      </div>

      <div className="space-y-6">
        {/* Maturity Amount */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
            <h3 className="text-lg font-semibold text-green-800 dark:text-green-300">Maturity Amount</h3>
          </div>
          <p className="text-3xl font-bold text-green-900 dark:text-green-100">
            {formatCurrency(result.maturityAmount)}
          </p>
        </div>

        {/* Interest Earned */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
          <div className="flex items-center gap-3 mb-2">
            <PiggyBank className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-300">Interest Earned</h3>
          </div>
          <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
            {formatCurrency(result.interestEarned)}
          </p>
          <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
            Effective Rate: {result.effectiveRate.toFixed(2)}% per annum
          </p>
        </div>

        {/* Principal */}
        <div className="bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-900/20 dark:to-slate-900/20 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-2">
            <Wallet className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-300">Principal Amount</h3>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {formatCurrency(result.principal)}
          </p>
        </div>

        {/* Investment Summary */}
        <div className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 rounded-xl p-6 border border-orange-200 dark:border-orange-800">
          <h3 className="text-lg font-semibold text-orange-800 dark:text-orange-300 mb-4">Investment Summary</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-orange-700 dark:text-orange-300">Duration</p>
              <p className="font-semibold text-orange-900 dark:text-orange-100">
                {input.tenure} {input.tenureUnit}
              </p>
            </div>
            <div>
              <p className="text-orange-700 dark:text-orange-300">Interest Rate</p>
              <p className="font-semibold text-orange-900 dark:text-orange-100">{input.rate}% p.a.</p>
            </div>
            <div>
              <p className="text-orange-700 dark:text-orange-300">Compounding</p>
              <p className="font-semibold text-orange-900 dark:text-orange-100 capitalize">
                {input.compounding.replace('-', ' ')}
              </p>
            </div>
            <div>
              <p className="text-orange-700 dark:text-orange-300">Growth</p>
              <p className="font-semibold text-orange-900 dark:text-orange-100">
                {result.growth.toFixed(2)}%
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}