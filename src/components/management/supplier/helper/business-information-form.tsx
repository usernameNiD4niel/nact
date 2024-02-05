import FormDropdown from "@/components/reuseable/FormDropdown";
import LocationForm from "@/components/reuseable/LocationForm";
import { BusinessInformation } from "@/constants/props";
import { animatedInputClass } from "@/constants/reusable-class";
import React from "react";

interface BusinessInformationFormProps {
	isDisabled: boolean;
	id: string;
	businessInformation: BusinessInformation;
	setIsDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function BusinessInformationForm({
	businessInformation,
	id,
	isDisabled,
	setIsDisabled,
}: BusinessInformationFormProps) {
	const {
		businessName,
		city: city_,
		companyEmailWebsite,
		companyPhoneNumber,
		country: country_,
		state: state_,
	} = businessInformation;

	return (
		<React.Fragment>
			<div className="flex items-center justify-between">
				<h3 className="text-sm font-bold my-3">Business Information</h3>
				{/* <Dropdown setIsDisabled={setIsDisabled} key="SupplierTableItem" /> */}
				<FormDropdown
					setIsDisabled={setIsDisabled}
					key="SupplierFormDropdown"
					modalLabel="This action cannot be undone. This will permanently delete this supplier item and remove this data from our server."
					navigateTo="supplier"
					endpoint={`/supplier/${id}`}
				/>
			</div>
			<div className="flex flex-col w-full gap-y-4">
				<label className="relative">
					<span className="text-sm">Business Name</span>
					<input
						type="text"
						className={`${animatedInputClass} disabled:bg-gray-100`}
						name="businessName"
						disabled={isDisabled}
						required={true}
						defaultValue={businessName}
					/>
				</label>

				<LocationForm
					hasRegion={true}
					isDisabled={isDisabled}
					defaultCity={city_}
					defaultState={state_}
					defaultCountry={country_}
				/>

				<label className="relative">
					<span className="text-sm">Company Phone Number</span>
					<input
						type="text"
						className={`${animatedInputClass} disabled:bg-gray-100`}
						name="companyPhoneNumber"
						defaultValue={companyPhoneNumber}
						required={true}
						disabled={isDisabled}
					/>
				</label>
				<label className="relative">
					<span className="text-sm">Comapny Email Website</span>
					<input
						type="text"
						className={`${animatedInputClass} disabled:bg-gray-100`}
						name="companyEmailWebsite"
						defaultValue={companyEmailWebsite}
						required={true}
						disabled={isDisabled}
					/>
				</label>
			</div>
		</React.Fragment>
	);
}
