import Link from "next/link";
import { FaGithub, FaInfoCircle } from "react-icons/fa";
import ThemeSelect from "./ThemeSelect";

const Footer = ({ className }: { className?: string }) => {
  return (
    <div
      className={`flex w-full justify-around self-center py-4 text-primary dark:text-white md:mx-0 md:w-2/3 2xl:w-1/2 pwa:w-full  ${
        className ? className : ""
      }`}
    >
      <div></div>
      <div className="flex gap-8">
        <Link href={"https://github.com/Flo2410/noten-schnitt"}>
          <span className="flex cursor-pointer items-center gap-2 opacity-75 transition duration-200 ease-in hover:opacity-100">
            <FaGithub />
            Check out the Source
          </span>
        </Link>
        <Link
          href={
            "https://github.com/Flo2410/noten-schnitt/blob/main/README.md#notenschnitt"
          }
        >
          <span className="flex cursor-pointer items-center gap-2 opacity-75 transition duration-200 ease-in hover:opacity-100">
            <FaInfoCircle />
            About
          </span>
        </Link>
      </div>

      <ThemeSelect />
    </div>
  );
};

export default Footer;
