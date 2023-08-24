import { Link } from "react-router-dom";
import add from "@/assets/add.svg";
import { FC } from "react";

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
				<img src={add} alt="add icon" />
				{textButton}
			</Link>
		</div>
	);
};

export default AddButton;
