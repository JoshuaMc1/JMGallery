import { useState, useCallback, useLayoutEffect } from "react";

const useScreenSize = () => {
  const [width, setWidth] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth;
    }
    return 0;
  });
  const [height, setHeight] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerHeight;
    }
    return 0;
  });

  useLayoutEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleResize = useCallback(() => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  }, []);

  return { width, height };
};

export default useScreenSize;
