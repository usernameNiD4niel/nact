import DisplayErrorMessage from "@/components/DisplayErrorMessage";
import AnimatedInputs from "@/components/reuseable/AnimatedInputs";
import ComboBox from "@/components/reuseable/ComboBox";
import HeaderWithBack from "@/components/reuseable/HeaderWithBack";
import SuccessModal from "@/components/reuseable/SuccessModal";
import { cities, states } from "@/constants/objects";
import { SupplierFormValidation } from "@/constants/props";
import {
	animatedInputClass,
	animatedSpanClass,
} from "@/constants/reusable-class";
import { supplierValidationSchema } from "@/models/supplier";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { FC, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IoIosAddCircle, IoMdRemoveCircle } from "react-icons/io";

const Shipping = () => {
	const [validation, setValidation] = useState("");
	return (
		<>
			<div
				className={`z-10 absolute inset-0 bg-white h-full w-full ${
					validation ? "overflow-hidden" : "overflow-auto"
				}`}>
				<HeaderWithBack text="Shipping" route="/supplier/add" />
				<BusinessInformationForm validation={validation} />
			</div>
			{validation && (
				<SuccessModal
					message="Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque facilis fuga laudantium odio, blanditiis deleniti sed repellendus sunt nostrum neque."
					redirectText="Go back to dashboard"
					redirectTo="/supplier/add/shipping"
					title="Payment Successful"
					validation={validation}
					setValidation={setValidation}
				/>
			)}
		</>
	);
};

type ShippingProps = {
	validation: string;
};

