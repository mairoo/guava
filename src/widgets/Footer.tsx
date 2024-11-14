import className from "classnames";
import React, { ComponentPropsWithoutRef, ReactNode } from "react";

interface FooterProps extends ComponentPropsWithoutRef<"footer"> {
  children?: ReactNode;
}

const Footer = ({ children, ...rest }: FooterProps) => {
  const classes = className(
    rest.className,
    "shadow-[0_-1px_3px_rgba(0,0,0,0.05)]",
  );

  return (
    <footer {...rest} className={classes}>
      {children}
    </footer>
  );
};

export default Footer;
