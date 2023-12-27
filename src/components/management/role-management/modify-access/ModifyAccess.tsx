import ScalableSelect from "@/components/reuseable/ScalableSelect";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useInventoryState } from "@/utils/InventoryState";
import { useEffect, useState } from "react";
import SubmitFormModal from "../role-access/submit-form-modal";
import { useQuery } from "@tanstack/react-query";
import {
	getRoles,
	getSpecificAccessModule,
	updateAccessModule,
} from "@/api/roles";
import VerticalOption from "./vertical-option";

export default function ModifyAccess() {
	const [alert, setAlert] = useState({
		description: "",
		isSuccess: false,
		linkText: "Go to user table",
		title: "",
		to: "/role-management",
	});

	const [setActiveTab] = useInventoryState((state) => [state.setActiveTab]);

	const [isModalOpen, setIsModalOpen] = useState(false);

	const [selectedRole, setSelectedRole] = useState("");

	const [defaultAccess, setDefaultAccess] = useState({
		customer: false,
		roleManagement: false,
		supplierManagement: false,
		orderGenerator: false,
		salesAgent: false,
		inventoryOfficer: false,
		inventory: false,
	});

	async function getAccessModule() {
		const accessModule = await getSpecificAccessModule(selectedRole);

		const clone = {
			customer: false,
			roleManagement: false,
			supplierManagement: false,
			orderGenerator: false,
			salesAgent: false,
			inventoryOfficer: false,
			inventory: false,
		}; // so that it won't update the default access multiple times

		for (let i = 0; i < accessModule.length; ++i) {
			if (accessModule[i] === "Customer") {
				clone.customer = true;
				console.log("Customer");
			}
			if (accessModule[i] === "Role Management") {
				clone.roleManagement = true;
				console.log("Role Management");
			}
			if (accessModule[i] === "Supplier Management") {
				clone.supplierManagement = true;
				console.log("Supplier Management");
			}
			if (accessModule[i] === "Order Generator") {
				clone.orderGenerator = true;
			}
			if (accessModule[i] === "Sales Agent") {
				clone.salesAgent = true;
			}
			if (accessModule[i] === "Inventory Officer") {
				clone.inventoryOfficer = true;
			}
			if (accessModule[i] === "Inventory") {
				clone.inventory = true;
			}
		}

		setDefaultAccess(clone);
	}

	useEffect(() => {
		// get the access module
		console.log(`selected role ::: ${selectedRole}`);

		if (selectedRole && selectedRole.length > 0) {
			getAccessModule();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedRole]);

	useEffect(() => {
		setActiveTab(2);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const { data, isLoading /*, refetch*/ } = useQuery({
		queryKey: ["modify-access-role", "get-access-role"],
		queryFn: getRoles,
	});

	const labelClass = "flex gap-x-1 items-center";

	async function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		if (!selectedRole) {
			setIsModalOpen(true);
			setAlert({
				...alert,
				description: "Please select at least one Access Module",
				isSuccess: false,
				title: "Error modifying role",
			});
			return;
		}
		const formData = new FormData(event.currentTarget);

		// Access Module
		const customer = formData.get("customer")?.toString();
		const roleManagement = formData.get("roleManagement")?.toString();
		const supplierManagement = formData.get("supplierManagement")?.toString();
		const orderGenerator = formData.get("orderGenerator")?.toString();
		const salesAgent = formData.get("salesAgent")?.toString();
		const inventoryOfficer = formData.get("inventoryOfficer")?.toString();
		const inventory = formData.get("inventory")?.toString();

		if (
			!(
				customer ||
				roleManagement ||
				supplierManagement ||
				salesAgent ||
				inventory ||
				inventoryOfficer ||
				orderGenerator
			)
		) {
			setIsModalOpen(true);
			setAlert({
				...alert,
				description: "Please select at least one Access Module",
				isSuccess: false,
				title: "Error modifying role",
			});
			return;
		}

		const accessModules: string[] = [];

		if (customer) {
			accessModules.push(customer);
		}
		if (roleManagement) {
			accessModules.push(roleManagement);
		}
		if (supplierManagement) {
			accessModules.push(supplierManagement);
		}
		if (orderGenerator) {
			accessModules.push(orderGenerator);
		}
		if (salesAgent) {
			accessModules.push(salesAgent);
		}
		if (inventoryOfficer) {
			accessModules.push(inventoryOfficer);
		}
		if (inventory) {
			accessModules.push(inventory);
		}

		// Update roles.
		const { success, message } = await updateAccessModule(
			selectedRole,
			accessModules,
		);

		if (success) {
			setAlert({
				...alert,
				description: message,
				isSuccess: success,
				title: "Update Success",
			});
		} else {
			setAlert({
				...alert,
				description: message,
				isSuccess: success,
				title: "Error modifying role",
			});
		}
	}

	return (
		<div className="md:px-10 px-5 w-full flex items-center justify-center">
			<div className="mt-36 md:my-24 w-full max-w-4xl">
				<div className="w-full pb-4">
					<Label className="space-y-2 w-full flex justify-between items-center">
						<span>Roles</span>
						{isLoading ? (
							<div>...</div>
						) : (
							<VerticalOption
								roles={data ? data : []}
								/*refetch={refetch}*/ selectedRole={selectedRole}
							/>
						)}
					</Label>
					<ScalableSelect
						items={data ? data : []}
						name="role"
						placeholder={isLoading ? "Loading..." : "Select Role"}
						isDisabled={isLoading}
						setSelected={setSelectedRole}
						key={"ScalableSelectModifyAccess"}
					/>
				</div>
				<form className="flex flex-col" onSubmit={handleFormSubmit}>
					<Label className="mt-6 font-bold">Access Module</Label>
					<div className="w-full grid grid-cols-2 ">
						<div className="flex flex-col gap-3 py-3">
							<Label className={labelClass}>
								<Checkbox
									name="customer"
									defaultChecked={defaultAccess.customer}
								/>
								Customer
							</Label>
							<Label className={labelClass}>
								<Checkbox
									name="role-management"
									defaultChecked={defaultAccess.roleManagement}
								/>
								Role Management
							</Label>
							<Label className={labelClass}>
								<Checkbox
									name="supplier-management"
									defaultChecked={defaultAccess.supplierManagement}
								/>
								Supplier Management
							</Label>
							<Label className={labelClass}>
								<Checkbox
									name="order-generator"
									defaultChecked={defaultAccess.orderGenerator}
								/>
								Order Generator
							</Label>
						</div>
						<div className="flex flex-col gap-3 py-3">
							<Label className={labelClass}>
								<Checkbox
									name="sales-agent"
									defaultChecked={defaultAccess.salesAgent}
								/>
								Sales Agent
							</Label>
							<Label className={labelClass}>
								<Checkbox
									name="inventory-officer"
									defaultChecked={defaultAccess.inventoryOfficer}
								/>
								Inventory Officer
							</Label>
							<Label className={labelClass}>
								<Checkbox
									name="inventory"
									defaultChecked={defaultAccess.inventory}
								/>
								Inventory
							</Label>
						</div>
					</div>
					<div className="w-full flex justify-end">
						<Button className="w-fit">Update Access</Button>
					</div>
				</form>
			</div>
			{isModalOpen && (
				<SubmitFormModal
					description={alert.description}
					isSuccess={alert.isSuccess}
					linkText={alert.linkText}
					setIsModalOpen={setIsModalOpen}
					title={alert.title}
					to={alert.to}
					key={"ModifyAccess"}
				/>
			)}
		</div>
	);
}
