import React from "react";
import { User } from "types/user.types";

const UserHeader = ({ user, onLogout }: { user: User; onLogout: () => void }) => {
  return (
    <div className="flex justify-center w-full mt-2 md:mt-4">
      <div className="flex flex-col justify-between w-full px-4 py-2 mx-2 text-lg bg-purple-500 rounded-lg shadow-lg sm:flex-row md:w-1/2 md:mx-0">
        <div className="flex gap-4">
          <span>{user.name}</span>
          <span>Matr. Nr.: {user.mat_nummer}</span>
          <span>PKZ: {user.pers_nummer}</span>
          <span>STG: {user.course}</span>
        </div>
        <button
          className="px-4 bg-indigo-400 rounded-lg shadow-md hover:bg-indigo-500"
          onClick={() => onLogout()}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserHeader;
