import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Use requestAnimationFrame to ensure scroll happens after rendering
    window.requestAnimationFrame(() => {
      window.scrollTo(0, 0);
    });
  }, [pathname]); // Only run this effect when pathname changes

  return null; // This component does not render anything
};

export default ScrollTop;
