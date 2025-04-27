
import React from 'react';

interface DisplayProps {
  value: string;
  memory: number | null;
}

const Display: React.FC<DisplayProps> = ({ value, memory }) => {
  return (
    <div className="w-full bg-purple-900 p-4 rounded-lg shadow-inner">
      {memory !== null && (
        <div className="text-right text-purple-300 text-sm mb-1">M = {memory}</div>
      )}
      <div className="text-right text-white text-4xl md:text-5xl font-light overflow-hidden">
        {value || '0'}
      </div>
    </div>
  );
};

export default Display;
