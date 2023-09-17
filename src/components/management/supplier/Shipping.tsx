import AnimatedInputs from "@/components/reuseable/AnimatedInputs";
import CustomSelect from "@/components/reuseable/CustomSelect";
import HeaderWithBack from "@/components/reuseable/HeaderWithBack";
import { countries } from "@/constants/arrays";
import { cities, states } from "@/constants/objects";
import React, { FC, useState } from "react";
import { IoIosAddCircle, IoMdRemoveCircle } from "react-icons/io";

const Shipping = () => {
	return (
		<div className={`z-10 absolute inset-0 bg-white h-full w-full`}>
			<HeaderWithBack text="Shipping" route="/supplier/add" />
			<BusinessInformationForm />
		</div>
	);
};

const BusinessInformationForm = () => {
	const [businessName, setBusinessName] = useState<string>("");
	const [city, setCity] = useState<string>("");
	const [state, setState] = useState<string>("");
	const [country, setCountry] = useState<string>("");
	const [companyPhoneNumber, setCompanyPhoneNumber] = useState<string>("");
	const [companyEmailWebsite, setCompanyEmailWebsite] = useState<string>("");

	const [contactInformation, setContactInformation] = useState<number[]>([0]);

	const handleRemoveContactInformation = (index: number) => {
		const newContact = contactInformation.filter((_, i) => i !== index);
		setContactInformation(newContact);
	};

	return (
		<div className="flex flex-col items-center justify-center mt-10">
			<form className="p-2 flex flex-col gap-y-2 w-full lg:w-[60%] py-10 bg-white px-6">
				<h3 className="text-sm font-bold my-3">Business Information</h3>
				<div className="flex flex-col w-full gap-y-4">
					<AnimatedInputs
						isDisabled={false}
						type="text"
						inputType="businessName"
						value={businessName}
						setValue={setBusinessName}
						label="Business Name"
						key="Business Name Key"
					/>
					<CustomSelect
						label="Country"
						options={countries}
						setState={setCountry}
						state={country}
					/>
					<CustomSelect
						label="State"
						options={
							country === "Canada"
								? states["canada"]
								: country === "USA"
								? states["usa"]
								: []
						}
						setState={setState}
						state={state}
					/>
					<CustomSelect
						label="City"
						// @ts-expect-error - This is correct, but ts showing me an error message
						options={state ? cities[`${state}`] : []}
						setState={setCity}
						state={city}
					/>

					<AnimatedInputs
						isDisabled={false}
						type="text"
						inputType="companyPhoneNumber"
						value={companyPhoneNumber}
						setValue={setCompanyPhoneNumber}
						label="Company Phone Number"
						key="Company Phone Number Key"
					/>
					<AnimatedInputs
						isDisabled={false}
						type="text"
						inputType="companyEmailWebsite"
						value={companyEmailWebsite}
						setValue={setCompanyEmailWebsite}
						label="Company Email Website"
						key="Company Email Website Key"
					/>
					{contactInformation.map((value, index) => (
						<ContactInformation
							handleRemoveContact={handleRemoveContactInformation}
							index={index}
							setContactInformation={setContactInformation}
							key={value}
						/>
					))}
				</div>

				<div className="w-full flex items-center gap-3 mt-5 flex-col md:flex-row-reverse">
					<button
						type="submit"
						className="w-full text-center p-3 md:w-fit md:px-9 text-white rounded-md bg-primary">
						Submit
					</button>
					<button
						type="reset"
						className="w-full text-center p-3 md:w-fit md:px-9 text-primary">
						Reset
					</button>
				</div>
			</form>
		</div>
	);
};

type ContactInformationAdds = {
	handleRemoveContact: (index: number) => void;
	setContactInformation: React.Dispatch<React.SetStateAction<number[]>>;
	index: number;
};

const ContactInformation: FC<ContactInformationAdds> = ({
	handleRemoveContact,
	setContactInformation,
	index,
}) => {
	const [contactPersonFirstName_, setContactPersonFirstName] =
		useState<string>("");
	const [contactPersonLastName_, setContactPersonLastName] =
		useState<string>("");
	const [contactPersonMI_, setContactPersonMI] = useState<string>("");
	const [jobTitle_, setJobTitle] = useState<string>("");
	const [contactNumber_, setContactNumber] = useState<string>("");
	const [email_, setEmail] = useState<string>("");

	return (
		<React.Fragment>
			<hr className="mt-10" />
			<div className="flex justify-between items-center">
				<h3 className="text-sm font-bold mt-5">Contact Information</h3>
				{index !== 0 && (
					<button
						type="button"
						onClick={() => handleRemoveContact(index)}
						className="flex items-center text-red-600 uppercase gap-x-2 text-sm">
						<IoMdRemoveCircle /> Remove
					</button>
				)}
			</div>
			<AnimatedInputs
				isDisabled={false}
				type="text"
				inputType="personalFirstName"
				value={contactPersonFirstName_}
				setValue={setContactPersonFirstName}
				label="Contact Person First Name"
				key="ContactPersonFirstKey"
			/>
			<AnimatedInputs
				isDisabled={false}
				type="text"
				inputType="personalLastName"
				value={contactPersonLastName_}
				setValue={setContactPersonLastName}
				label="Contact Person Last Name"
				key="ContactPersonLastKey"
			/>
			<AnimatedInputs
				isDisabled={false}
				type="text"
				inputType="contactPersonMI"
				value={contactPersonMI_}
				setValue={setContactPersonMI}
				label="Contact Person MI Name"
				key="ContactPersonMIKey"
			/>
			<AnimatedInputs
				isDisabled={false}
				type="text"
				inputType="jobTitle"
				value={jobTitle_}
				setValue={setJobTitle}
				label="Job Title"
				key="JobTitleKey"
			/>
			<AnimatedInputs
				isDisabled={false}
				type="tel"
				inputType="contactNumber"
				value={contactNumber_}
				setValue={setContactNumber}
				label="Contact Number"
				key="ContactNumberKey"
			/>
			<AnimatedInputs
				isDisabled={false}
				type="email"
				inputType="email"
				value={email_}
				setValue={setEmail}
				label="Email"
				key="EmailKey"
			/>
			<div className="flex w-full justify-end items-center">
				<button
					type="button"
					onClick={() =>
						setContactInformation((prev) => [...prev, prev.length])
					}
					className="text-primary pb-2 flex gap-x-2 items-center text-sm">
					<IoIosAddCircle />
					ADD OTHER CONTACT PERSON
				</button>
			</div>
		</React.Fragment>
	);
};

export default Shipping;
