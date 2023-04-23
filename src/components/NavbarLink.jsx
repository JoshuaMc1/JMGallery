import { Link } from "react-router-dom";

const NavbarLink = ({ to = "/", children, active = false, fs = "text-lg" }) => {
  const commonClass = "block py-2 pl-3 pr-4";
  const activeClass = `${commonClass} ${fs} text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white`;
  const defaultClass = `${commonClass} ${fs} text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent`;

  return (
    <>
      <Link className={`${active ? activeClass : defaultClass} `} to={to}>
        {children}
      </Link>
    </>
  );
};

export default NavbarLink;
