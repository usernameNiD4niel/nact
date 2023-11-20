import { isInventoryAdded } from "@/api/inventory";
import ContainerInformationForm from "@/components/reuseable/ContainerInformationForm";
import HeaderWithBack from "@/components/reuseable/HeaderWithBack";
import LoadingButton from "@/components/reuseable/LoadingButton";
import SupplierFormInventory from "@/components/reuseable/SupplierFormInventory";
import {
	ContainerInformationProps,
	InventoryProps,
	SuplierFormInventoryProps,
} from "@/constants/props";
import { headerBackClass } from "@/constants/reusable-class";
import { useState } from "react";
import AlertDialog from "./helper/alert-dialog";
import { useMutation } from "@tanstack/react-query";

const AddInventory = () => {
	// Container Information state fields
	const [containerType, setContainerType] = useState<string>("");
	const [condition, setCondition] = useState<string>("");
	const [city, setCity] = useState<string>("");
	const [state, setState] = useState<string>("");
	const [region, setRegion] = useState<string>("");
	const [country, setCountry] = useState<string>("");
	const [depot, setDepot] = useState<string>("");
	const [validUntil, setValidUntil] = useState<string>("");
	const [quantity, setQuantity] = useState<string>("");
	const [buyingRate, setBuyingRate] = useState<string>("");
	const [sellingRate, setSellingRate] = useState<string>("");

	// Supplier state fields
	const [supplierName, setSupplierName] = useState<string>("");
	const [businessName, setBusinessName] = useState<string>("");
	const [completeAddress, setCompleteAddress] = useState<string>("");
	const [contactNumber, setContactNumber] = useState<string>("");

	const [isLoadingButton, setIsLoadingButton] = useState(false);

	const containerInformation: ContainerInformationProps = {
		buyingRate,
		city,
		country,
		condition,
		state,
		containerType,
		depot,
		quantity,
		region,
		sellingRate,
		validUntil,
		setBuyingRate,
		setCity,
		setCountry,
		setCondition,
		setContainerType,
		setDepot,
		setQuantity,
		setRegion,
		setSellingRate,
		setState,
		setValidUntil,
	};

	const supplierStateFieldObject: SuplierFormInventoryProps = {
		businessName,
		completeAddress,
		contactNumber,
		setBusinessName,
		setCompleteAddress,
		setContactNumber,
		setSupplierName,
		supplierName,
	};

	const clearUserInput = () => {
		setBusinessName("");
		setBuyingRate("");
		setCity("");
		setCompleteAddress("");
		setCondition("");
		setContactNumber("");
		setContainerType("");
		setCountry("");
		setDepot("");
		setQuantity("");
		setRegion("");
		setSellingRate("");
		setState("");
		setValidUntil("");
		setSupplierName("");
	};

	const [containerTypeError, setContainerTypeError] = useState("");

	const mutation = useMutation({
		mutationKey: ["inventory", "add"],
		mutationFn: isInventoryAdded,
		onSuccess: () => {
			clearUserInput();
		},
	});

	const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (!containerType || containerType === null) {
			setContainerTypeError("Container type is a required field");
			return;
		}

		setIsLoadingButton(true);

		const inventory: InventoryProps = {
			businessName,
			buyingRate,
			city,
			completeAddress,
			condition,
			contactNumber,
			containerType,
			country,
			depot,
			quantity,
			region,
			sellingRate,
			state,
			validUntil,
		};

		mutation.mutate(inventory);

		console.log(`the inventory data ::: ${JSON.stringify(inventory, null, 2)}`);
	};

	return (
		<div className={headerBackClass}>
			<div className="flex items-center justify-center flex-col w-full mt-10">
				<HeaderWithBack text="Add Inventory" />
				<form
					className="p-2 flex flex-col gap-y-2 w-full lg:w-[60%] py-10 bg-white px-6"
					onSubmit={handleFormSubmit}>
					<h3 className="text-sm font-bold my-3">Container Information</h3>
					<div className="flex flex-col w-full gap-y-4">
						<ContainerInformationForm
							isDisabled={false}
							props={containerInformation}
							containerTypeError={containerTypeError}
							key="AddInventoryFormKey"
						/>
					</div>
					<hr className="mt-7 mb-2" />
					<h3 className="text-sm font-bold my-3">Supplier</h3>
					<div className="flex flex-col w-full gap-y-4">
						<SupplierFormInventory props={supplierStateFieldObject} />
					</div>
					<div className="w-full flex flex-col md:flex-row-reverse items-center gap-3 mt-5">
						{isLoadingButton ? (
							<LoadingButton />
						) : (
							<button
								type="submit"
								className="w-full text-center p-3 md:w-fit md:px-9 text-white rounded-md bg-[#017DC3]">
								Submit
							</button>
						)}
						<button
							type="reset"
							className="w-full text-center p-3 md:w-fit md:px-9 text-[#017DC3]">
							Reset
						</button>
					</div>
				</form>
			</div>
			{mutation.isError ? (
				<AlertDialog error={mutation.error as unknown as string} />
			) : (
				mutation.isSuccess && <AlertDialog error={""} />
			)}
		</div>
	);
};

// const ShowAlert = ({ error }: { error: string }) => {
// 	const mainParent =
// 		"absolute overflow-hidden inset-0 z-20 bg-gray-600 bg-opacity-50 flex items-center justify-center";
// 	const card = "w-[320px] p-4 rounded-md";

// 	return (
// 		<>
// 			{error ? (
// 				<div className={mainParent}>
// 					<p>
// 						<MdOutlineError />
// 					</p>
// 					<div className={card}>
// 						<span>{error}</span>
// 					</div>
// 				</div>
// 			) : (
// 				<div className={mainParent}>
// 					<p>
// 						<FaCircleCheck />
// 					</p>
// 					<div className={card}>
// 						<span>New data successfully added to the inventory.</span>
// 					</div>
// 				</div>
// 			)}
// 		</>
// 	);
// };

export default AddInventory;
