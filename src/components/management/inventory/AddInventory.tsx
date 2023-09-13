import ContainerInformationForm from "@/components/reuseable/ContainerInformationForm";
import HeaderWithBack from "@/components/reuseable/HeaderWithBack";
import SupplierFormInventory from "@/components/reuseable/SupplierFormInventory";
import {
	ContainerInformationProps,
	SuplierFormInventoryProps,
} from "@/constants/props";
import { headerBackClass } from "@/constants/reusable-class";
import { useState } from "react";

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

	return (
		<div className={headerBackClass}>
			<div className="flex items-center justify-center flex-col w-full mt-10">
				<HeaderWithBack text="Add Inventory" route="/inventory" />
				<form className="p-2 flex flex-col gap-y-2 w-full lg:w-[60%] py-10 bg-white px-6">
					<h3 className="text-sm font-bold my-3">Container Information</h3>
					<div className="flex flex-col w-full gap-y-4">
						<ContainerInformationForm
							isDisabled={false}
							props={containerInformation}
							key="AddInventoryFormKey"
						/>
					</div>
					<h3 className="text-sm font-bold my-3">Supplier</h3>
					<div className="flex flex-col w-full gap-y-4">
						<SupplierFormInventory
							isDisabled={false}
							props={supplierStateFieldObject}
						/>
					</div>
					<div className="w-full flex flex-col md:flex-row-reverse items-center gap-3 mt-5">
						<button
							type="submit"
							className="w-full text-center p-3 md:w-fit md:px-9 text-white rounded-md bg-primary">
							Submit
						</button>
						<button
							type="reset"
							className="w-full text-center p-3 md:w-fit md:px-9 text-primary">
							Reset
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default AddInventory;
