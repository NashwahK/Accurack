import React from 'react';

interface QuickCardProps {
  label: string;
  value: string;
  change: string;
  isPositive: boolean;
}

const QuickCard: React.FC<QuickCardProps> = ({ label, value, change, isPositive }) => {
  return (
    <div className="bg-white dark:bg-zinc-900 p-4 rounded-2xl shadow-md w-full max-w-[285px]">
      <p className="text-lg text-zinc-500 dark:text-zinc-400 font-semibold mb-2">{label}</p>
      <h3 className="text-3xl font-bold text-center text-zinc-800 dark:text-white">{value}</h3>
      <p className={`text-lg mt-1 text-center font-medium ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
        {isPositive ? '↑' : '↓'} {change} <br/><span className="text-zinc-400 text-sm">compared to last week</span>
      </p>
    </div>
  );
};

export default QuickCard;