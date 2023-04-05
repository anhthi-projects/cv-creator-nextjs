import { useEffect, useRef } from "react";

export const useOutsideClick = <ElementType extends HTMLElement>(
  callback: () => void
) => {
  const elementRef = useRef<ElementType>(null);

  useEffect(() => {
    const handleClick = (event: any) => {
      if (elementRef.current && !elementRef.current.contains(event.target)) {
        callback();
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return elementRef;
};
