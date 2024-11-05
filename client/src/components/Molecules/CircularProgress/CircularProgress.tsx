import React, { FC } from 'react';

export interface CircularProgressProps {
  progress: number; // progress in percentage (0-100)
  size: number; // diameter of the circle
  strokeWidth: number; // thickness of the circle's stroke
  style?: React.CSSProperties;
}

export const CircularProgress: FC<CircularProgressProps> = ({
  progress,
  size,
  strokeWidth,
  style
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <svg
      width={size}
      height={size}
      style={{ 
        transform: 'rotate(-90deg)',
        ...style
      }} // Rotate the SVG by -90 degrees
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="var(--dark-foreground)"
        strokeWidth={strokeWidth}
        fill="none"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="var(--highlight)"
        strokeWidth={strokeWidth}
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
      />
    </svg>
  );
};

export default CircularProgress;
