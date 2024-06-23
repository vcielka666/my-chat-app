"use client";

import React from 'react';

interface TypingIndicatorProps {
  text: string;
}

const TypingIndicator: React.FC<TypingIndicatorProps> = ({ text }) => {
  return (
    <div style={{ width: '150px', height: '150px', border: '1px solid black' }}>
      {text}
    </div>
  );
};

export default TypingIndicator;
