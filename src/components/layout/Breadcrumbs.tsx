import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
} from '@/components/ui/breadcrumb';
import { cn } from '@/lib/utils';

interface BreadcrumbItem {
  text: string;
  url?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  marginTop?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16;
  marginLeft?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16;
}

const marginTopClasses = {
  0: 'mt-0',
  1: 'mt-1',
  2: 'mt-2',
  3: 'mt-3',
  4: 'mt-4',
  5: 'mt-5',
  6: 'mt-6',
  8: 'mt-8',
  10: 'mt-10',
  12: 'mt-12',
  16: 'mt-16',
} as const;

const marginLeftClasses = {
  0: 'ml-0',
  1: 'ml-1',
  2: 'ml-2',
  3: 'ml-3',
  4: 'ml-4',
  5: 'ml-5',
  6: 'ml-6',
  8: 'ml-8',
  10: 'ml-10',
  12: 'ml-12',
  16: 'ml-16',
} as const;

export const Breadcrumbs = ({
  items,
  marginTop = 0,
  marginLeft = 0,
}: BreadcrumbsProps) => {
  return (
    <Breadcrumb
      className={cn(marginTopClasses[marginTop], marginLeftClasses[marginLeft])}
    >
      <BreadcrumbList>
        {items.map((item, index) => (
          <li key={index} className="inline-flex items-center gap-1.5">
            {index > 0 && (
              <span
                role="presentation"
                aria-hidden="true"
                className="text-muted-foreground/40"
              >
                /
              </span>
            )}
            {index === items.length - 1 ? (
              <span className="text-muted-foreground font-medium">
                {item.text}
              </span>
            ) : (
              <a
                href={item.url ?? '#'}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.text}
              </a>
            )}
          </li>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
