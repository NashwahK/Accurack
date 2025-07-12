'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  date: Date;
  entry: string;
  onClose: () => void;
  onSave: (dateStr: string, text: string) => void;
  onDelete: (dateStr: string) => void;
}

export default function Modal({ date, entry, onClose, onSave, onDelete }: ModalProps) {
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (entry) {
      try {
        const parsed = JSON.parse(entry);
        setCategory(parsed.category || '');
        setQuantity(parsed.quantity || '');
        setNotes(parsed.notes || '');
      } catch {
        setNotes(entry);
      }
    } else {
      setCategory('');
      setQuantity('');
      setNotes('');
    }
  }, [entry]);

  const handleSave = () => {
    if (!category) return alert('Please select a category.');
    const payload = JSON.stringify({ category, quantity, notes });
    onSave(date.toDateString(), payload);
    onClose();
  };

  const handleDelete = () => {
    onDelete(date.toDateString());
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex justify-center items-center p-4">
      <div className="relative bg-white text-black rounded-xl p-6 max-w-md w-full shadow-xl">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-black">
          <X />
        </button>

        <h3 className="text-lg font-bold mb-4">Log Entry – {date.toDateString()}</h3>

        <label className="block mb-2 font-medium text-sm text-gray-700">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        >
          <option value="">Select...</option>
          <option value="Inventory Check">Inventory Check</option>
          <option value="Restock Alert">Restock Alert</option>
          <option value="Supply Issue">Supply Issue</option>
          <option value="Quality Inspection">Quality Inspection</option>
        </select>

        <label className="block mb-2 font-medium text-sm text-gray-700">Quantity / Count</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="e.g., 50"
          className="w-full p-2 border rounded mb-4"
        />

        <label className="block mb-2 font-medium text-sm text-gray-700">Notes (optional)</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          className="w-full p-2 border rounded mb-4"
          placeholder="Any specific issues or remarks..."
        />

        <div className="border-t border-gray-200 my-4" />

        <div className="flex justify-between gap-2">
          <button
            onClick={handleSave}
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 flex-1"
          >
            Save Entry
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 flex-1"
          >
            Cancel
          </button>
          {entry && (
            <button
              onClick={handleDelete}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 flex-1"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
