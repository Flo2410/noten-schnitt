import { ReactNode } from "react";

const NotenLayout = async ({
  children,
  nav,
  noten,
}: {
  children: ReactNode;
  nav: ReactNode;
  noten: ReactNode;
}) => {
  return (
    <>
      <div className="px-2 pt-2 space-y-2 dark:text-white text-primary">
        {nav}
        {noten}
        {children}
      </div>
    </>
  );
};

export default NotenLayout;
