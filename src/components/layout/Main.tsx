import classNames from 'classnames';
import { ComponentPropsWithoutRef, ReactNode } from 'react';

interface MainProps extends ComponentPropsWithoutRef<'main'> {
  children?: ReactNode;
  className?: string;

  [key: string]: any;
}

export const Main = ({ children, ...rest }: MainProps) => (
  <main className={classNames(rest.className)} {...rest}>
    {children}
  </main>
);
