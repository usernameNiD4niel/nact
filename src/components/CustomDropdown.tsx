import { useState } from "react";
import { labelClass } from "../../constants/reusable-class";
import { CustomDropdownProps } from "../../constants/props";

const CustomDropdown = ({
	gender,
	setGender,
}: CustomDropdownProps): JSX.Element => {
	const [isShowing, setIsShowing] = useState(false);
	const handleShowGender = () => {
		setIsShowing((prev) => !prev);
	};
	return (
		<div className="relative inline-block w-full" onClick={handleShowGender}>
			<div className="flex flex-col w-full">
				<label htmlFor="gender" className={labelClass}>
					Gender
				</label>
				<button
					type="button"
					className="inline-flex justify-start relative text-start gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-500 hover:bg-gray-50"
					id="gender"
					aria-expanded="true"
					name="gender"
					aria-haspopup="true">
					{gender}
					<svg
						className={`-mr-1 h-5 w-5 text-gray-400 absolute right-2 ${
							isShowing ? "rotate-180" : "rotate-0"
						}`}
						viewBox="0 0 20 20"
						fill="currentColor"
						aria-hidden="true">
						<path
							fillRule="evenodd"
							d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
							clipRule="evenodd"
						/>
					</svg>
				</button>
			</div>
			<div
				className={`absolute left-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${
					isShowing ? "block" : "hidden"
				}`}
				role="menu"
				aria-orientation="vertical"
				aria-labelledby="gender"
				tabIndex={-1}>
				<div className="" role="none">
					<a
						className="text-gray-700 block px-4 py-2 cursor-pointer text-sm hover:bg-gray-300"
						role="menuitem"
						tabIndex={-1}
						onClick={() => setGender("Male")}
						id="menu-item-0">
						Male
					</a>
					<a
						className="text-gray-700 block px-4 py-2 cursor-pointer text-sm hover:bg-gray-300"
						role="menuitem"
						tabIndex={-1}
						onClick={() => setGender("Female")}
						id="menu-item-1">
						Female
					</a>
				</div>
			</div>
		</div>
	);
};

export default CustomDropdown;
