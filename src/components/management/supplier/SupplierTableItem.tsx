import HeaderWithBack from "@/components/reuseable/HeaderWithBack";
import { headerBackClass } from "@/constants/reusable-class";
import { useLocation } from "react-router-dom";
import { BiPencil } from "react-icons/bi";
import { BsTrash } from "react-icons/bs";
import AnimatedInputs from "@/components/reuseable/AnimatedInputs";
import { useState } from "react";

export const SupplierTableItem = () => {
	const [businessName, setBusinessName] = useState<string>("");
	const [city, setCity] = useState<string>("");
	const [state, setState] = useState<string>("");
	const [country, setCountry] = useState<string>("");
	const [companyPhoneNumber, setCompanyPhoneNumber] = useState<string>("");
	const [companyEmail, setCompanyEmail] = useState<string>("");

	const location = useLocation();

	const data = location.state;

	if (!data) {
		return <h1>No Data found!</h1>;
	}

	return (
		<div className={`${headerBackClass} flex justify-center`}>
			<HeaderWithBack text="Inventory Details" route="/supplier" />
			<div className="py-2 mt-16 px-4 lg:w-[70%]">
				<div className="flex items-center justify-between w-full">
					<h3 className="font-bold textsm">Business Information</h3>
					<div className="flex items-center gap-x-2 text-base md:text-sm">
						<button className="flex items-center text-red-600 justify-center gap-x-2">
							<BsTrash />
							DELETE
						</button>
						<button className="flex items-center justify-center text-primary gap-x-2">
							<BiPencil />
							EDIT
						</button>
					</div>
				</div>
				<form className="w-full flex flex-col gap-y-4 mt-5">
					<AnimatedInputs
						inputType="businessName"
						label="Business Name"
						setValue={setBusinessName}
						type="text"
						value={businessName}
						key="BusinessNameTableItem"
					/>
					<AnimatedInputs
						inputType="city"
						label="City"
						setValue={setCity}
						type="text"
						value={city}
						key="CityTableItem"
					/>
					<AnimatedInputs
						inputType="state"
						label="State"
						setValue={setState}
						type="text"
						value={state}
						key="stateTableItem"
					/>
					<AnimatedInputs
						inputType="country"
						label="Country"
						setValue={setCountry}
						type="text"
						value={country}
						key="CountryTableItem"
					/>
					<AnimatedInputs
						inputType="CompanyPhoneNumber"
						label="CompanyPhoneNumber"
						setValue={setCompanyPhoneNumber}
						type="text"
						value={companyPhoneNumber}
						key="CompanyPhoneNumberTableItem"
					/>
					<AnimatedInputs
						inputType="CompanyEmail"
						label="CompanyEmail"
						setValue={setCompanyEmail}
						type="text"
						value={companyEmail}
						key="CompanyEmailTableItem"
					/>

					<hr className="my-5" />

					<div className="mt-4">
						<h3 className="font-bold textsm">Contact Information</h3>
					</div>
				</form>
			</div>
		</div>
	);
};
