import { getYear } from "../helpers/helpers";
import { Link } from "react-router-dom";
import { Footer } from "flowbite-react";

const FooterComponent = () => {
  return (
    <Footer container={true} className="rounded-none">
      <div className="w-full text-center">
        <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
          <Link to="/" className="flex items-center mb-4 sm:mb-0">
            <img src="/logo.svg" className="h-8 mr-3" alt="JMProjects Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              JMProjects
            </span>
          </Link>
          <Footer.LinkGroup>
            <li>
              <Link to="/policy" className="mr-4 hover:underline md:mr-6 ">
                Políticas de privacidad
              </Link>
            </li>
          </Footer.LinkGroup>
        </div>
        <Footer.Divider />
        <Footer.Copyright by="JMProjects" year={getYear()} />
      </div>
    </Footer>
  );
};

export default FooterComponent;
