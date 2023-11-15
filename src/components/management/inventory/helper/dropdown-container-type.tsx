import DisplayErrorMessage from "@/components/DisplayErrorMessage";
import { containerType } from "@/constants/arrays";
import {
	animatedInputClass,
	animatedSpanClass,
} from "@/constants/reusable-class";
import { FC, useState } from "react";

interface DropdownContainerTypeProps {
	value: string;
	setValue: React.Dispatch<React.SetStateAction<string>>;
	containerTypeError: string;
}

const DropdownContainerType: FC<DropdownContainerTypeProps> = ({
	setValue,
	value,
	containerTypeError,
}) => {
	const [isShowing, setIsShowing] = useState(false);
	const handleShowContainer = () => {
		setIsShowing((prev) => !prev);
	};
	return (
		<div className="relative inline-block w-full" onClick={handleShowContainer}>
			<div className="flex flex-col w-full">
				<label htmlFor="container" className="relative">
					<button
						type="button"
						className={`flex justify-between items-center ${animatedInputClass}`}
						id="container"
						aria-expanded="true"
						name="container"
						aria-haspopup="true">
						{value}
						<svg
							className={`-mr-1 h-5 w-5 text-gray-400 absolute right-4 ${
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
					<span className={`${animatedSpanClass} ${value && "input-contains"}`}>
						Container Type
					</span>
				</label>
			</div>
			<div
				className={`absolute left-0 z-[5] mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${
					isShowing ? "block" : "hidden"
				}`}
				role="menu"
				aria-orientation="vertical"
				aria-labelledby="container"
				tabIndex={-1}>
				<div className="" role="none">
					{containerType.map((container) => (
						<a
							className="text-gray-700 block px-4 py-2 cursor-pointer text-sm hover:bg-gray-300"
							role="menuitem"
							tabIndex={-1}
							onClick={() => setValue(container)}
							id={container}
							key={container}>
							{container}
						</a>
					))}
					{/* <a
						className="text-gray-700 block px-4 py-2 cursor-pointer text-sm hover:bg-gray-300"
						role="menuitem"
						tabIndex={-1}
						onClick={() => setValue("Female")}
						id="menu-item-1">
						Female
					</a> */}
				</div>
			</div>
			{containerTypeError && (
				<DisplayErrorMessage errorMessage="Container Type cannot be empty" />
			)}
		</div>
	);
};

export default DropdownContainerType;
