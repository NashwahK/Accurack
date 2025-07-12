'use client';
import React from 'react';
import QuickCard from '@/components/QuickCards';
import GreetingCard from '@/components/GreetingCard';
import ForecastWindow from '@/components/ForecastWindow'; 
import Graphicals from '@/components/Graphicals';

const Dashboard: React.FC = () => {
  const quickStats = [
    {
      label: 'Inventory Quantity',
      value: '1,230',
      change: '3.5%',
      isPositive: true,
    },
    {
      label:'Operational Efficiency',
      value:'78%',
      change:'23%',
      isPositive: true
    },
    {
      label: 'Return on Investment',
      value: '$200',
      change:'10%',
      isPositive: false
    },
    {
      label: 'Forecast Accuracy',
      value: '87%',
      change: '1.2%',
      isPositive: false,
    },
    {
      label: 'Days of Supply',
      value: '15 days',
      change: '5%',
      isPositive: true,
    },
  ];

  return (
    <main className="p-6 md:p-10 space-y-8">
      <div className='p-4 md:p-2'>
        <GreetingCard />
      </div>
      <div className="flex flex-wrap gap-4">
        {quickStats.map((stat, idx) => (
          <QuickCard key={idx} {...stat} />
        ))}
      </div>

    
      <ForecastWindow
        insights={['Restock cotton rolls soon', 'Low supply in Packaging Dept']}
      />

      <Graphicals />
    </main>
  );
};

export default Dashboard;
