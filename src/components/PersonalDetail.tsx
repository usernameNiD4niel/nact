import { inputClass, labelClass } from "../../constants/reusable-class";
import { PersonalDetailProps } from "../../constants/props";

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
			<label className={labelClass} htmlFor="firstName">
				First Name
				<input
					type="text"
					className={inputClass}
					id="firstName"
					name="firstName"
					placeholder="Juan"
					value={firstName}
					onChange={(e) => setFirstName(e.target.value)}
					required
				/>
			</label>
			<label className={labelClass} htmlFor="middleName">
				Middle Name
				<input
					type="text"
					className={inputClass}
					id="middleName"
					name="middleName"
					placeholder="V"
					value={middleName}
					onChange={(e) => setMiddleName(e.target.value)}
					required
				/>
			</label>
			<label className={labelClass} htmlFor="lastName">
				Last Name
				<input
					type="text"
					className={inputClass}
					id="lastName"
					value={lastName}
					onChange={(e) => setLastName(e.target.value)}
					name="lastName"
					placeholder="Tamad"
					required
				/>
			</label>
			<label htmlFor="birthdate" className={`relative ${labelClass}`}>
				Birth Date
			</label>
		</>
	);
};

export default PersonalDetail;
