import { isInventoryAdded } from "@/api/inventory";
import ContainerInformationForm from "@/components/reuseable/ContainerInformationForm";
import HeaderWithBack from "@/components/reuseable/HeaderWithBack";
import LoadingButton from "@/components/reuseable/LoadingButton";
import SupplierFormInventory from "@/components/reuseable/SupplierFormInventory";
import {
	InventoryProps,
	InventorySupplierPostType,
	SupplierInventoryPost,
} from "@/constants/props";
import { headerBackClass } from "@/constants/reusable-class";
import { useEffect, useState } from "react";
import AlertDialog from "./helper/alert-dialog";
import { useMutation } from "@tanstack/react-query";

import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { MdOutlineError } from "react-icons/md";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

const AddInventory = () => {
	const [isLoadingButton, setIsLoadingButton] = useState(false);

	const [businessName, setBusinessName] = useState("");
	const [completeAddress, setCompleteAddress] = useState("");
	const [contactNumber, setContactNumber] = useState("");

	const [validUntil, setValidUntil] = useState("");

	const [validationError, setValidationError] = useState("");
	const [hasSupplierAccess, setHasSupplierAccess] = useState(true);

	const initialInventory: InventoryProps = {
		buyingRate: "",
		condition: "",
		containerType: "",
		depot: "",
		quantity: "",
		sellingRate: "",
		validUntil: "",
		location_id: "",
	};

	const mutation = useMutation({
		mutationKey: ["inventory", "add"],
		mutationFn: isInventoryAdded,
		onSuccess: () => {
			setIsLoadingButton(false);
		},
		onError: () => {
			setIsLoadingButton(false);
		},
	});

	useEffect(() => {
		const accessModule: string[] = JSON.parse(
			Cookies.get("access_module") || "",
		);

		const hasAccess = accessModule.find(
			(access) => access === "Supplier Management",
		);

		if (hasAccess) {
			setHasSupplierAccess(true);
		} else {
			setHasSupplierAccess(false);
		}
	}, [hasSupplierAccess]);

	const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setValidUntil("");

		// if (!(businessName && contactNumber && completeAddress)) {
		//   setValidationError("Supplier is a required field.");
		//   return;
		// }

		setValidUntil("");

		const formData = new FormData(event.currentTarget);

		setIsLoadingButton(true);

		const inventory: InventoryProps = {
			buyingRate: formData.get("buyingRate")?.toString() ?? "",
			condition: formData.get("condition")?.toString() ?? "",
			containerType: formData.get("containerType")?.toString() ?? "",
			depot: formData.get("depot")?.toString() ?? "",
			quantity: formData.get("quantity")?.toString() ?? "",
			sellingRate: formData.get("sellingRate")?.toString() ?? "0",
			validUntil,
			location_id: formData.get("location_id")?.toString() ?? "0",
		};

		const supplier: SupplierInventoryPost = {
			businessName,
		};

		const request: InventorySupplierPostType = {
			containerInformation: inventory,
			supplier,
		};

		mutation.mutate(request);
		if (mutation.isSuccess) {
			localStorage.clear();
		}
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
							containerInfo={initialInventory}
							setValidUntil={setValidUntil}
							validUntil={validUntil}
							key="AddInventoryFormKey"
						/>
					</div>
					{hasSupplierAccess && (
						<>
							<hr className="mt-7 mb-2" />
							<h3 className="text-sm font-bold my-3">Supplier</h3>
							<div className="flex flex-col w-full gap-y-4">
								<SupplierFormInventory
									businessName={businessName}
									setBusinessName={setBusinessName}
									completeAddress={completeAddress}
									setCompleteAddress={setCompleteAddress}
									contactNumber={contactNumber}
									setContactNumber={setContactNumber}
									isDisabled={false}
								/>
							</div>
						</>
					)}
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
				// <AlertDialog error={mutation.error as unknown as string} />
				<AlertDialog
					description="Cannot create new record for inventory, please try again"
					hasAnError={true}
					href="inventory"
					linkText="Go to inventory table"
					title="Failed adding data"
					key={"AddInventoryAlertDialogError"}
				/>
			) : (
				mutation.isSuccess && (
					<AlertDialog
						description="New data successfully added to the inventory."
						hasAnError={false}
						href="inventory"
						linkText="Go to inventory table"
						title="Successfully created"
						key={"AddInventoryAlertDialogSuccess"}
					/>
				)
			)}
			{validationError && (
				<HomeMadeError
					setValidationError={setValidationError}
					validationError={validationError}
				/>
			)}
		</div>
	);
};

interface HomeMadeErrorProps {
	validationError: string;
	setValidationError: React.Dispatch<React.SetStateAction<string>>;
}

function HomeMadeError({
	validationError,
	setValidationError,
}: HomeMadeErrorProps) {
	const handleOpen = (isOpen: boolean) => {
		if (!isOpen) {
			setValidationError("");
		}
	};
	return (
		<Dialog defaultOpen={true} onOpenChange={handleOpen}>
			<DialogContent className={"text-red-500"}>
				<DialogHeader className="flex items-center justify-center gap-3">
					<div className="text-5xl">
						<MdOutlineError />
					</div>
					<DialogTitle>Failed adding data</DialogTitle>
					<DialogDescription className="max-w-sm text-center">
						{validationError}
					</DialogDescription>
				</DialogHeader>
				<DialogClose asChild>
					<Link
						to={`/inventory`}
						className="bg-[#017DC3] hover:bg-[#017DC3]/90 text-center w-full py-2 text-white rounded-md">
						Go to inventory table
					</Link>
				</DialogClose>
			</DialogContent>
		</Dialog>
	);
}

export default AddInventory;
