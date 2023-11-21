import { getSpecificItem } from "@/api/inventory";
import ContainerInformationForm from "@/components/reuseable/ContainerInformationForm";
import FormDropdown from "@/components/reuseable/FormDropdown";
import HeaderWithBack from "@/components/reuseable/HeaderWithBack";
import SupplierFormInventory from "@/components/reuseable/SupplierFormInventory";
import { Button } from "@/components/ui/button";
import { headerBackClass } from "@/constants/reusable-class";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const InventoryTableItem = () => {
	const location = useLocation();

	const [isDisabled, setIsDisabled] = useState(true);
	const arrayEndpoint = location.pathname.split("/");
	const id = arrayEndpoint[arrayEndpoint.length - 1];

	const { data, isLoading, isError } = useQuery(["inventory-item", "form"], {
		queryFn: () => getSpecificItem(id),
	});

	const [supplierName, setSupplierName] = useState(""); // make the default from the server
	// if (!data) {
	// 	return (
	// 		<h1 className="bg-green-500 w-full z-30">No data found in the table!</h1>
	// 	);
	// }

	const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);

		console.log(
			`container type ::: ${formData.get("containerType")?.toString()}`,
		);

		console.log(`selling rate ::: ${formData.get("sellingRate")?.toString()}`);
		console.log(`buying rate ::: ${formData.get("buyingRate")?.toString()}`);

		console.log(`here's the dataaa ::: ${JSON.stringify(formData, null, 2)}`);
	};

	const content = () => {
		if (isError) {
			return (
				<div className="w-full h-[80vh] flex items-center justify-center">
					<p className="text-sm">
						Error occured, there's no backend data yet...
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

		return (
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
						containerInfo={data?.containerInformation}
						isDisabled={isDisabled}
						key="InventoryTableItemFormKey"
					/>
				</div>
				<hr className="mb-3 mt-5" />
				<h3 className="text-sm font-bold mb-3">Supplier</h3>
				<div className="flex flex-col w-full gap-y-4">
					<SupplierFormInventory
						supplierInventory={data?.supplier}
						setSupplierName={setSupplierName}
						supplierName={supplierName}
						key={"InventoryTableItem"}
					/>
				</div>
				<Button>Submit</Button>
			</form>
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
