import { Link } from "react-router-dom";
import { FC } from "react";
import { HiPlus } from "react-icons/hi2";

type AddButtonProps = {
	textButton: string;
	redirectUrl: string;
};

const AddButton: FC<AddButtonProps> = ({ redirectUrl, textButton }) => {
	return (
		<div className="px-4 md:px-5 rounded-full py-4 flex items-center justify-end mt-4 fixed bottom-6 right-6 bg-[#017DC3]">
			<Link
				to={redirectUrl}
				className="flex items-center justify-center gap-x-2 text-white text-sm">
				<span className="text-xl">
					<HiPlus />
				</span>
				<span className="hidden md:flex">{textButton}</span>
			</Link>
		</div>
	);
};

export default AddButton;
