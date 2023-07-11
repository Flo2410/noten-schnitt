import clsx from "clsx";
import React, { HTMLProps } from "react";

export const Card = React.forwardRef<HTMLDivElement, HTMLProps<HTMLDivElement>>(
  ({ children, className, ...props }, ref) => (
    <div
      className={clsx(
        "flex items-center justify-between overflow-x-auto rounded bg-white p-2 shadow-fhwn dark:bg-primary dark:shadow-fhwn-white",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);

Card.displayName = "Card";
