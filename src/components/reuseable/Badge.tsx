import { CheckboxShape } from "@/constants/props";
import { cn } from "@/lib/utils";
import { FC, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

type BadgeProps = {
	text: string;
	setCheck: React.Dispatch<React.SetStateAction<CheckboxShape[]>>;
	id: string;
};

const Badge: FC<BadgeProps> = ({ text, setCheck, id }) => {
	const [isShowing, setisShowing] = useState(true);

	const handleCloseBadge = () => {
		setisShowing(false);
		setCheck((prevChecked) => {
			const updatedChecked = prevChecked.filter((checked) => checked.id !== id);
			return updatedChecked;
		});
	};
	return (
		<div
			className={cn(
				"rounded-full gap-x-1 text-xs items-center bg-white justify-center p-2",
				isShowing ? "flex" : "hidden",
			)}>
			<span>{text}</span>
			<button onClick={handleCloseBadge}>
				<AiOutlineClose />
			</button>
		</div>
	);
};

export default Badge;
