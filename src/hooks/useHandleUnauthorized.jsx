import { redirect } from "react-router-dom";

const useHandleUnauthorized = () => {
  const handleUnauthorized = () => {
    localStorage.setItem(import.meta.env.VITE_TOKEN_NAME, null);
    redirect("/");
    console.clear();
  };

  return [handleUnauthorized];
};

export default useHandleUnauthorized;
