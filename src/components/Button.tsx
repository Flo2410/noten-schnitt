import React, { ButtonHTMLAttributes, FC } from "react";

const Button: FC<ButtonHTMLAttributes<HTMLButtonElement> & { inverted_colors?: boolean }> = ({
  children,
  className,
  inverted_colors = false,
  ...props
}) => {
  return (
    <button
      className={`flex justify-center h-8 px-4 text-center items-center border-2 rounded shadow-fhwn 
      ${
        inverted_colors
          ? "text-primary bg-white hover:bg-primary hover:text-white border-white dark:bg-primary dark:border-primary dark:text-white dark:hover:text-primary dark:hover:bg-white"
          : "text-white bg-primary hover:bg-white hover:text-primary border-primary dark:bg-white dark:border-white dark:text-primary dark:hover:text-white dark:hover:bg-primary"
      } ${className ? className : ""}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
