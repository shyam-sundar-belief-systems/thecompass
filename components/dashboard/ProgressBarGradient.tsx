interface ProgressBarGradientProps {
  value: number;
  target: number;
  showLabel?: boolean;
  height?: 'sm' | 'md' | 'lg';
}

export function ProgressBarGradient({
  value,
  target,
  showLabel = true,
  height = 'md',
}: ProgressBarGradientProps) {
  const percentage = Math.min((value / target) * 100, 100);

  const getGradient = () => {
    if (percentage >= 100) return 'bg-gradient-to-r from-green-500 to-emerald-600';
    if (percentage >= 80) return 'bg-gradient-to-r from-blue-500 to-cyan-600';
    if (percentage >= 50) return 'bg-gradient-to-r from-yellow-500 to-orange-500';
    return 'bg-gradient-to-r from-red-500 to-rose-600';
  };

  const getHeightClass = () => {
    if (height === 'sm') return 'h-2';
    if (height === 'lg') return 'h-6';
    return 'h-4';
  };

  return (
    <div className="w-full">
      <div className={`w-full bg-gray-200 rounded-full overflow-hidden ${getHeightClass()}`}>
        <div
          className={`${getGradient()} ${getHeightClass()} rounded-full transition-all duration-500 ease-out shadow-sm`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showLabel && (
        <div className="flex justify-between items-center mt-2 text-xs text-gray-600">
          <span>{value.toLocaleString()} / {target.toLocaleString()}</span>
          <span className="font-semibold">{percentage.toFixed(1)}%</span>
        </div>
      )}
    </div>
  );
}
