import { ContactInformation } from "@/constants/props";
import { animatedInputClass } from "@/constants/reusable-class";
import React from "react";

interface ContactInformationFormProps {
	isDisabled: boolean;
	contactInformation: ContactInformation[];
}

export default function ContactInformationForm({
	contactInformation,
	isDisabled,
}: ContactInformationFormProps) {
	return (
		contactInformation &&
		contactInformation.length > 0 &&
		contactInformation.map((contact) => (
			<React.Fragment>
				<hr className="mt-10" />
				<div className="flex justify-between items-center">
					<h3 className="text-sm font-bold mt-5">Contact Information</h3>
				</div>
				<label className="relative">
					<span className="text-sm">Contact Person First Name</span>
					<input
						type="text"
						className={`${animatedInputClass} disabled:bg-gray-100`}
						name="contactPersonFirstName"
						disabled={isDisabled}
						required={true}
						defaultValue={contact.contactPersonFirstName}
					/>
				</label>
				<label className="relative">
					<span className="text-sm">Contact Person Last Name</span>
					<input
						type="text"
						className={`${animatedInputClass} disabled:bg-gray-100`}
						name="contactPersonLastName"
						disabled={isDisabled}
						defaultValue={contact.contactPersonLastName}
						required={true}
					/>
				</label>
				<label className="relative">
					<span className="text-sm">Contact Person MI</span>
					<input
						type="text"
						className={`${animatedInputClass} disabled:bg-gray-100`}
						name="contactPersonMI"
						disabled={isDisabled}
						defaultValue={contact.contactPersonMI}
						required={true}
					/>
				</label>
				<label className="relative">
					<span className="text-sm">Job Title</span>
					<input
						type="text"
						className={`${animatedInputClass} disabled:bg-gray-100`}
						name="jobTitle"
						disabled={isDisabled}
						defaultValue={contact.jobTitle}
						required={true}
					/>
				</label>
				<label className="relative">
					<span className="text-sm">Contact Number</span>
					<input
						type="text"
						className={`${animatedInputClass} disabled:bg-gray-100`}
						name="contactNumber"
						disabled={isDisabled}
						defaultValue={contact.contactNumber}
						required={true}
					/>
				</label>
				<label className="relative">
					<span className="text-sm">Email</span>
					<input
						type="text"
						className={`${animatedInputClass} disabled:bg-gray-100`}
						name="email"
						disabled={isDisabled}
						defaultValue={contact.email}
						required={true}
					/>
				</label>
			</React.Fragment>
		))
	);
}
