
import React from 'react';

const GlitchOverlay: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden opacity-20">
      <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.1)_0px,rgba(0,0,0,0.1)_1px,transparent_2px)]"></div>
      <div className="absolute inset-0 animate-pulse bg-red-900/10"></div>
    </div>
  );
};

export default GlitchOverlay;
