import React, { ButtonHTMLAttributes, FC } from "react";

const Button: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, className, ...props }) => {
  return (
    <button
      className={`flex justify-center h-8 px-4 text-center items-center text-white border-2 rounded-md shadow-fhwn bg-primary hover:bg-white hover:text-primary border-primary dark:bg-white dark:border-white dark:text-primary dark:hover:text-white dark:hover:bg-primary ${
        className ? className : ""
      }`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
