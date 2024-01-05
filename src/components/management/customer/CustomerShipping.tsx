import HeaderWithBack from "@/components/reuseable/HeaderWithBack";
import LoadingButton from "@/components/reuseable/LoadingButton";
import SuccessModal from "@/components/reuseable/SuccessModal";
import { useState } from "react";
import BusinessInformation from "./helper/business-information";
import ContactInformation from "./helper/contact-information";
import { addCustomer } from "@/api/customer";
import { Customer } from "@/constants/props";

export default function CustomerShipping() {
	const [validation, setValidation] = useState("");
	const [message, setMessage] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	async function handleFormSubmit(form: React.FormEvent<HTMLFormElement>) {
		form.preventDefault();

		const formData = new FormData(form.currentTarget);
		// Business Information
		const customer = formData.get("customer")?.toString();
		const city = formData.get("city")?.toString();
		const state = formData.get("state")?.toString();
		const country = formData.get("country")?.toString();
		const companyPhoneNumber = formData.get("companyPhoneNumber")?.toString();
		const companyEmailWebsite = formData.get("companyEmailWebsite")?.toString();

		// Contact Information
		const contactPersonFirstName = formData
			.get("contactPersonFirstName")
			?.toString();
		const contactPersonLastName = formData
			.get("contactPersonLastName")
			?.toString();
		const contactPersonMIName = formData.get("contactPersonMIName")?.toString();
		const jobTitle = formData.get("jobTitle")?.toString();

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
			setMessage("Company email is required");
			setValidation("error");
			return;
		}

		if (!contactPersonFirstName) {
			setMessage("Contact person first name is required");
			setValidation("error");
			return;
		}

		if (!contactPersonLastName) {
			setMessage("Contact person last name is required");
			setValidation("error");
			return;
		}

		if (!contactPersonMIName) {
			setMessage("Contact person middle name is required");
			setValidation("error");
			return;
		}

		if (!jobTitle) {
			setMessage("Job title is required");
			setValidation("error");
			return;
		}

		setMessage("");
		setValidation("");

		// If we reach here then there's no error!
		setIsLoading(true);

		const request: Customer = {
			customerInformation: {
				customerName: customer,
				city,
				state,
				country,
				companyPhoneNumber,
				companyEmail: companyEmailWebsite,
			},
			contactDetails: [
				{
					contactPersonFirstName,
					contactPersonLastName,
					contactPersonMI: contactPersonMIName,
					jobTitle,
				},
			],
		};

		const { success, message: mess } = await addCustomer(request);

		setMessage(mess);

		if (success) {
			setValidation("success");
		} else {
			setValidation("error");
		}

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
