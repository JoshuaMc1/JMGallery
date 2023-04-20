import { useMemo } from "react";

const useGetToken = () => {
  const getToken = () => {
    const token =
      JSON.parse(localStorage?.getItem(import.meta.env.VITE_TOKEN_NAME)) ??
      null;
    return token;
  };

  return useMemo(getToken, []);
};

export default useGetToken;
