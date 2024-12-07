import React from 'react';

const getGridClassByColumnCount = (count: number) => {
  const gridClasses: { [key: number]: string } = {
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    5: 'grid-cols-5',
    6: 'grid-cols-6',
    // 필요한 만큼 추가
  };

  return gridClasses[count] || 'grid-cols-4';
};

export const TableHeader = ({ columns }: { columns: string[] }) => {
  const gridClass = getGridClassByColumnCount(columns.length);

  return (
    <div
      className={`grid ${gridClass} gap-4 p-4 bg-lime-50 border-y font-medium`}
    >
      {columns.map((col, index) => (
        <div
          key={index}
          className={`text-sm text-slate-600 ${
            // 특정 열에 대한 추가 스타일링이 필요한 경우
            index === columns.length - 1 ? 'text-right' : ''
          }`}
        >
          {col}
        </div>
      ))}
    </div>
  );
};
