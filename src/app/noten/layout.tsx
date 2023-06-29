import { ReactNode } from "react";

const NotenLayout = ({ children, nav }: { children: ReactNode; nav: ReactNode }) => {
  return (
    <>
      {nav}
      {children}
    </>
  );
};

export default NotenLayout;
