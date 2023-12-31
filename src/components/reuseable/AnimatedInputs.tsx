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
	isDisabled: boolean;
	isRequired: boolean;
};

const AnimatedInputs: FC<AnimatedInputProps> = ({
	inputType,
	setValue,
	value,
	type,
	isRequired,
	isDisabled,
	label,
}) => {
	return (
		<label className="relative" htmlFor={inputType}>
			<input
				type={type}
				className={`${animatedInputClass} disabled:bg-gray-100`}
				id={inputType}
				name={inputType}
				value={value}
				disabled={isDisabled}
				autoComplete="no"
				onChange={(e) => {
					if (setValue != null) setValue(e.target.value);
				}}
				required={isRequired}
			/>
			<span
				className={`${`${animatedSpanClass} whitespace-nowrap ${
					isDisabled && "hidden"
				}`} ${value && "input-contains"} ${isDisabled && "disabled-label"}`}>
				{label}
			</span>
		</label>
	);
};

export default AnimatedInputs;
