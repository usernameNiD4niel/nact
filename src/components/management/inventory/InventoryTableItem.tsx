import { getSpecificItem, updateInventory } from "@/api/inventory";
import ContainerInformationForm from "@/components/reuseable/ContainerInformationForm";
import FormDropdown from "@/components/reuseable/FormDropdown";
import HeaderWithBack from "@/components/reuseable/HeaderWithBack";
import LoadingButton from "@/components/reuseable/LoadingButton";
import SupplierFormInventory from "@/components/reuseable/SupplierFormInventory";
import { InventorySupplierPostType } from "@/constants/props";
import { headerBackClass } from "@/constants/reusable-class";
import { cn } from "@/lib/utils";

import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AlertDialog from "./helper/alert-dialog";

const InventoryTableItem = () => {
	const location = useLocation();

	const [isDisabled, setIsDisabled] = useState(true);
	const arrayEndpoint = location.pathname.split("/");
	const id = arrayEndpoint[arrayEndpoint.length - 1];

	const [businessName, setBusinessName] = useState("");
	const [completeAddress, setCompleteAddress] = useState("");
	const [contactNumber, setContactNumber] = useState("");
	const [state, setState] = useState("");
	const [country, setCountry] = useState("");
	const [validUntil, setValidUntil] = useState("");

	const [isLoadingButton, setIsLoadingButton] = useState(false);
	const [updateResponse, setUpdateResponse] = useState({
		success: false,
		message: "",
	});

	const { data, isLoading, isError } = useQuery(["inventory-item", "form"], {
		queryFn: () => getSpecificItem(id),
	});

	const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (updateResponse.message && updateResponse.message.length > 0) {
			setUpdateResponse({
				message: "",
				success: false,
			});
		}

		const formData = new FormData(event.currentTarget);
		setIsLoadingButton(true);

		const containerType = formData.get("containerType")?.toString() || "";
		const condition = formData.get("condition")?.toString() || "";
		const city = formData.get("city")?.toString() || "";
		const region = formData.get("region")?.toString() || "";
		const depot = formData.get("depot")?.toString() || "";
		const quantity = formData.get("quantity")?.toString() || "";
		const buyingRate = formData.get("buyingRate")?.toString() || "";
		const sellingRate = formData.get("sellingRate")?.toString() || "";

		const supp: InventorySupplierPostType = {
			containerInformation: {
				containerType,
				buyingRate,
				city,
				condition,
				country,
				depot,
				quantity,
				region,
				sellingRate,
				state,
				validUntil,
			},
			supplier: {
				businessName,
			},
		};

		console.log(`all of the supp ::: ${JSON.stringify(supp, null, 2)}`);

		// ! create a PATCH request here...
		const response = await updateInventory(id, supp);

		setUpdateResponse(response);
		setIsLoadingButton(false);
	};

	useEffect(() => {
		if (data) {
			setBusinessName(data.supplier.businessName);
			setCompleteAddress(data.supplier.completeAddress);
			setContactNumber(data.supplier.contactNumber);

			setState(data.containerInformation.state);
			setCountry(data.containerInformation.country);
			setValidUntil(data.containerInformation.validUntil);
		}
	}, [data]);

	const showAlert = () => {
		if (updateResponse.message && updateResponse.message.length > 0) {
			if (updateResponse.success) {
				return (
					<AlertDialog
						description={updateResponse.message}
						hasAnError={false}
						href="inventory"
						linkText="Go to inventory table"
						title="Successfully updated"
						key={"UpdateInventoryAlertDialogSuccess"}
					/>
				);
			} else {
				return (
					<AlertDialog
						description={updateResponse.message}
						hasAnError={true}
						href="inventory"
						linkText="Go to inventory table"
						title="Failed to update"
						key={"UpdateInventoryAlertDialogError"}
					/>
				);
			}
		}
		return null;
	};

	const content = () => {
		if (isError) {
			return (
				<div className="w-full h-[80vh] flex items-center justify-center">
					<p className="text-sm">
						Error occured, please check your internet and try again
					</p>
				</div>
			);
		}

		if (isLoading) {
			return (
				<div className="w-full h-[80vh] flex items-center justify-center">
					<p className="text-sm">Getting all the resources, please wait...</p>
				</div>
			);
		}

		return data.containerInformation && data.supplier ? (
			<form
				className="p-2 flex flex-col gap-y-2 w-full lg:w-[60%] py-10 bg-white px-6"
				onSubmit={handleFormSubmit}>
				<div className="flex justify-between items-center w-full">
					<h3 className="text-sm font-bold my-3">Container Information</h3>
					<FormDropdown
						setIsDisabled={setIsDisabled}
						key="InventoryFormDropdown"
						modalLabel="This action cannot be undone. This will permanently delete this invetory item and remove this data from our server."
						navigateTo="inventory"
						endpoint={`api/inventory/${id}`}
					/>
				</div>
				<div className="flex flex-col w-full gap-y-4">
					<ContainerInformationForm
						containerInfo={data.containerInformation}
						isDisabled={isDisabled}
						country={country}
						setCountry={setCountry}
						setState={setState}
						setValidUntil={setValidUntil}
						state={state}
						validUntil={validUntil}
						key="InventoryTableItemFormKey"
					/>
				</div>
				<hr className="mb-3 mt-5" />
				<h3 className="text-sm font-bold mb-3">Supplier</h3>
				<div className="flex flex-col w-full gap-y-4">
					<SupplierFormInventory
						businessName={businessName}
						isDisabled={isDisabled}
						setBusinessName={setBusinessName}
						completeAddress={completeAddress}
						setCompleteAddress={setCompleteAddress}
						contactNumber={contactNumber}
						setContactNumber={setContactNumber}
						key={"InventoryTableItem"}
					/>
				</div>
				{!isDisabled && (
					<div className="w-full flex flex-col md:flex-row-reverse items-center gap-3 mt-5">
						{isLoadingButton ? (
							<LoadingButton />
						) : (
							<button
								type="submit"
								className="w-full text-center p-3 md:w-fit md:px-9 text-white rounded-md bg-[#017DC3]">
								Update
							</button>
						)}
						<button
							type="reset"
							className="w-full text-center p-3 md:w-fit md:px-9 text-[#017DC3]">
							Reset
						</button>
					</div>
				)}
				{showAlert()}
			</form>
		) : (
			<div className="w-full h-[80vh] flex items-center justify-center">
				<p className="text-sm">No Inventory item found!</p>
			</div>
		);
	};

	return (
		<div
			className={cn(headerBackClass, "w-full bg-green-600 h-11 absolute z-30")}>
			<div className="flex items-center justify-center flex-col w-full mt-10">
				<HeaderWithBack text="Inventory Item" />
				{content()}
			</div>
		</div>
	);
};

export default InventoryTableItem;
