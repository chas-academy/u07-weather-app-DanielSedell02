import React from "react";

const AnimatedSun: React.FC = () => (
  <div className="flex justify-center">
    <svg
      className="animate-spin-slow"
      width="80"
      height="80"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="40" cy="40" r="18" fill="#FFD93B" />
      {/* Sun rays */}
      {[...Array(8)].map((_, i) => {
        const angle = (i * 45) * (Math.PI / 180);
        const x1 = 40 + Math.cos(angle) * 26;
        const y1 = 40 + Math.sin(angle) * 26;
        const x2 = 40 + Math.cos(angle) * 36;
        const y2 = 40 + Math.sin(angle) * 36;
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#FFD93B"
            strokeWidth="4"
            strokeLinecap="round"
          />
        );
      })}
    </svg>
    <style>{`
      .animate-spin-slow {
        animation: spin 6s linear infinite;
      }
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>
  </div>
);

export default AnimatedSun; 