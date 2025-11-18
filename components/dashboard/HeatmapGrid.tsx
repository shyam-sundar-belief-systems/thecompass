'use client';

interface HeatmapCell {
  label: string;
  value: number;
}

interface HeatmapGridProps {
  data: { month: string; [key: string]: number | string }[];
  departments: string[];
}

export function HeatmapGrid({ data, departments }: HeatmapGridProps) {
  const getColorClass = (value: number) => {
    if (value >= 90) return 'bg-green-500 text-white';
    if (value >= 80) return 'bg-green-400 text-white';
    if (value >= 70) return 'bg-yellow-400 text-gray-900';
    if (value >= 60) return 'bg-orange-400 text-white';
    return 'bg-red-500 text-white';
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="p-3 text-left text-sm font-semibold text-gray-700 bg-gray-50 border-b-2 border-gray-200">
              Month
            </th>
            {departments.map((dept) => (
              <th
                key={dept}
                className="p-3 text-center text-sm font-semibold text-gray-700 bg-gray-50 border-b-2 border-gray-200"
              >
                {dept}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-gray-50 transition-colors">
              <td className="p-3 text-sm font-medium text-gray-900 border-b border-gray-200">
                {row.month}
              </td>
              {departments.map((dept) => {
                const value = row[dept.toLowerCase()] as number;
                return (
                  <td key={dept} className="p-2 border-b border-gray-200">
                    <div
                      className={`w-full h-12 rounded-lg flex items-center justify-center font-bold text-sm ${getColorClass(value)} shadow-sm`}
                    >
                      {value}%
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
