"use client";

import React from 'react';

interface TypingIndicatorProps {
  text: string;
}

const TypingIndicator: React.FC<TypingIndicatorProps> = ({ text }) => {
  return (
    <div className='targetsInputField' style={{ 
      width: '110px', 
      height: '150px', 
      border: '1px solid black',
      wordWrap:"break-word",
      overflow:"auto"
    
  }}>
      {text}
    </div>
  );
};

export default TypingIndicator;
