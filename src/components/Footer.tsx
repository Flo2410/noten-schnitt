import Link from "next/link";
import React from "react";
import { FaGithub } from "react-icons/fa";

const Footer = ({ className }: { className?: string }) => {
  return (
    <div className={`mb-4 text-black ${className ? className : ""}`}>
      <Link href={"https://github.com/Flo2410/noten-schnitt"}>
        <span className="flex items-center gap-2 cursor-pointer">
          <FaGithub />
          Check out the Source
        </span>
      </Link>
    </div>
  );
};

export default Footer;
