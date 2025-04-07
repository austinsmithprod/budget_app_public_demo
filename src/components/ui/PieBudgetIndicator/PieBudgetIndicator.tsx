import React, { useMemo } from 'react';

interface PieBudgetIndicatorProps {
  amount: number;
  budget: number;
}

const PieBudgetIndicator = ({ amount, budget }: PieBudgetIndicatorProps) => {
  const radius = 30;
  const circumference = 2 * Math.PI * radius;

  const { offset, fillColor, labelText } = useMemo(() => {
    const fill = Math.min(amount / (budget || 1), 1);
    const off = circumference * (1 - fill);

    const color =
      budget === 0
        ? '#afafaf'
        : amount <= budget
          ? '#4caf50'
          : amount <= budget + 100
            ? '#afaf50'
            : '#af4c50';

    const label =
      amount > 0
        ? `$${Math.round(amount)} / $${Math.round(budget)}`
        : `+($${Math.abs(amount)} / $${Math.round(budget)})`;

    return { offset: off, fillColor: color, labelText: label };
  }, [amount, budget]);

  return (
    <div className="relative w-[150px] h-[130px] flex flex-col items-center justify-center">
      <svg width="150" height="100" viewBox="0 0 120 120">
        {/* Background circle */}
        <circle
          cx="60"
          cy="60"
          r={radius}
          stroke="#e0e0e0"
          strokeWidth="60"
          fill="none"
        />
        {/* Foreground circle */}
        <circle
          cx="60"
          cy="60"
          r={radius}
          stroke={fillColor}
          strokeWidth="60"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform="rotate(-90 60 60)"
          style={{ transition: 'stroke-dashoffset 0.3s ease' }}
        />
      </svg>
      <div className="text-center text-xl font-medium mt-3">
        {labelText}
      </div>
    </div>
  );
};

export default React.memo(PieBudgetIndicator);