import className from "classnames";
import React, { ComponentPropsWithoutRef, ReactNode } from "react";

interface MainProps extends ComponentPropsWithoutRef<"main"> {
  children?: ReactNode;
}

const Main = ({ children, ...rest }: MainProps) => {
  const classes = className(rest.className, "flex-grow");

  return (
    <main {...rest} className={classes}>
      {children}
    </main>
  );
};

export default Main;
