import { DynamicDropdownProps } from "@/constants/props";
import React, { useEffect, useRef, useState } from "react";
import { HiChevronDown } from "react-icons/hi2";

const DynamicDropdown: React.FC<DynamicDropdownProps> = ({
	dropDownItems,
	dropdownText,
	setUniqueItems,
	uniqueItems,
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement | null>(null);
	const [counter, setCounter] = useState(0);

	useEffect(() => {
		const handleOutsideClick = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};

		window.addEventListener("click", handleOutsideClick);

		return () => {
			window.removeEventListener("click", handleOutsideClick);
		};
	}, []);

	const handleCheckboxChange = (
		event: React.ChangeEvent<HTMLInputElement>,
		i: string,
	) => {
		if (dropdownText === "Sort") {
			setIsOpen(false);
			return;
		}

		const target = event.target as HTMLInputElement;

		const isChecked = target.checked;

		if (isChecked) {
			setCounter((prevCount) => prevCount + 1); // Increment the counter
			uniqueItems.forEach((item) => {
				if (item === i) {
					return;
				}
			});
			setUniqueItems((prevItem) => [...prevItem, i]);
		} else {
			setCounter((prevCount) => prevCount - 1); // Decrement the counter
			const uItem = uniqueItems.filter((item) => item !== i);
			setUniqueItems(uItem);
		}
	};

	return (
		<div className="relative w-full" ref={dropdownRef}>
			<button
				type="button"
				onClick={() => setIsOpen((prev) => !prev)}
				className="flex items-center gap-x-3 px-3 py-2 text-sm w-full text-black">
				<p className="flex items-center gap-x-1">
					<span
						className={`inline-block ${
							dropdownText === "Product Name" ? "min-w-[105px]" : "w-fit"
						}`}>
						{dropdownText}
					</span>{" "}
					{counter !== 0 && (
						<span className="text-xs bg-gray-300 px-1 font-medium">
							{counter}
						</span>
					)}
				</p>
				<span className="text-gray-500 text-xs">
					<HiChevronDown />
				</span>
				{dropdownText !== "Price" && dropdownText !== "Sort" && (
					<div className="h-5 w-[1px] bg-slate-200" />
				)}
			</button>
			<ul
				className={`w-52 bg-white z-[1] py-3 ${
					isOpen
						? "flex items-center flex-col absolute top-9 rounded-md drop-shadow-lg right-1"
						: "hidden"
				} ${dropdownText === "Sort" && "left-1"}`}>
				{dropDownItems.map((item, index) => (
					<li className="flex w-full items-center justify-center" key={index}>
						<label className="w-full flex justify-center items-center gap-x-2 hover:cursor-pointer py-2 text-sm pl-4 text-gray-900 hover:bg-slate-100">
							<input
								type="checkbox"
								className={`${dropdownText === "Sort" && "hidden"}`}
								onChange={(e) => handleCheckboxChange(e, item)}
								checked={uniqueItems.includes(item)}
							/>
							<span className="w-full">{item}</span>
						</label>
					</li>
				))}
			</ul>
		</div>
	);
};

export default DynamicDropdown;
