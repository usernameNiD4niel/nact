import HeaderWithBack from "@/components/reuseable/HeaderWithBack";
import LoadingButton from "@/components/reuseable/LoadingButton";
import SuccessModal from "@/components/reuseable/SuccessModal";
import { useState } from "react";
import BusinessInformation from "./helper/business-information";
import ContactInformation from "./helper/contact-information";

export default function CustomerShipping() {
	const [validation, setValidation] = useState("");
	const [message, setMessage] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	function handleFormSubmit(form: React.FormEvent<HTMLFormElement>) {
		form.preventDefault();

		const formData = new FormData(form.currentTarget);
		// Business Information
		const customer = formData.get("customer");
		const city = formData.get("city");
		const state = formData.get("state");
		const country = formData.get("country");
		const companyPhoneNumber = formData.get("companyPhoneNumber");
		const companyEmailWebsite = formData.get("companyEmailWebsite");

		// Contact Information
		const contactPersonFirstName = formData.get("contactPersonFirstName");
		const contactPersonLastName = formData.get("contactPersonLastName");
		const contactPersonMIName = formData.get("contactPersonMIName");
		const jobTitle = formData.get("jobTitle");

		// validate the required fields
		if (!customer) {
			setMessage("Customer field is required");
			setValidation("error");
			return;
		}

		if (!(city && state && country)) {
			setMessage("The city, state, and country fields are required");
			setValidation("error");
			return;
		}

		if (!companyPhoneNumber || companyPhoneNumber.length < 11) {
			setMessage("Please enter a valid phone number");
			setValidation("error");
			return;
		}

		if (!companyEmailWebsite) {
			setMessage("Comapny email is required");
			setValidation("error");
			return;
		}

		setMessage("");
		setValidation("");

		// If we reach here then there's no error!
		setIsLoading(true);

		const request = {
			businessInformation: {
				customer,
				city,
				state,
				country,
				companyPhoneNumber,
				companyEmailWebsite,
			},
			contactInformation: {
				contactPersonFirstName,
				contactPersonLastName,
				contactPersonMIName,
				jobTitle,
			},
		};

		// Request to the server for appending this request data
		console.log(`the request data: ${JSON.stringify(request, null, 2)}`);
	}

	return (
		<>
			<div
				className={`z-10 absolute inset-0 bg-white h-full w-full ${
					validation ? "overflow-hidden" : "overflow-auto"
				}`}>
				<HeaderWithBack text="Shipping" />
				<div
					className={`flex flex-col items-center justify-center mt-10 ${
						validation ? "overflow-y-hidden" : "overflow-y-auto"
					}`}>
					<form
						className="p-2 flex flex-col gap-y-2 w-full lg:w-[60%] py-10 bg-white px-6"
						onSubmit={handleFormSubmit}>
						{/* For Business Information Form */}
						<h3 className="text-sm font-bold my-3">Business Information</h3>
						<BusinessInformation />
						<hr className="mt-10" />
						{/* For Contact Information Form */}
						<h3 className="text-sm font-bold my-3">Contact Information</h3>
						<ContactInformation />

						<div className="w-full flex items-center gap-3 mt-5 flex-col md:flex-row-reverse">
							{isLoading ? (
								<LoadingButton />
							) : (
								<button className="w-full text-center p-3 md:w-fit md:px-9 text-white rounded-md bg-[#017DC3]">
									Submit
								</button>
							)}
							<button className="w-full text-center p-3 md:w-fit md:px-9 text-[#017DC3]">
								Reset
							</button>
						</div>
					</form>
				</div>
			</div>
			{validation && (
				<SuccessModal
					message={message}
					redirectText="Go back to customer table"
					redirectTo="/customer"
					title={`${
						validation === "error"
							? "Data Failed to Add"
							: "Data Successfully Added"
					}`}
					validation={validation}
					setValidation={setValidation}
				/>
			)}
		</>
	);
}
