import React from "react";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { IoCloseCircle } from "react-icons/io5";
import { Link } from "react-router-dom";

type SuccessModalProps = {
	message: string;
	title: string;
	redirectTo: string;
	redirectText: string;
	validation: string;
	setValidation: React.Dispatch<React.SetStateAction<string>>;
};

const SuccessModal: React.FC<SuccessModalProps> = ({
	message,
	title,
	redirectText,
	redirectTo,
	setValidation,
	validation,
}) => {
	const handleCloseModal = () => {
		setValidation("");
	};
	return (
		<div
			className={`bg-black bg-opacity-40 fixed inset-0 items-center justify-center z-10 hover:cursor-pointer ${
				validation ? "flex" : "hidden"
			}`}
			onClick={handleCloseModal}>
			<div className="drop-shadow-lg bg-white flex flex-col gap-y-3 items-center justify-center rounded w-[400px] p-8 text-center">
				<p
					className={`${
						validation === "success"
							? "text-green-500"
							: validation === "error" && "text-red-500"
					} text-4xl`}>
					{validation === "success" ? (
						<BsFillCheckCircleFill />
					) : (
						<IoCloseCircle />
					)}
				</p>
				<h3 className="font-semibold">{title}</h3>
				<p className="text-sm">{message}</p>
				<Link
					to={redirectTo}
					className="text-white bg-[#017DC3] font-medium w-full py-2 rounded-md hover:bg-[#017DC3]/70 transition-background duration-300 ease-in-out">
					{redirectText}
				</Link>
			</div>
		</div>
	);
};

export default SuccessModal;
