import AnimatedInputs from "@/components/reuseable/AnimatedInputs";
import HeaderWithBack from "@/components/reuseable/HeaderWithBack";
import { useState } from "react";

const Shipping = () => {
	return (
		<div
			className={`z-10 absolute inset-0 bg-white h-screen md:inset-auto md:top-0 w-full`}>
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

	return (
		<div className="flex flex-col items-center justify-center">
			<form className="p-2 flex flex-col gap-y-2 w-full lg:w-[70%] py-10">
				<h3 className="text-sm font-bold my-3">Business Information</h3>
				<AnimatedInputs
					type="text"
					inputType="businessName"
					value={businessName}
					setValue={setBusinessName}
					label="Business Name"
					key="Business Name Key"
				/>
				<AnimatedInputs
					type="text"
					inputType="city"
					value={city}
					setValue={setCity}
					label="City"
					key="City Key"
				/>
				<AnimatedInputs
					type="text"
					inputType="state"
					value={state}
					setValue={setState}
					label="State"
					key="State Key"
				/>
				<AnimatedInputs
					type="text"
					inputType="country"
					value={country}
					setValue={setCountry}
					label="Country"
					key="Country Key"
				/>
				<AnimatedInputs
					type="text"
					inputType="companyPhoneNumber"
					value={companyPhoneNumber}
					setValue={setCompanyPhoneNumber}
					label="Company Phone Number"
					key="Company Phone Number Key"
				/>
				<AnimatedInputs
					type="text"
					inputType="companyEmailWebsite"
					value={companyEmailWebsite}
					setValue={setCompanyEmailWebsite}
					label="Company Email Website"
					key="Company Email Website Key"
				/>
				<h3 className="text-sm font-bold my-3">Business Information</h3>
				<AnimatedInputs
					type="text"
					inputType="businessName"
					value={businessName}
					setValue={setBusinessName}
					label="Business Name"
					key="Business Name Key"
				/>
				<AnimatedInputs
					type="text"
					inputType="city"
					value={city}
					setValue={setCity}
					label="City"
					key="City Key"
				/>
				<AnimatedInputs
					type="text"
					inputType="state"
					value={state}
					setValue={setState}
					label="State"
					key="State Key"
				/>
				<AnimatedInputs
					type="text"
					inputType="country"
					value={country}
					setValue={setCountry}
					label="Country"
					key="Country Key"
				/>
				<AnimatedInputs
					type="text"
					inputType="companyPhoneNumber"
					value={companyPhoneNumber}
					setValue={setCompanyPhoneNumber}
					label="Company Phone Number"
					key="Company Phone Number Key"
				/>
				<AnimatedInputs
					type="text"
					inputType="companyEmailWebsite"
					value={companyEmailWebsite}
					setValue={setCompanyEmailWebsite}
					label="Company Email Website"
					key="Company Email Website Key"
				/>

				<div className="w-full flex justify-end items-center gap-3 flex-col md:flex-row">
					<button
						type="submit"
						className="w-full text-center p-3 md:w-fit md:px-9 text-white rounded-md bg-primary">
						Submit
					</button>
					<button
						type="reset"
						className="w-full text-center p-3 md:w-fit md:px-9 text-primary border-[1px] rounded-md border-primary">
						Reset
					</button>
				</div>
			</form>
		</div>
	);
};

export default Shipping;
