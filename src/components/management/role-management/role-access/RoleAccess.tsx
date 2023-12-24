import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useInventoryState } from "@/utils/InventoryState";
import { useEffect, useState } from "react";
import SubmitFormModal from "./submit-form-modal";
import { createNewRole } from "@/api/roles";
import { AccessModule } from "@/constants/props";

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

		if (!role) {
			setAlert({
				...alert,
				isSuccess: false,
				description: "Role is a required field, please fill field also.",
				title: "Failed to create",
			});
			setIsModalOpen(true);
			return;
		}

		let isValid = false;

		const postData: AccessModule = {
			customer_module: false,
			inventory_module: false,
			inventory_officer: false,
			order_generator: false,
			role_management: false,
			role_type: role.toString(),
			sales_agent: false,
			supplier_management: false,
		};

		if (customer) {
			postData.customer_module = true;
			isValid = true;
		}

		if (roleManagement) {
			postData.role_management = true;
			isValid = true;
		}

		if (supplierManagement) {
			postData.supplier_management = true;
			isValid = true;
		}

		if (orderGenerator) {
			postData.order_generator = true;
			isValid = true;
		}

		if (salesAgent) {
			postData.sales_agent = true;
			isValid = true;
		}

		if (inventoryOfficer) {
			postData.inventory_officer = true;
			isValid = true;
		}

		if (inventory) {
			postData.inventory_module = true;
			isValid = true;
		}

		if (isValid) {
			// Create an endpoint for this

			processRequest(postData);
		} else {
			setAlert({
				...alert,
				isSuccess: false,
				description:
					"Access module is required, please select at least 1 checkbox",
				title: "Failed to create",
			});
			setIsModalOpen(true);
		}
	}

	async function processRequest(postData: AccessModule) {
		const { success, message } = await createNewRole(postData);
		console.log(`message ::: ${message}`);

		if (success) {
			setAlert({
				...alert,
				isSuccess: true,
				description: message,
				title: "Successfully created",
			});
			setIsModalOpen(true);
		} else {
			setAlert({
				...alert,
				isSuccess: false,
				description: message,
				title: "Failed to create",
			});
			setIsModalOpen(true);
		}
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
					key={"RoleAccess"}
				/>
			)}
		</div>
	);
};

export default RoleAccess;
