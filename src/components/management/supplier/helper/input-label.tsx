import {
	animatedInputClass,
	animatedSpanClass,
} from "@/constants/reusable-class";
import { useState } from "react";

interface InputLabelProps {
	name: string;
	label: string;
}

export default function InputLabel({ name, label }: InputLabelProps) {
	const [value, setValue] = useState("");

	return (
		<label className="relative">
			<input
				type="text"
				className={`${animatedInputClass} disabled:bg-gray-100`}
				autoComplete="no"
				id={name}
				value={value}
				name={name}
				onChange={(e) => setValue(e.target.value)}
				required
			/>

			<span
				className={`${`${animatedSpanClass} whitespace-nowrap`} ${
					value && "input-contains"
				}`}>
				{label}
			</span>
		</label>
	);
}
