import "../index.css";
import {
	animatedInputClass,
	animatedSpanClass,
} from "../constants/reusable-class";
import { PersonalDetailProps } from "../constants/props";
import { useRef } from "react";
import "../../styles/no-input-default.css";
import "../../styles/remove-calendar-icon.css";

const PersonalDetail = ({
	firstName,
	lastName,
	middleName,
	birthDate,
	setFirstName,
	setLastName,
	setMiddleName,
	setBirthDate,
}: PersonalDetailProps) => {
	const birthdateRef = useRef<HTMLInputElement | null>(null);
	const spanRef = useRef<HTMLSpanElement | null>(null);

	const handleBirthDateClick = () => {
		birthdateRef.current?.showPicker();
	};

	return (
		<>
			<label className="relative" htmlFor="firstName">
				<input
					type="text"
					className={animatedInputClass}
					id="firstName"
					name="firstName"
					value={firstName}
					onChange={(e) => setFirstName(e.target.value)}
					required
				/>
				<span
					className={`${animatedSpanClass} ${firstName && "input-contains"}`}>
					First Name
				</span>
			</label>
			<label className="relative" htmlFor="middleName">
				<input
					type="text"
					className={animatedInputClass}
					id="middleName"
					name="middleName"
					value={middleName}
					onChange={(e) => setMiddleName(e.target.value)}
					required
				/>
				<span
					className={`${animatedSpanClass} ${middleName && "input-contains"}`}>
					Middle Name
				</span>
			</label>
			<label className="relative" htmlFor="lastName">
				<input
					type="text"
					className={animatedInputClass}
					id="lastName"
					value={lastName}
					onChange={(e) => setLastName(e.target.value)}
					name="lastName"
					required
				/>
				<span
					className={`${animatedSpanClass} ${lastName && "input-contains"}`}>
					Last Name
				</span>
			</label>
			<label className="relative" htmlFor="birthDate">
				<input
					type="date"
					className={`hover:cursor-pointer ${animatedInputClass}`}
					id="birthDate"
					value={birthDate}
					ref={birthdateRef}
					onClick={handleBirthDateClick}
					onChange={(e) => setBirthDate(e.target.value)}
					name="birthDate"
					required
				/>
				<span
					ref={spanRef}
					className={`${animatedSpanClass} ${birthDate && "input-contains"}`}>
					Birth Date
				</span>
			</label>
		</>
	);
};

export default PersonalDetail;
