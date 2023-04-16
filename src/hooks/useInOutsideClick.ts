import { useEffect, useRef } from "react";

interface UseInOutsideClick {
  insideCallback?: () => void;
  outsideCallback?: () => void;
}

export const useInOutsideClick = <ElementType extends HTMLElement>({
  insideCallback,
  outsideCallback,
}: UseInOutsideClick) => {
  const elementRef = useRef<ElementType>(null);

  useEffect(() => {
    const handleClick = (event: any) => {
      if (elementRef.current && elementRef.current.contains(event.target)) {
        typeof insideCallback === "function" && insideCallback();
        return;
      }

      if (elementRef.current && !elementRef.current.contains(event.target)) {
        typeof outsideCallback === "function" && outsideCallback();
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
