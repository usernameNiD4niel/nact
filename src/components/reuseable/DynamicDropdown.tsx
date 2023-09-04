import { DynamicDropdownProps } from "@/constants/props";
import React, { useEffect, useRef, useState } from "react";
import { HiChevronDown } from "react-icons/hi2";

const DynamicDropdown: React.FC<DynamicDropdownProps> = ({
	dropDownItems,
	dropdownText,
}) => {
	// return (
	// <div className="dropdown dropdown-end">
	// 	<label tabIndex={0} className="btn m-1">
	// 		{dropdownText}
	// 	</label>
	// 	<ul
	// 		tabIndex={0}
	// 		className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
	// 		{dropDownItems.map((item, index) => (
	// 			<li key={index}>
	// 				<label htmlFor={`item${index}`}>
	// 					<input type="checkbox" id={`item${index}`} />
	// 					{item}
	// 				</label>
	// 			</li>
	// 		))}
	// 	</ul>
	// </div>
	// );
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement | null>(null);

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

	return (
		<div className="relative w-full" ref={dropdownRef}>
			<button
				type="button"
				onClick={() => setIsOpen((prev) => !prev)}
				className="flex items-center gap-x-2 px-3 py-2 text-base w-full">
				<span
					className={`inline-block ${
						dropdownText === "Product Name" && "min-w-[120px]"
					}`}>
					{dropdownText}
				</span>{" "}
				<span>
					<HiChevronDown />
				</span>
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
								onClick={() => {
									if (dropdownText === "Sort") {
										setIsOpen(false);
									}
								}}
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
