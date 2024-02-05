import React from "react";
import InputLabel from "./input-label";

export default function ContactInfo() {
	return (
		<React.Fragment>
			<hr className="mt-10" />
			<div className="flex justify-between items-center">
				<h3 className="text-sm font-bold mt-5">Contact Information</h3>
			</div>
			<InputLabel
				label="Contact Person First Name"
				name="contactPersonFirstName"
				key={"ContactPersonFirstName"}
			/>

			<InputLabel
				label="Contact Person Last Name"
				name="contactPersonLastName"
				key={"ContactPersonLastName"}
			/>

			<InputLabel
				label="Contact Person MI Name"
				name="contactPersonMIName"
				key={"contactPersonMIName"}
			/>

			<InputLabel label="Job Title" name="jobTitle" key={"jobTitle"} />

			<InputLabel
				label="Contact Number"
				name="contactNumber"
				key={"contactNumber"}
			/>

			<InputLabel label="Email" name="email" key={"email"} />
		</React.Fragment>
	);
}
