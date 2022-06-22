import Link from "next/link";
import React from "react";
import { FaGithub, FaInfoCircle } from "react-icons/fa";

const Footer = ({ className }: { className?: string }) => {
  return (
    <div className={`flex gap-8 mb-4 text-primary ${className ? className : ""}`}>
      <Link href={"https://github.com/Flo2410/noten-schnitt"}>
        <span className="flex items-center gap-2 transition duration-300 ease-in opacity-50 cursor-pointer hover:opacity-100">
          <FaGithub />
          Check out the Source
        </span>
      </Link>

      <Link href={"https://github.com/Flo2410/noten-schnitt/blob/main/README.md#notenschnitt"}>
        <span className="flex items-center gap-2 transition duration-300 ease-in opacity-50 cursor-pointer hover:opacity-100">
          <FaInfoCircle />
          About
        </span>
      </Link>
    </div>
  );
};

export default Footer;
