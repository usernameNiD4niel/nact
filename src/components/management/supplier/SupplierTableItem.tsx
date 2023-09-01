import HeaderWithBack from "@/components/reuseable/HeaderWithBack";
import { headerBackClass } from "@/constants/reusable-class";
import { useLocation } from "react-router-dom";
import AnimatedInputs from "@/components/reuseable/AnimatedInputs";
import React, { FC, useState } from "react";
import Dropdown from "@/components/reuseable/Dropdown";

type DisplayProps = {
	businessName: string;
	setBusinessName: React.Dispatch<React.SetStateAction<string>>;
	city: string;
	setCity: React.Dispatch<React.SetStateAction<string>>;
	state: string;
	setState: React.Dispatch<React.SetStateAction<string>>;
	country: string;
	setCountry: React.Dispatch<React.SetStateAction<string>>;
	companyPhoneNumber: string;
	setCompanyPhoneNumber: React.Dispatch<React.SetStateAction<string>>;
	companyEmailWebsite: string;
	setCompanyEmailWebsite: React.Dispatch<React.SetStateAction<string>>;
};

type ContactInformationProps = {
	contactPersonFirstName: string;
	setContactPersonFirstName: React.Dispatch<React.SetStateAction<string>>;
	contactPersonLastName: string;
	setContactPersonLastName: React.Dispatch<React.SetStateAction<string>>;
	contactPersonMI: string;
	setContactPersonMI: React.Dispatch<React.SetStateAction<string>>;
	jobTitle: string;
	setJobTitle: React.Dispatch<React.SetStateAction<string>>;
	contactNumber: string;
	setContactNumber: React.Dispatch<React.SetStateAction<string>>;
	email: string;
	setEmail: React.Dispatch<React.SetStateAction<string>>;
};

type FormProps = {
	businessInformation: DisplayProps;
	contactInformation: ContactInformationProps;
};

export const SupplierTableItem = () => {
	// Business Information
	const [businessName, setBusinessName] = useState<string>("Business Name");
	const [city, setCity] = useState<string>("City");
	const [state, setState] = useState<string>("State");
	const [country, setCountry] = useState<string>("Country");
	const [companyPhoneNumber, setCompanyPhoneNumber] = useState<string>(
		"Company Phone Number",
	);
	const [companyEmailWebsite, setCompanyEmailWebsite] = useState<string>(
		"Company Email Website",
	);

	// Contact Information
	const [contactPersonFirstName, setContactPersonFirstName] = useState<string>(
		"Contact Person First Name",
	);
	const [contactPersonLastName, setContactPersonLastName] = useState<string>(
		"Contact Person Last Name",
	);
	const [contactPersonMI, setContactPersonMI] =
		useState<string>("Contact Person MI");
	const [jobTitle, setJobTitle] = useState<string>("Job Title");
	const [contactNumber, setContactNumber] = useState<string>("Contact Number");
	const [email, setEmail] = useState<string>("Email Address");

	const location = useLocation();

	const data = location.state;

	const businessInformation: DisplayProps = {
		businessName,
		setBusinessName,
		city,
		setCity,
		state,
		companyEmailWebsite,
		setCompanyEmailWebsite,
		companyPhoneNumber,
		setCompanyPhoneNumber,
		country,
		setCountry,
		setState,
	};

	const contactInformation: ContactInformationProps = {
		contactPersonFirstName,
		setContactPersonFirstName,
		contactPersonLastName,
		setContactPersonLastName,
		contactPersonMI,
		setContactPersonMI,
		jobTitle,
		setJobTitle,
		contactNumber,
		setContactNumber,
		email,
		setEmail,
	};

	const fields: FormProps = {
		businessInformation,
		contactInformation,
	};

	if (!data) {
		return <h1>No Data found!</h1>;
	}

	return (
		<div className={headerBackClass}>
			<HeaderWithBack text="Inventory Details" route="/supplier" />

			<DisplayForm {...fields} />
		</div>
	);
};

const DisplayBusinessInformation: FC<DisplayProps> = (props) => {
	return (
		<React.Fragment>
			<div className="flex items-center justify-between">
				<h3 className="text-sm font-bold my-3">Business Information</h3>
				<Dropdown />
			</div>
			<div className="flex flex-col w-full gap-y-4">
				<AnimatedInputs
					isDisabled={true}
					type="text"
					inputType="businessName"
					value={props.businessName}
					setValue={props.setBusinessName}
					label="Business Name"
					key="Business Name Key"
				/>
				<AnimatedInputs
					isDisabled={true}
					type="text"
					inputType="city"
					value={props.city}
					setValue={props.setCity}
					label="City"
					key="City Key"
				/>
				<AnimatedInputs
					isDisabled={true}
					type="text"
					inputType="state"
					value={props.state}
					setValue={props.setState}
					label="State"
					key="State Key"
				/>
				<AnimatedInputs
					isDisabled={true}
					type="text"
					inputType="country"
					value={props.country}
					setValue={props.setCountry}
					label="Country"
					key="Country Key"
				/>
				<AnimatedInputs
					isDisabled={true}
					type="text"
					inputType="companyPhoneNumber"
					value={props.companyPhoneNumber}
					setValue={props.setCompanyPhoneNumber}
					label="Company Phone Number"
					key="Company Phone Number Key"
				/>
				<AnimatedInputs
					isDisabled={true}
					type="text"
					inputType="companyEmailWebsite"
					value={props.companyEmailWebsite}
					setValue={props.setCompanyEmailWebsite}
					label="Company Email Website"
					key="Company Email Website Key"
				/>
			</div>
		</React.Fragment>
	);
};

const DisplayContactInformation: FC<ContactInformationProps> = (props) => {
	return (
		<>
			<div className="flex items-center justify-between">
				<h3 className="text-sm font-bold my-3">Contact Information</h3>
			</div>
			<div className="flex flex-col w-full gap-y-4">
				<AnimatedInputs
					type="text"
					inputType="contactPersonFirstName"
					value={props.contactPersonFirstName}
					setValue={props.setContactPersonFirstName}
					label="Contact Person First Name"
					key="Contact Person First Name Key"
					isDisabled={true}
				/>
			</div>
		</>
	);
};

const DisplayForm: FC<FormProps> = (props) => {
	return (
		<div className="flex flex-col items-center justify-center mt-10">
			<form className="p-2 flex flex-col gap-y-2 w-full lg:w-[60%] py-10 bg-white px-6">
				<DisplayBusinessInformation {...props.businessInformation} />
				<DisplayContactInformation {...props.contactInformation} />
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
