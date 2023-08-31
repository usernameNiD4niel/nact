import React, { useState, useRef, useEffect } from "react";
import { BsChevronDown } from "react-icons/bs";

const Dropdown: React.FC = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    window.addEventListener("click", handleOutsideClick);

    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  return (
    <div className="dropdown" ref={dropdownRef}>
      <label
        tabIndex={0}
        className="flex gap-x-2 items-center justify-center p-2 rounded outline outline-1 outline-black m-1"
        onClick={toggleDropdown}
      >
        <span>Options</span>
        <BsChevronDown />
      </label>
      {isDropdownOpen && (
        <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
          <li>
            <a onClick={closeDropdown}>Item 1</a>
          </li>
          <li>
            <a onClick={closeDropdown}>Item 2</a>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
