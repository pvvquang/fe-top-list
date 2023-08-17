"use-client";

import { useEffect, useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";
import { ReactNode, useState } from "react";
import ConditionalRender from "../ConditionalRender";

interface DropdownItem {
  id: string | number;
  label: string;
}
interface DropdownProps {
  options: DropdownItem[];
  children: ReactNode;
  mode?: "fixed" | "absolute";
}

function Dropdown({ options, children, mode = "absolute" }: DropdownProps) {
  const [openDropdown, setOpenDropdown] = useState(false);

  const ref = useRef<HTMLDivElement | null>(null);
  const refOptions = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = () => {
    setOpenDropdown(false);
  };

  useOnClickOutside(ref, handleClickOutside);

  useEffect(() => {
    const dropdownEle = ref.current;
    if (!dropdownEle) return;
    const { right, bottom } = dropdownEle.getBoundingClientRect();
    const optionsEle = refOptions.current;
    if (!optionsEle) return;
    optionsEle.style.right = window.innerWidth - right + "px";
    optionsEle.style.top = bottom + 4 + "px";
  }, [openDropdown]);

  return (
    <div className="relative" ref={ref}>
      <div onClick={() => setOpenDropdown(true)}>{children}</div>
      <ConditionalRender conditional={openDropdown}>
        <div
          className={`${mode} top-[calc(100%+4px)] right-0 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
          ref={refOptions}>
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownDefaultButton">
            {options.map((option) => (
              <li key={option.id}>
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                  {option.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </ConditionalRender>
    </div>
  );
}

export default Dropdown;
