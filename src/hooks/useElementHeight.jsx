import React, { useEffect, useState } from "react";

const useElementHeight = (elementId) => {
  const [height, setHeight] = useState();
  const handleReady = () => {
    setHeight(document.getElementById(elementId).offsetHeight);
  };

  useEffect(() => {
    document.addEventListener("DOMContentLoaded", handleReady);
    handleReady();
    return () => document.removeEventListener("DOMContentLoaded", handleReady);
  }, []);

  return height;
};

export default useElementHeight;
