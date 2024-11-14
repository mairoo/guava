import className from "classnames";
import React, {ComponentPropsWithoutRef, ReactNode} from "react";

interface CardProps extends ComponentPropsWithoutRef<"div"> {
    children?: ReactNode;
}

const Card = ({children, ...rest}: CardProps) => {
    const classes = className(
        "rounded-md shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-100",
        rest.className,
    );
    return (
        <div {...rest} className={classes}>
            {children}
        </div>
    );
};

export default Card;
