import className from "classnames";
import { ComponentPropsWithoutRef, ReactNode } from "react";

interface DrawerHeadingProps extends ComponentPropsWithoutRef<"div"> {
  children?: ReactNode;
}

const DrawerHeading = ({ children, ...rest }: DrawerHeadingProps) => {
  const classes = className(
    rest.className,
    "font-bold border-l-4 border-b px-2 py-1",
  );

  return (
    <div>
      <h1 {...rest} className={classes}>
        {children}
      </h1>
    </div>
  );
};

export default DrawerHeading;
