// CityDropdown.tsx
import { uniqueCities } from "@/constants/objects";
import React, { useState, useRef, useEffect } from "react";

type ComboBoxProps = {
	inputValue: string;
	setInputValue: React.Dispatch<React.SetStateAction<string>>;
};

const ComboBox: React.FC<ComboBoxProps> = ({ inputValue, setInputValue }) => {
	const [suggestions, setSuggestions] = useState<string[]>([]);
	const [showDropdown, setShowDropdown] = useState<boolean>(false);
	const [notFound, setNotFound] = useState<boolean>(false);
	const inputRef = useRef<HTMLInputElement | null>(null);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const input = e.target.value;
		setInputValue(input);

		// Filter cities that contain the input text
		const filteredCities = uniqueCities.filter((city) =>
			city.toLowerCase().includes(input.toLowerCase()),
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

	useEffect(() => {
		// Focus the input when the dropdown is shown
		if (showDropdown && inputRef.current) {
			inputRef.current.focus();
		}
	}, [showDropdown]);

	return (
		<div className="relative">
			<input
				type="text"
				placeholder="City"
				value={inputValue}
				onChange={handleInputChange}
				// onBlur={handleInputBlur}
				className="w-full text-gray-600 h-12 px-3 text-sm bg-white border-[1px] rounded-[4px] border-black border-opacity-20 outline-none focus:border-[#017DC3] focus:text-black transition duration-200"
				ref={inputRef}
			/>
			{showDropdown && (
				<div className="absolute z-10 bg-white border border-gray-300 rounded w-full">
					{notFound ? (
						<div className="px-4 py-2 text-red-500">City not found</div>
					) : (
						suggestions.map((city, index) => (
							<div
								key={index}
								className="text-sm px-4 py-2 cursor-pointer hover:bg-gray-100"
								onClick={() => handleSuggestionClick(city)}>
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
