import { useEffect } from "react";
import { useLocation } from "react-router-dom";

//forces scroll to top if page reloads / changes component

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}