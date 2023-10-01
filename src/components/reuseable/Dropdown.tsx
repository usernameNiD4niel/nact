import React, { useState, useRef, useEffect } from "react";
import {
	HiChevronDown,
	HiOutlinePencilSquare,
	HiOutlineTrash,
} from "react-icons/hi2";
import SuccessModal from "./SuccessModal";

type DropdownProps = {
	setIsDisabled: React.Dispatch<React.SetStateAction<boolean>>;
};

const Dropdown: React.FC<DropdownProps> = ({ setIsDisabled }) => {
	const [isDropdownOpen, setDropdownOpen] = useState(false);
	const [isModalWarning, setIsModalWarning] = useState(false);
	const [validation, setValidation] = useState("");

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

	const handleEditAction = () => {
		console.log("handleEditAction");

		setIsDisabled(false);
		closeDropdown();
	};

	const handleDeleteAction = () => {
		setIsModalWarning(true);
		closeDropdown();
	};

	return (
		<div className="dropdown dropdown-end" ref={dropdownRef}>
			<label
				tabIndex={0}
				className="flex gap-x-2 items-center justify-center p-2 rounded border border-1 m-1 text-sm hover:cursor-pointer"
				onClick={toggleDropdown}>
				<span className="text-xs md:text-sm font-semibold">Options</span>
				<HiChevronDown />
			</label>
			{isDropdownOpen && (
				<ul className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded w-48">
					<li>
						<button
							onClick={handleEditAction}
							className="flex items-center p-2 gap-x-2 text-xs md:text-sm">
							<HiOutlinePencilSquare />
							Edit
						</button>
					</li>
					<li>
						<button
							onClick={handleDeleteAction}
							className="flex items-center p-2 gap-x-2 text-xs md:text-sm">
							<HiOutlineTrash />
							Delete
						</button>
					</li>
				</ul>
			)}
			{isModalWarning && (
				<SuccessModal
					message="Are you sure you want to delete this supplier item? You cannot undo this action"
					redirectText="Go to Supplier Table"
					redirectTo="/supplier"
					setValidation={setValidation}
					title="Are you sure?"
					validation={validation}
				/>
			)}
		</div>
	);
};

export default Dropdown;
