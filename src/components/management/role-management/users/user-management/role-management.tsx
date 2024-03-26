import { Switch } from "@/components/ui/switch";
import DropdownRoles from "./dropdown-roles";
import { FC } from "react";

interface RoleManagementProps {
	isDisabled: boolean;
	userType: string;
	status: string;
	setStatus: React.Dispatch<React.SetStateAction<string>>;
	setUserType: React.Dispatch<React.SetStateAction<string>>;
}

const RoleManagement: FC<RoleManagementProps> = ({
	isDisabled,
	setStatus,
	status,
	userType,
	setUserType,
}) => {
	const handleOnCheckChange = (checked: boolean) => {
		setStatus(checked ? "active" : "inactive");
	};

	return (
		<div className="w-full space-y-3 md:max-w-4xl">
			<div className="w-full flex justify-between items-center">
				<h2>Role Management</h2>
				<Switch
					id="dropdown-roles"
					disabled={isDisabled}
					checked={status === "active"}
					onCheckedChange={handleOnCheckChange}
				/>
			</div>
			<div className="w-full">
				<DropdownRoles
					isDisabled={isDisabled}
					userType={userType}
					setUserType={setUserType}
				/>
			</div>
		</div>
	);
};

export default RoleManagement;
