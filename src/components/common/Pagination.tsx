import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  page: number;
  totalPages: number;
  onChange: (newPage: number) => void;
}

export const Pagination = ({ page, totalPages, onChange }: PaginationProps) => {
  const createPageRange = () => {
    const range = [];
    const start = Math.max(0, Math.min(page - 1, totalPages - 3));
    const end = Math.min(start + 3, totalPages);

    range.push('prev');
    for (let i = start; i < end; i++) {
      range.push(String(i + 1));
    }
    range.push('next');

    return range;
  };

  return (
    <div className="flex justify-center items-center gap-2 mt-4">
      {createPageRange().map((item) => (
        <button
          key={item}
          onClick={() => {
            if (item === 'prev' && page > 0) {
              onChange(page - 1);
            } else if (item === 'next' && page < totalPages - 1) {
              onChange(page + 1);
            } else if (item !== 'prev' && item !== 'next') {
              onChange(Number(item) - 1); // -1 because page is 0-based
            }
          }}
          disabled={
            (item === 'prev' && page === 0) ||
            (item === 'next' && page === totalPages - 1)
          }
          className={`w-9 h-9 flex items-center justify-center rounded 
            ${
              String(page + 1) === item
                ? 'bg-blue-600 text-white'
                : 'border border-slate-300 hover:bg-slate-100'
            }
            ${
              ((item === 'prev' && page === 0) ||
                (item === 'next' && page === totalPages - 1)) &&
              'opacity-50 cursor-not-allowed'
            }
          `}
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
};
