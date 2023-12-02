import {
	animatedInputClass,
	animatedSpanClass,
} from "@/constants/reusable-class";
import { useState } from "react";

interface CustomInputProps {
	name: string;
	type: string;
	label: string;
	isRequired: boolean;
}

export default function CustomInput({
	label,
	name,
	type,
	isRequired,
}: CustomInputProps) {
	const [inputValue, setInputValue] = useState("");

	return (
		<label className="relative">
			<input
				type={type}
				required={isRequired}
				className={`${animatedInputClass} disabled:bg-gray-100`}
				value={inputValue}
				name={name}
				autoComplete="no"
				onChange={(e) => setInputValue(e.target.value)}
			/>
			<span
				className={`${`${animatedSpanClass} whitespace-nowrap`} ${
					inputValue && "input-contains"
				}`}>
				{label}
			</span>
		</label>
	);
}
