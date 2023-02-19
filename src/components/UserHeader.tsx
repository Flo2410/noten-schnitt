import React from "react";
import { User } from "types/user-v2.types";
import Button from "./Button";

const UserHeader = ({ user, onLogout }: { user: User; onLogout: () => void }) => {
  return (
    <div className="flex justify-center w-full mt-2 md:mt-4">
      <div className="flex flex-col justify-between w-full px-4 py-2 text-lg shadow-fhwn sm:items-center 2xl:w-1/2 sm:flex-row md:w-2/3 pwa:w-full dark:border">
        <span className="heading">{user.name}</span>
        <div className="flex gap-4">
          <span>Matr. Nr.: {user.mat_nummer}</span>
          <span>PKZ: {user.student_pkz}</span>
          <span>STG: {user.course}</span>
        </div>

        <Button onClick={() => onLogout()}>Logout</Button>
      </div>
    </div>
  );
};

export default UserHeader;
