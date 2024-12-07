export const TableHeader = ({ columns }: { columns: string[] }) => (
  <div
    className={`grid grid-cols-${columns.length} gap-4 p-4 bg-slate-50 border-y font-medium`}
  >
    {columns.map((col, index) => (
      <div key={index} className="text-sm text-slate-600">
        {col}
      </div>
    ))}
  </div>
);
