import React from "react";

type CustomSelectProps = {
	options: string[];
	label: string;
	state: string;
	setState: React.Dispatch<React.SetStateAction<string>>;
};

const CustomSelect: React.FC<CustomSelectProps> = ({
	label,
	options = [],
	setState,
	state,
}) => {
	const handleSelectState = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setState(event.target.value);
	};

	return (
		<label className="flex flex-col text-sm relative group">
			{state && (
				<span
					className={`absolute -top-2 bg-white px-2 group-focus-within:text-primary text-gray-400 text-[0.65rem] left-3`}>
					{label}
				</span>
			)}
			<select
				className={`px-3 rounded-md border-[1px] h-12 border-black outline-none group-focus-within:border-[1px] group-focus-within:border-primary border-opacity-20 font-thin text-opacity-70 ${
					!state ? "text-slate-400" : "text-black"
				}`}
				required
				value={state || ""}
				onChange={handleSelectState}>
				{!state && (
					<option value="" className="text-black font-bold">
						{label}
					</option>
				)}
				{options.map((option, index) => (
					<option className="text-gray-700" value={option} key={index}>
						{option}
					</option>
				))}
			</select>
		</label>
	);
};

export default CustomSelect;
