import "../index.css";
import {
	animatedInputClass,
	animatedSpanClass,
} from "../constants/reusable-class";
import { PersonalDetailProps } from "../constants/props";

const PersonalDetail = ({
	firstName,
	lastName,
	middleName,
	setFirstName,
	setLastName,
	setMiddleName,
}: PersonalDetailProps) => {
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
		</>
	);
};

export default PersonalDetail;
