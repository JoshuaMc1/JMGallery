import { Link } from "react-router-dom";
import { useMemo } from "react";

const Brand = ({ to = "/", logoPath = "/logo.svg", name = "" }) => {
  const memoizedLogo = useMemo(
    () => (
      <img src={logoPath} className="h-6 mr-3 sm:h-9" alt="Logo de la página" />
    ),
    [logoPath]
  );

  return (
    <Link to={to} className="flex items-center">
      {memoizedLogo}
      <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
        {name}
      </span>
    </Link>
  );
};

export default Brand;
