import CustomInput from "./custom-input";
import FormCityManipulator from "./form-city-manipulator";

export default function BusinessInformation() {
	return (
		<div className="flex flex-col w-full gap-y-4">
			<CustomInput
				isRequired={true}
				label="Customer"
				name="customer"
				type="text"
				key={"CustomerInput"}
			/>
			<FormCityManipulator />
			<CustomInput
				isRequired={true}
				label="Company Phone Number"
				name="companyPhoneNumber"
				type="text"
				key={"CompanyPhoneNumberInput"}
			/>
			<CustomInput
				isRequired={true}
				label="Company Email Website"
				name="companyEmailWebsite"
				type="text"
				key={"CompanyEmailWebsiteInput"}
			/>
		</div>
	);
}
