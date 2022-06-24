import React from "react";
import { User } from "types/user.types";

const UserHeader = ({ user, onLogout }: { user: User; onLogout: () => void }) => {
  return (
    <div className="flex justify-center w-full mt-2 md:mt-4">
      <div className="flex flex-col justify-between w-full px-4 py-2 text-lg shadow-fhwn sm:items-center 2xl:w-1/2 sm:flex-row md:w-2/3 pwa:w-full">
        <span className="heading">{user.name}</span>
        <div className="flex gap-4">
          <span>Matr. Nr.: {user.mat_nummer}</span>
          <span>PKZ: {user.pers_nummer}</span>
          <span>STG: {user.course}</span>
        </div>
        <button
          className="h-8 px-4 text-white border-2 rounded-md shadow-fhwn bg-primary hover:bg-white hover:text-primary border-primary"
          onClick={() => onLogout()}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserHeader;
