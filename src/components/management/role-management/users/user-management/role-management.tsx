import { Switch } from "@/components/ui/switch";
import DropdownRoles from "./dropdown-roles";

const RoleManagement = () => {
	return (
		<div className="w-full space-y-3 md:max-w-4xl">
			<div className="w-full flex justify-between items-center">
				<h2>Role Management</h2>
				<Switch id="dropdown-roles" />
			</div>
			<div className="w-full">
				<DropdownRoles />
			</div>
		</div>
	);
};

export default RoleManagement;
