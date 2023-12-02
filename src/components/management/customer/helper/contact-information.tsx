import CustomInput from "./custom-input";

export default function ContactInformation() {
	return (
		<div>
			<CustomInput
				isRequired={true}
				label="Contact Person First Name"
				name="contactPersonFirstName"
				type="text"
				key={"CustomInputContactInformationFirstName"}
			/>
			<CustomInput
				isRequired={true}
				label="Contact Person Last Name"
				name="contactPersonLastName"
				type="text"
				key={"CustomInputContactInformationLastName"}
			/>
			<CustomInput
				isRequired={true}
				label="Contact Person MI Name"
				name="contactPersonMIName"
				type="text"
				key={"CustomInputContactInformationMIName"}
			/>
			<CustomInput
				isRequired={true}
				label="Job Title"
				name="jobTitle"
				type="text"
				key={"CustomInputContactInformationJobTitle"}
			/>
		</div>
	);
}
