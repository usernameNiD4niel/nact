import {
	animatedInputClass,
	animatedSpanClass,
} from "@/constants/reusable-class";
import { FC } from "react";

type AnimatedInputProps = {
	value: string;
	setValue: React.Dispatch<React.SetStateAction<string>> | null;
	inputType: string;
	type: string;
	label: string;
};

const AnimatedInputs: FC<AnimatedInputProps> = ({
	inputType,
	setValue,
	value,
	type,
	label,
}) => {
	return (
		<label className="relative" htmlFor={inputType}>
			<input
				type={type}
				className={animatedInputClass}
				id={inputType}
				name={inputType}
				value={value}
				onChange={(e) => {
					if (setValue != null) setValue(e.target.value);
				}}
				required
			/>
			<span className={`${animatedSpanClass} ${value && "input-contains"}`}>
				{label}
			</span>
		</label>
	);
};

export default AnimatedInputs;
