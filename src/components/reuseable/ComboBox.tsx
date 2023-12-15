// CityDropdown.tsx
import { uniqueCities } from "@/constants/objects";
import "@/index.css";
import React, { useState, useRef, useEffect } from "react";
type ComboBoxProps = {
  inputValue: string;
  isDisabled?: boolean;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
};

const ComboBox: React.FC<ComboBoxProps> = ({
  inputValue,
  setInputValue,
  isDisabled,
}) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [notFound, setNotFound] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setInputValue(input);

    // Filter cities that contain the input text
    const filteredCities = uniqueCities.filter((city) =>
      city.toLowerCase().includes(input.toLowerCase())
    );
    setSuggestions(filteredCities);

    // Show or hide dropdown based on input length
    setShowDropdown(input.length > 0);
    setNotFound(filteredCities.length === 0);
  };

  const handleSuggestionClick = (city: string) => {
    console.log(city);

    if (city !== "City not found") {
      setInputValue(city);
    }
    setShowDropdown(false);
  };

  const handleWindowClick = (e: MouseEvent) => {
    // Check if the click event occurred outside the input and the dropdown
    if (
      inputRef.current &&
      !inputRef.current.contains(e.target as Node) &&
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node)
    ) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    // Focus the input when the dropdown is shown
    if (showDropdown && inputRef.current) {
      inputRef.current.focus();
    }

    // Add a click event listener to the window to handle clicks outside the input and dropdown
    window.addEventListener("click", handleWindowClick);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("click", handleWindowClick);
    };
  }, [showDropdown]);

  return (
    <div className="relative">
      <label className="relative" htmlFor="city">
        <input
          type="text"
          className={`w-full text-gray-600 h-12 px-3 text-sm bg-white border-[1px] rounded-[4px] border-black border-opacity-20 outline-none focus:border-[#017DC3] focus:text-black transition duration-200 disabled:bg-gray-100`}
          value={inputValue}
          name="city"
          id="city"
          disabled={isDisabled}
          onChange={handleInputChange}
          autoComplete="false"
        />
        <span
          className={`${`text-[14px] text-black hover:cursor-text text-opacity-30 absolute left-0 top-[2px] mx-2 px-2 transition duration-200 bg-white input-text whitespace-nowrap`} ${
            inputValue && "input-contains"
          }`}
        >
          City
        </span>
      </label>
      {showDropdown && (
        <div
          ref={dropdownRef}
          className="absolute z-10 bg-white border border-gray-300 rounded w-full"
        >
          {notFound ? (
            <div className="px-4 py-2 text-red-500">City not found</div>
          ) : (
            suggestions.map((city, index) => (
              <div
                key={index}
                className="text-sm px-4 py-2 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSuggestionClick(city)}
              >
                {city}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default ComboBox;
