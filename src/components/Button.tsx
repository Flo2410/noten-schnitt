import { ButtonHTMLAttributes, FC } from "react";

const Button: FC<
  ButtonHTMLAttributes<HTMLButtonElement> & { inverted_colors?: boolean }
> = ({ children, className, inverted_colors = false, ...props }) => {
  return (
    <button
      className={`flex h-8 items-center justify-center rounded border-2 px-4 text-center shadow-fhwn 
      ${
        inverted_colors
          ? "border-white bg-white text-primary hover:bg-primary hover:text-white dark:border-primary dark:bg-primary dark:text-white dark:hover:bg-white dark:hover:text-primary"
          : "border-primary bg-primary text-white hover:bg-white hover:text-primary dark:border-white dark:bg-white dark:text-primary dark:hover:bg-primary dark:hover:text-white"
      } ${className ? className : ""}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
