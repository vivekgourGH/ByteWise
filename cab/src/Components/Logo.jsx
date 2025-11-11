import React from 'react';

const Logo = ({ className = "h-10 w-auto" }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-2 rounded-lg mr-2">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 6C4 4.89543 4.89543 4 6 4H18C19.1046 4 20 4.89543 20 6V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V6Z" fill="white"/>
          <path d="M7 8H17V9H7V8Z" fill="#8b5cf6"/>
          <path d="M7 11H17V12H7V11Z" fill="#8b5cf6"/>
          <path d="M7 14H13V15H7V14Z" fill="#8b5cf6"/>
        </svg>
      </div>
      <div>
        <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Bytwise
        </span>
        <div className="text-xs text-slate-500 -mt-1">Learn • Grow • Excel</div>
      </div>
    </div>
  );
};

export default Logo;