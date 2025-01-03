import { Info } from 'lucide-react';
import React from 'react';

export const InfoAlert = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center gap-2 p-3 bg-amber-50 rounded-md">
    <Info className="h-4 w-4 text-orange-900 flex-shrink-0" />
    <span className="text-sm text-orange-900">{children}</span>
  </div>
);
