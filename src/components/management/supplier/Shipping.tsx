import { addShippingSupplier } from "@/api/supplier";
import HeaderWithBack from "@/components/reuseable/HeaderWithBack";
import LoadingButton from "@/components/reuseable/LoadingButton";
import { toast } from "@/components/ui/use-toast";
import { ShippingFormItemProps } from "@/constants/props";
import { FormEvent, useState } from "react";
import ContactInfo from "./helper/contact-info";
import BusinessInfo from "./helper/business-info";
import { useNavigate } from "react-router-dom";

const Shipping = () => {
	return (
		<>
			<div className={`z-10 absolute inset-0 bg-white h-full w-full`}>
				<HeaderWithBack text="Shipping" />
				<BusinessInformationForm />
			</div>
		</>
	);
};

const BusinessInformationForm = () => {
	const [isLoading, setIsLoading] = useState(false);
	const router = useNavigate();

	async function handleOnSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);

		// * Business Info
		const businessName = formData.get("businessName")!.toString();
		const location_id = formData.get("location_id")!.toString();
		const companyPhoneNumber = formData.get("companyPhoneNumber")!.toString();
		const companyEmailWebsite = formData.get("companyEmailWebsite")!.toString();

		// * Contact Info
		const contactPersonFirstName = formData
			.get("contactPersonFirstName")!
			.toString();
		const contactPersonLastName = formData
			.get("contactPersonLastName")!
			.toString();
		const contactPersonMI = formData.get("contactPersonMIName")!.toString();
		const jobTitle = formData.get("jobTitle")!.toString();
		const contactNumber = formData.get("contactNumber")!.toString();
		const email = formData.get("email")!.toString();

		if (!location_id) {
			toast({
				title: "Validation Error",
				description: "Locations are required",
			});
			return;
		}

		setIsLoading(true);

		const shipping: ShippingFormItemProps = {
			businessInformation: {
				businessName,
				companyEmailWebsite,
				companyPhoneNumber,
				location_id,
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

		const { message, success } = await addShippingSupplier(shipping);

		if (success) {
			toast({
				title: "Added Successfully",
				description: message,
			});
		} else {
			toast({
				title: "Failed to Add",
				description: message,
			});
		}

		router("/supplier?shouldRefetch=true");
	}
	return (
		<div className={`flex flex-col items-center justify-center mt-10`}>
			<form
				className="p-2 flex flex-col gap-y-2 w-full lg:w-[60%] py-10 bg-white px-6"
				onSubmit={handleOnSubmit}>
				<h3 className="text-sm font-bold my-3">Business Information</h3>
				<div className="flex flex-col w-full gap-y-4">
					<BusinessInfo />
					<ContactInfo />
				</div>

				<div className="w-full flex items-center gap-3 mt-5 flex-col md:flex-row-reverse">
					{isLoading ? (
						<LoadingButton />
					) : (
						<button
							className="w-full text-center p-3 md:w-fit md:px-9 text-white rounded-md bg-[#017DC3]"
							type="submit">
							Submit
						</button>
					)}
					<button
						className="w-full text-center p-3 md:w-fit md:px-9 text-[#017DC3]"
						type="reset">
						Reset
					</button>
				</div>
			</form>
		</div>
	);
};

export default Shipping;
