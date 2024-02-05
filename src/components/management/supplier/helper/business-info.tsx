import LocationForm from "@/components/reuseable/LocationForm";
import InputLabel from "./input-label";

export default function BusinessInfo() {
	return (
		<>
			<InputLabel
				label="Business Name"
				name="businessName"
				key={"BUsinessNameBusinessInfo"}
			/>

			<LocationForm
				hasRegion={true}
				isDisabled={false}
				defaultCity={""}
				defaultState={""}
				defaultCountry={""}
			/>

			<InputLabel
				label="Company Phone Number"
				name="companyPhoneNumber"
				key={"CompanyPhoneNumberInputLabel"}
			/>

			<InputLabel
				label="Company Email Website"
				name="companyEmailWebsite"
				key={"CompanyEmailWebsiteInputLabel"}
			/>
		</>
	);
}
