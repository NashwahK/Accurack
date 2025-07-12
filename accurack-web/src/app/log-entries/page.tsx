'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Modal from '@/components/CalendarModal';

type Entry = { [date: string]: string };

const getDaysInMonth = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDate();
};

export default function LogEntriesPage() {
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [entries, setEntries] = useState<Entry>({});

  const handleDateClick = (day: number) => {
    const date = new Date(currentYear, currentMonth, day);
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDate(null);
  };

  const saveEntry = (dateStr: string, text: string) => {
    setEntries((prev) => ({
      ...prev,
      [dateStr]: text,
    }));
  };

  const deleteEntry = (dateStr: string) => {
    setEntries((prev) => {
      const updated = { ...prev };
      delete updated[dateStr];
      return updated;
    });
  };

  const goToPreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((prev) => prev - 1);
    } else {
      setCurrentMonth((prev) => prev - 1);
    }
  };

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((prev) => prev + 1);
    } else {
      setCurrentMonth((prev) => prev + 1);
    }
  };

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const startDay = new Date(currentYear, currentMonth, 1).getDay();
  const calendarCells = [];

  for (let i = 0; i < startDay; i++) {
    calendarCells.push(<div key={`empty-${i}`} />);
  }

for (let day = 1; day <= daysInMonth; day++) {
  const dateStr = new Date(currentYear, currentMonth, day).toDateString();
  const hasEntry = Boolean(entries[dateStr]);
  const isEven = day % 2 === 0;
  const altColor = isEven ? '#0573EC' : '#C7DC1C';

  calendarCells.push(
    <button
      key={day}
      onClick={() => handleDateClick(day)}
      className={`
        rounded-lg p-2 text-sm font-semibold hover:scale-105 transition
        ${hasEntry ? 'bg-white border-2' : 'text-black'}
      `}
      style={
        hasEntry
          ? {
              borderColor: altColor,
              color: altColor,
            }
          : {
              backgroundColor: altColor,
            }
      }
    >
      {day}
    </button>
  );
}



  const monthLabel = new Date(currentYear, currentMonth).toLocaleString('default', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="min-h-screen text-white p-6">
      <div className="bg-gray-200 text-black rounded-xl p-6 max-w-5xl mx-auto shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-4">
            <button onClick={goToPreviousMonth}>
              <ChevronLeft className="w-6 h-6 text-gray-600 hover:text-black" />
            </button>
            <h2 className="text-2xl font-semibold">{monthLabel}</h2>
            <button onClick={goToNextMonth}>
              <ChevronRight className="w-6 h-6 text-gray-600 hover:text-black" />
            </button>
          </div>
          <span className="text-sm">Select a date for data entry</span>
        </div>

        <div className="grid grid-cols-7 gap-4 text-center">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, idx) => (
            <div key={idx} className="font-bold text-gray-700">
              {day}
            </div>
          ))}
          {calendarCells}
        </div>
      </div>

      {isModalOpen && selectedDate && (
        <Modal
          date={selectedDate}
          onClose={closeModal}
          entry={entries[selectedDate.toDateString()] || ''}
          onSave={saveEntry}
          onDelete={deleteEntry}
        />
      )}
    </div>
  );
}
