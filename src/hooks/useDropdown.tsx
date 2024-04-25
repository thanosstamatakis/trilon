import { useState, useEffect, useRef, useCallback } from "react";

export const useDropdown = <T extends HTMLElement>() => {
  const [isOpen, setIsOpen] = useState(false);

  const ref = useRef<T>(null);

  const toggle = useCallback(() => setIsOpen(!isOpen), [isOpen]);
  const close = useCallback(() => setIsOpen(false), []);

  const handleClickOutside = useCallback((event: MouseEvent | FocusEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("focusout", handleClickOutside, true);
      document.addEventListener("click", handleClickOutside, true);
      document.addEventListener("dragenter", handleClickOutside, true);
    } else {
      document.removeEventListener("click", handleClickOutside, true);
      document.removeEventListener("dragenter", handleClickOutside, true);
      document.removeEventListener("focusout", handleClickOutside, true);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
      document.removeEventListener("dragenter", handleClickOutside, true);
      document.removeEventListener("focusout", handleClickOutside, true);
    };
  }, [ref, isOpen, handleClickOutside]);

  return { ref, isOpen, close, toggle };
};
