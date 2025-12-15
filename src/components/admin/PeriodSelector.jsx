import React from 'react';

const PeriodSelector = ({ selectedPeriod, onPeriodChange }) => {
  const periods = [
    { value: 'week', label: 'Last 7 Days' },
    { value: 'month', label: 'Last 30 Days' },
    { value: 'year', label: 'Last 12 Months' }
  ];

  return (
    <div className="flex gap-2 bg-gray-100 p-1 rounded-lg flex-wrap">
      {periods.map(({ value, label }) => (
        <button
          key={value}
          className={`px-4 py-2 rounded-md font-semibold text-sm transition-all ${
            selectedPeriod === value
              ? 'bg-[#1A5632] text-[#FFD7DF] shadow-md'
              : 'bg-transparent text-gray-600 hover:bg-gray-200'
          }`}
          onClick={() => onPeriodChange(value)}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default PeriodSelector;