const BusinessInformationForm: FC<ShippingProps> = ({ validation }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SupplierFormValidation>({
		resolver: zodResolver(supplierValidationSchema),
	});
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

	useEffect(() => {
		for (const state_ in cities) {
			// @ts-expect-error - This should not happen
			// eslint-disable-next-line no-prototype-builtins
			if (cities.hasOwnProperty(state_) && cities[state_].includes(city)) {
				setState(state_);
				console.log(state_);

				return;
			}
		}
	}, [city]);

	useEffect(() => {
		for (const country_ in states) {
			// @ts-expect-error - This should not happen
			// eslint-disable-next-line no-prototype-builtins
			if (states.hasOwnProperty(country_) && states[country_].includes(state)) {
				setCountry(country_);
				console.log(country_);

				return;
			}
		}
	}, [state]);

	const handleFormSubmit: SubmitHandler<SupplierFormValidation> = (data) => {
		console.log(data);

		// setValidation("error");
		//! create a request to the backend
		// pass the setValidation to the useAuth hook to change the value of it if there's an error or show a success modal instead
	};

	return (
		<div
			className={`flex flex-col items-center justify-center mt-10 ${
				validation ? "overflow-y-hidden" : "overflow-y-auto"
			}`}>
			<form
				className="p-2 flex flex-col gap-y-2 w-full lg:w-[60%] py-10 bg-white px-6"
				onSubmit={handleSubmit(handleFormSubmit)}>
				<h3 className="text-sm font-bold my-3">Business Information</h3>
				<div className="flex flex-col w-full gap-y-4">
					<label className="relative" htmlFor="businessName">
						<input
							type="text"
							className={`${animatedInputClass} disabled:bg-gray-100`}
							value={businessName}
							{...register("businessName")}
							name="businessName"
							id="businessName"
							onChange={(e) => setBusinessName(e.target.value)}
						/>
						<span
							className={`${`${animatedSpanClass} whitespace-nowrap`} ${
								businessName && "input-contains"
							}`}>
							Business Name
						</span>
						{errors.businessName && (
							<DisplayErrorMessage
								errorMessage={`${errors.businessName.message}`}
							/>
						)}
					</label>

					{/* <AnimatedInputs
						isDisabled={false}
						isRequired={false}
						type="text"
						inputType="businessName"
						value={businessName}
						setValue={setBusinessName}
						label="Business Name"
						key="Business Name Key"
						{...register("businessName")}
					/> */}
					<ComboBox
						setInputValue={setCity}
						inputValue={city}
						register={register}
						errors={errors}
					/>
					<label className="relative" htmlFor="state">
						<input
							type="text"
							className={`${animatedInputClass} disabled:bg-gray-100`}
							value={state}
							{...register("state")}
							name="state"
							disabled
							id="state"
							onChange={(e) => setState(e.target.value)}
						/>
						<span
							className={`${`${animatedSpanClass} bg-[#F3F4F6] whitespace-nowrap`} ${
								state && "input-contains"
							}`}>
							State
						</span>
						{errors.state && (
							<DisplayErrorMessage errorMessage={`${errors.state.message}`} />
						)}
					</label>
					{/* <AnimatedInputs
						inputType="state"
						isDisabled={true}
						isRequired={false}
						label="State"
						setValue={setState}
						type="text"
						value={state}
						{...register("state")}
					/> */}
					<label className="relative" htmlFor="country">
						<input
							type="text"
							className={`${animatedInputClass} disabled:bg-gray-100`}
							value={country}
							{...register("country")}
							name="country"
							disabled
							id="country"
							onChange={(e) => setCountry(e.target.value)}
						/>
						<span
							className={`${`${animatedSpanClass} bg-[#F3F4F6] whitespace-nowrap`} ${
								country && "input-contains"
							}`}>
							Country
						</span>
						{errors.country && (
							<DisplayErrorMessage errorMessage={`${errors.country.message}`} />
						)}
					</label>
					{/* <AnimatedInputs
						inputType="country"
						isDisabled={true}
						isRequired={false}
						label="Country"
						setValue={setCountry}
						type="text"
						value={country}
						{...register("country")}
					/> */}
					<label className="relative" htmlFor="companyPhoneNumber">
						<input
							type="text"
							className={`${animatedInputClass} disabled:bg-gray-100`}
							value={companyPhoneNumber}
							{...register("companyPhoneNumber")}
							name="companyPhoneNumber"
							id="companyPhoneNumber"
							onChange={(e) => setCompanyPhoneNumber(e.target.value)}
						/>
						<span
							className={`${`${animatedSpanClass} whitespace-nowrap`} ${
								companyPhoneNumber && "input-contains"
							}`}>
							Company Phone Number
						</span>
						{errors.companyPhoneNumber && (
							<DisplayErrorMessage
								errorMessage={`${errors.companyPhoneNumber.message}`}
							/>
						)}
					</label>
					{/* <AnimatedInputs
						isDisabled={false}
						isRequired={false}
						type="text"
						inputType="companyPhoneNumber"
						value={companyPhoneNumber}
						setValue={setCompanyPhoneNumber}
						label="Company Phone Number"
						key="Company Phone Number Key"
						{...register("companyPhoneNumber")}
					/> */}
					<label className="relative" htmlFor="companyEmailWebsite">
						<input
							type="text"
							className={`${animatedInputClass} disabled:bg-gray-100`}
							value={companyEmailWebsite}
							{...register("companyEmailWebsite")}
							name="companyEmailWebsite"
							id="companyEmailWebsite"
							onChange={(e) => setCompanyEmailWebsite(e.target.value)}
						/>
						<span
							className={`${`${animatedSpanClass} whitespace-nowrap`} ${
								companyEmailWebsite && "input-contains"
							}`}>
							Company Email Website
						</span>
						{errors.companyEmailWebsite && (
							<DisplayErrorMessage
								errorMessage={`${errors.companyEmailWebsite.message}`}
							/>
						)}
					</label>
					{/* <AnimatedInputs
						isDisabled={false}
						isRequired={false}
						type="text"
						inputType="companyEmailWebsite"
						value={companyEmailWebsite}
						setValue={setCompanyEmailWebsite}
						label="Company Email Website"
						key="Company Email Website Key"
						{...register("comapnyEmailWebsite")}
					/> */}
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
				isRequired={false}
				type="text"
				inputType="personalFirstName"
				value={contactPersonFirstName_}
				setValue={setContactPersonFirstName}
				label="Contact Person First Name"
				key="ContactPersonFirstKey"
			/>
			<AnimatedInputs
				isDisabled={false}
				isRequired={false}
				type="text"
				inputType="personalLastName"
				value={contactPersonLastName_}
				setValue={setContactPersonLastName}
				label="Contact Person Last Name"
				key="ContactPersonLastKey"
			/>
			<AnimatedInputs
				isDisabled={false}
				isRequired={false}
				type="text"
				inputType="contactPersonMI"
				value={contactPersonMI_}
				setValue={setContactPersonMI}
				label="Contact Person MI Name"
				key="ContactPersonMIKey"
			/>
			<AnimatedInputs
				isDisabled={false}
				isRequired={false}
				type="text"
				inputType="jobTitle"
				value={jobTitle_}
				setValue={setJobTitle}
				label="Job Title"
				key="JobTitleKey"
			/>
			<AnimatedInputs
				isDisabled={false}
				isRequired={false}
				type="tel"
				inputType="contactNumber"
				value={contactNumber_}
				setValue={setContactNumber}
				label="Contact Number"
				key="ContactNumberKey"
			/>
			<AnimatedInputs
				isDisabled={false}
				isRequired={false}
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
