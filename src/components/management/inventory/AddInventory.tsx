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
import { useEffect, useState } from "react";

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

	const [counter, setCounter] = useState(16);

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

	useEffect(() => {
		let interval: NodeJS.Timer;
		console.log("count");

		if (counter < 16 && counter > 0) {
			console.log("count 1");
			interval = setInterval(() => {
				setCounter((prevCount) => prevCount - 1);
			}, 1000);
		}
		return () => clearInterval(interval);
	}, [counter]);

	const isAlreadyAdded = async (inventoryData: InventoryProps) => {
		await isInventoryAdded(inventoryData).then((data) => {
			if (
				data.message &&
				data.message === "Inventory item added successfully"
			) {
				setCounter(14);
				clearUserInput();
			} else {
				setCounter(0);
			}
			setIsLoadingButton(false);
			console.log(data);
		});
	};

	const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

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

		isAlreadyAdded(inventory);
	};

	return (
		<div className={headerBackClass}>
			<div className="flex items-center justify-center flex-col w-full mt-10">
				<HeaderWithBack text="Add Inventory" route="/inventory" />
				<form
					className="p-2 flex flex-col gap-y-2 w-full lg:w-[60%] py-10 bg-white px-6"
					onSubmit={handleFormSubmit}>
					<h3 className="text-sm font-bold my-3">Container Information</h3>
					<div className="flex flex-col w-full gap-y-4">
						<ContainerInformationForm
							isDisabled={false}
							props={containerInformation}
							key="AddInventoryFormKey"
						/>
					</div>
					<hr className="mt-7 mb-2" />
					<h3 className="text-sm font-bold my-3">Supplier</h3>
					<div className="flex flex-col w-full gap-y-4">
						<SupplierFormInventory
							isDisabled={false}
							props={supplierStateFieldObject}
						/>
					</div>
					<div className="w-full flex flex-col md:flex-row-reverse items-center gap-3 mt-5">
						{isLoadingButton ? (
							<LoadingButton />
						) : (
							<button
								type="submit"
								className="w-full text-center p-3 md:w-fit md:px-9 text-white rounded-md bg-primary">
								Submit
							</button>
						)}
						<button
							type="reset"
							className="w-full text-center p-3 md:w-fit md:px-9 text-primary">
							Reset
						</button>
					</div>
				</form>
			</div>
			{counter <= 15 && counter >= 1 && (
				<div className="toast toast-end">
					<div className="alert alert-success">
						<span>New data successfully added to the inventory.</span>
					</div>
				</div>
			)}
		</div>
	);
};

export default AddInventory;
