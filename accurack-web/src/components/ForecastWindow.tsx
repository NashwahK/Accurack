'use client';
import React, { useState } from 'react';
import { Card, CardContent, TextField, IconButton } from '@mui/material';
import { ArrowRight } from 'lucide-react';

interface ForecastWindowProps {
  insights: string[];
}

const ForecastWindow: React.FC<ForecastWindowProps> = ({ insights }) => {
  const [messages, setMessages] = useState<
    { role: 'user' | 'bot'; text: string }[]
  >([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { role: 'user', text: input }]);
    setInput('');
    setIsTyping(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: 'user', text: input },
        {
          role: 'bot',
          text: 'Thanks for your question! I’ll get back to you with a forecast shortly.',
        },
      ]);
      setIsTyping(false);
    }, 2000);
  };

  return (
    <Card
      sx={{
        background: 'linear-gradient(to bottom, #0573EC, #6BA2EA)',
        color: 'white',
        p: 2,
        borderRadius: 4,
      }}
    >
      <CardContent>
        <h2 className="text-2xl font-extrabold mb-4">Forecast Window</h2>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="md:w-2/5 w-full flex flex-col gap-3">
            {insights.map((insight, index) => (
              <div
                key={index}
                className="bg-lime-300 text-black px-4 py-2 rounded shadow font-medium"
              >
                {insight}
              </div>
            ))}
          </div>
          <div className="md:w-3/5 w-full bg-white text-black rounded-xl p-4 px-6 shadow-lg flex flex-col gap-4">
            <h3 className="text-xl font-extrabold">Ask Accurack</h3>

            <div className="flex flex-col gap-2 max-h-60 overflow-y-auto pr-1">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`${
                    msg.role === 'user'
                      ? 'self-end bg-blue-600 text-white'
                      : 'self-start bg-gray-100 text-gray-800'
                  } px-4 py-2 rounded-xl max-w-[80%] text-sm shadow-md`}
                >
                  {msg.text}
                </div>
              ))}

              {isTyping && (
                <div className="self-start text-gray-500 text-sm italic">
                  Accurack is typing...
                </div>
              )}
            </div>

            <div className="flex gap-2 items-center mt-2">
              <TextField
                fullWidth
                size="small"
                placeholder="Ask something..."
                variant="outlined"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSend();
                }}
              />
              <IconButton
                onClick={handleSend}
                sx={{
                  bgcolor: '#3b82f6',
                  color: 'white',
                  '&:hover': { bgcolor: '#2563eb' },
                }}
              >
                <ArrowRight className="w-5 h-5" />
              </IconButton>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ForecastWindow;
