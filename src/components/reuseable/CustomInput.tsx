import {
	animatedInputClass,
	animatedSpanClass,
} from "@/constants/reusable-class";
import { useState } from "react";

interface CustomInputProps {
	inputType: string;
	type: string;
	label: string;
	isDisabled: boolean;
	isRequired: boolean;
	defaultValue?: string;
}

export default function CustomInput({
	inputType,
	isDisabled,
	isRequired,
	label,
	type,
	defaultValue,
}: CustomInputProps) {
	const [value, setValue] = useState(defaultValue);

	return (
		<label className="relative" htmlFor={inputType}>
			<input
				type={type}
				className={`${animatedInputClass} disabled:bg-gray-100`}
				id={inputType}
				name={inputType}
				disabled={isDisabled}
				defaultValue={defaultValue}
				required={isRequired}
				onChange={(e) => setValue(e.target.value)}
			/>
			<span
				className={`${`${animatedSpanClass} whitespace-nowrap ${
					isDisabled && "hidden"
				}`} ${value && "input-contains"} ${isDisabled && "disabled-label"}`}>
				{label}
			</span>
		</label>
	);
}
