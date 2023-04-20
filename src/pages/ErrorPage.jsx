import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div className="h-full flex flex-col justify-center items-center">
      <h1 className="text-center text-6xl font-extrabold text-white">
        JMGallery
      </h1>
      <p className="text-center text-gray-200 mt-3">Al parecer hay un error.</p>
      <p className="text-center text-gray-200 mt-3">
        {error.statusText || error.message}
      </p>
    </div>
  );
};

export default ErrorPage;
