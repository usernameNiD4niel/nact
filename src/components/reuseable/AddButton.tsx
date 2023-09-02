import { Link } from "react-router-dom";
import { FC } from "react";
import { HiPlus } from "react-icons/hi2";

type AddButtonProps = {
	textButton: string;
	redirectUrl: string;
};

const AddButton: FC<AddButtonProps> = ({ redirectUrl, textButton }) => {
	return (
		<div className="w-full flex items-center justify-end mt-4">
			<Link
				to={redirectUrl}
				className="flex items-center justify-center gap-x-2 text-primary text-sm">
				<HiPlus />
				{textButton}
			</Link>
		</div>
	);
};

export default AddButton;
