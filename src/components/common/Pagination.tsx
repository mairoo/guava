import { ChevronLeft, ChevronRight } from 'lucide-react';

export const Pagination = () => (
  <div className="flex justify-center items-center gap-2 mb-2">
    {['prev', '1', '2', '3', '4', 'next'].map((item, _) => (
      <button
        key={item}
        className={`w-9 h-9 flex items-center justify-center rounded ${
          item === '2'
            ? 'bg-blue-600 text-white'
            : 'border border-slate-300 hover:bg-slate-100'
        }`}
      >
        {item === 'prev' ? (
          <ChevronLeft className="h-4 w-4" />
        ) : item === 'next' ? (
          <ChevronRight className="h-4 w-4" />
        ) : (
          item
        )}
      </button>
    ))}
  </div>
);
