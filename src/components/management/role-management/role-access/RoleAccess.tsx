import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useInventoryState } from "@/utils/InventoryState";
import { useEffect, useState } from "react";
import SubmitFormModal from "./submit-form-modal";

const RoleAccess = () => {
	const [alert, setAlert] = useState({
		description: "",
		isSuccess: false,
		linkText: "Go to user table",
		title: "",
		to: "/role-management",
	});

	const [setActiveTab] = useInventoryState((state) => [state.setActiveTab]);

	const [isModalOpen, setIsModalOpen] = useState(false);

	useEffect(() => {
		setActiveTab(1);
	}, []);

	const labelClass = "flex gap-x-1 items-center";

	function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);

		const role = formData.get("role");
		const customer = formData.get("customer");
		const roleManagement = formData.get("role-management");
		const supplierManagement = formData.get("supplier-management");
		const orderGenerator = formData.get("order-generator");
		const salesAgent = formData.get("sales-agent");
		const inventoryOfficer = formData.get("inventory-officer");
		const inventory = formData.get("inventory");

		const form = [];

		if (role) {
			form.push(role);
		}

		if (customer) {
			form.push(customer);
		}

		if (roleManagement) {
			form.push(roleManagement);
		}

		if (supplierManagement) {
			form.push(supplierManagement);
		}

		if (orderGenerator) {
			form.push(orderGenerator);
		}

		if (salesAgent) {
			form.push(salesAgent);
		}

		if (inventoryOfficer) {
			form.push(inventoryOfficer);
		}

		if (inventory) {
			form.push(inventory);
		}

		if (form.length > 0) {
			// Create an endpoint for this
		} else {
			setAlert({
				...alert,
				isSuccess: false,
				description:
					"Access module is required, please select at least 1 checkbox",
				title: "Failed to create",
			});
		}
		setIsModalOpen(true);
	}

	return (
		<div className="md:px-10 px-5 w-full flex items-center justify-center">
			<form
				className="flex flex-col mt-36 md:my-24 w-full max-w-4xl"
				onSubmit={handleFormSubmit}>
				<Label className="space-y-2">
					<span>Create role</span>
					<Input name="role" required />
				</Label>
				<Label className="mt-6 font-bold">Access Module</Label>
				<div className="w-full grid grid-cols-2 ">
					<div className="flex flex-col gap-3 py-3">
						<Label className={labelClass}>
							<Checkbox name="customer" />
							Customer
						</Label>
						<Label className={labelClass}>
							<Checkbox name="role-management" />
							Role Management
						</Label>
						<Label className={labelClass}>
							<Checkbox name="supplier-management" />
							Supplier Management
						</Label>
						<Label className={labelClass}>
							<Checkbox name="order-generator" />
							Order Generator
						</Label>
					</div>
					<div className="flex flex-col gap-3 py-3">
						<Label className={labelClass}>
							<Checkbox name="sales-agent" />
							Sales Agent
						</Label>
						<Label className={labelClass}>
							<Checkbox name="inventory-officer" />
							Inventory Officer
						</Label>
						<Label className={labelClass}>
							<Checkbox name="inventory" />
							Inventory
						</Label>
					</div>
				</div>
				<div className="w-full flex justify-end">
					<Button className="w-fit">Add Role</Button>
				</div>
			</form>
			{isModalOpen && (
				<SubmitFormModal
					description={alert.description}
					isSuccess={alert.isSuccess}
					linkText={alert.linkText}
					setIsModalOpen={setIsModalOpen}
					title={alert.title}
					to={alert.to}
				/>
			)}
		</div>
	);
};

export default RoleAccess;
