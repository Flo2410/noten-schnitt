import { ReactNode } from "react";

const GradesLayout = async ({
  children,
  nav,
  grades,
}: {
  children: ReactNode;
  nav: ReactNode;
  grades: ReactNode;
}) => {
  return (
    <>
      <div className="px-2 pt-2 space-y-2 dark:text-white text-primary">
        {nav}
        {grades}
        {children}
      </div>
    </>
  );
};

export default GradesLayout;
