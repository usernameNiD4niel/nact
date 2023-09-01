import React, { useState, useRef, useEffect } from "react";
import { BsChevronDown } from "react-icons/bs";
import { LiaEdit } from "react-icons/lia";
import { RiDeleteBin6Line } from "react-icons/ri";

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
    <div className="dropdown dropdown-end" ref={dropdownRef}>
      <label
        tabIndex={0}
        className="flex gap-x-2 items-center justify-center p-2 rounded border border-1 m-1 text-sm hover:cursor-pointer"
        onClick={toggleDropdown}
      >
        <span>Options</span>
        <BsChevronDown />
      </label>
      {isDropdownOpen && (
        <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded w-48">
          <li>
            <a
              onClick={closeDropdown}
              className="flex items-center p-2 gap-x-2"
            >
              <LiaEdit />
              Edit
            </a>
          </li>
          <li>
            <a
              onClick={closeDropdown}
              className="flex items-center p-2 gap-x-2"
            >
              <RiDeleteBin6Line />
              Delete
            </a>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
