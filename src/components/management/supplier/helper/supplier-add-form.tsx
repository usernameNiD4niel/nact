import { useState } from "react";
import BusinessInformationForm from "./business-information-form";
import { ShippingFormItemProps, SupplierItem } from "@/constants/props";
import LoadingButton from "@/components/reuseable/LoadingButton";
import ContactInformationForm from "./contact-information-form";
import { updateSpecificSupplier } from "@/api/supplier";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

interface SupplierAddFormProps {
	id: string;
	formValues: SupplierItem;
}

export default function SupplierAddForm({
	formValues,
	id,
}: SupplierAddFormProps) {
	const [isDisabled, setIsDisabled] = useState(true);
	const [isLoading, setIsLoading] = useState(false);

	const { toast } = useToast();

	const navigate = useNavigate();

	async function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);
		// Business Information
		const businessName = formData.get("businessName")?.toString() || "";
		const companyPhoneNumber =
			formData.get("companyPhoneNumber")?.toString() || "";
		const companyEmailWebsite =
			formData.get("companyEmailWebsite")?.toString() || "";

		// Contact Information
		const contactPersonFirstName =
			formData.get("contactPersonFirstName")?.toString() || "";
		const contactPersonLastName =
			formData.get("contactPersonLastName")?.toString() || "";
		const contactPersonMI = formData.get("contactPersonMI")?.toString() || "";
		const email = formData.get("email")?.toString() || "";
		const jobTitle = formData.get("jobTitle")?.toString() || "";
		const contactNumber = formData.get("contactNumber")?.toString() || "";
		const location_id = formData.get("location_id")?.toString();

		if (!location_id) {
			toast({
				title: "Validation Error",
				description: "Locations are required",
			});
			return;
		}

		const shipping: ShippingFormItemProps = {
			businessInformation: {
				businessName,
				companyEmailWebsite,
				companyPhoneNumber,
				location_id,
				// city,
				// country,
				// state,
			},
			contactInformation: [
				{
					contactNumber,
					contactPersonFirstName,
					contactPersonLastName,
					contactPersonMI,
					email,
					jobTitle,
				},
			],
		};

		setIsLoading(false);

		const { success, message } = await updateSpecificSupplier(id, shipping);

		if (success) {
			toast({
				title: message,
				description: "You have successfully updated 1 supplier record",
			});
			navigate("/supplier?shouldRefetch=true");
		} else {
			toast({
				title: message,
				description: "Failed to update supplier record, please try again",
			});
		}
		// console.log(`is success ::: ${isSuccess}`);
	}

	const {
		contactInformation,
		supplier: { businessInformation },
	} = formValues;

	return (
		<>
			<div className="flex flex-col items-center justify-center mt-10">
				<form
					className="p-2 flex flex-col gap-y-4 w-full lg:w-[60%] py-10 bg-white px-6"
					onSubmit={handleFormSubmit}>
					<BusinessInformationForm
						businessInformation={businessInformation}
						id={id}
						isDisabled={isDisabled}
						setIsDisabled={setIsDisabled}
					/>
					<ContactInformationForm
						contactInformation={contactInformation}
						isDisabled={isDisabled}
					/>
					{!isDisabled && (
						<div className="w-full flex items-center gap-3 mt-5 flex-col md:flex-row-reverse">
							{isLoading ? (
								<LoadingButton />
							) : (
								<button
									className="w-full text-center p-3 md:w-fit md:px-9 text-white rounded-md bg-[#017DC3]"
									// onClick={handleOnClick}
								>
									Submit
								</button>
							)}
							<button
								type="reset"
								className="w-full text-center p-3 md:w-fit md:px-9 text-[#017DC3]">
								Reset
							</button>
						</div>
					)}
				</form>
			</div>
		</>
	);
}
