import ComboBox from "@/components/reuseable/ComboBox";
import {
	animatedInputClass,
	animatedSpanClass,
} from "@/constants/reusable-class";
import { useState } from "react";

export default function FormCityManipulator() {
	const [city, setCity] = useState("");
	const [state, setState] = useState("");
	const [country, setCountry] = useState("");
	//! finish here the city state country trigger...

	return (
		<>
			<ComboBox
				setInputValue={setCity}
				inputValue={city}
				key={"CustomerBusinessInformationComboBox"}
			/>
			<label className="relative">
				<input
					type="text"
					required={true}
					className={`${animatedInputClass} disabled:bg-gray-100`}
					value={state}
					name={"state"}
					autoComplete="no"
					onChange={(e) => setState(e.target.value)}
				/>
				<span
					className={`${`${animatedSpanClass} whitespace-nowrap`} ${
						state && "input-contains"
					}`}>
					State
				</span>
			</label>
			<label className="relative">
				<input
					type="text"
					required={true}
					className={`${animatedInputClass} disabled:bg-gray-100`}
					value={country}
					name={"country"}
					autoComplete="no"
					onChange={(e) => setCountry(e.target.value)}
				/>
				<span
					className={`${`${animatedSpanClass} whitespace-nowrap`} ${
						state && "input-contains"
					}`}>
					Country
				</span>
			</label>
		</>
	);
}
