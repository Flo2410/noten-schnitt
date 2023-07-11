import clsx from "clsx";
import React, { HTMLProps } from "react";

export const Card = React.forwardRef<HTMLDivElement, HTMLProps<HTMLDivElement>>(
  ({ children, className, ...props }, ref) => (
    <div
      className={clsx(
        "flex items-center justify-between p-2 overflow-x-auto bg-white rounded md:flex-row dark:bg-primary shadow-fhwn dark:shadow-fhwn-white",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);

Card.displayName = "Card";
