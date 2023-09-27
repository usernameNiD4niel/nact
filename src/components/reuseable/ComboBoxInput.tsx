import "@/index.css";
import React, { useState, useRef, useEffect } from "react";
type ComboBoxProps = {
	inputValue: string;
	setInputValue: React.Dispatch<React.SetStateAction<string>>;
};

const ComboBoxInput: React.FC<ComboBoxProps> = ({
	inputValue,
	setInputValue,
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
		const filteredSupplierName = [
			"Supplier 1",
			"Supplier 2",
			"Supplier 3",
			"Supplier 4",
			"Supplier 5",
		].filter((supplierName) =>
			supplierName.toLowerCase().includes(input.toLowerCase()),
		);
		setSuggestions(filteredSupplierName);

		// Show or hide dropdown based on input length
		setShowDropdown(input.length > 0);
		setNotFound(filteredSupplierName.length === 0);
	};

	const handleSuggestionClick = (supplierName: string) => {
		console.log(supplierName);

		if (supplierName !== "Supplier name not found") {
			setInputValue(supplierName);
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
			<label className="relative" htmlFor="supplierName">
				<input
					type="text"
					className={`w-full text-gray-600 h-12 px-3 text-sm bg-white border-[1px] rounded-[4px] border-black border-opacity-20 outline-none focus:border-[#017DC3] focus:text-black transition duration-200`}
					value={inputValue}
					name="supplierName"
					id="supplierName"
					onChange={handleInputChange}
					autoComplete="no"
				/>
				<span
					className={`${`text-[14px] text-black hover:cursor-text text-opacity-30 absolute left-0 top-[2px] mx-2 px-2 transition duration-200 bg-white input-text whitespace-nowrap`} ${
						inputValue && "input-contains"
					}`}>
					Supplier Name
				</span>
			</label>
			{showDropdown && (
				<div
					ref={dropdownRef}
					className="absolute z-10 bg-white border border-gray-300 rounded w-full">
					{notFound ? (
						<div className="px-4 py-2 text-red-500">
							Supplier name not found
						</div>
					) : (
						suggestions.map((supplier, index) => (
							<div
								key={index}
								className="text-sm px-4 py-2 cursor-pointer hover:bg-gray-100"
								onClick={() => handleSuggestionClick(supplier)}>
								{supplier}
							</div>
						))
					)}
				</div>
			)}
		</div>
	);
};

export default ComboBoxInput;
