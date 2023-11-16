import { Switch } from "@/components/ui/switch";
import DropdownRoles from "./dropdown-roles";
import { FC } from "react";

interface RoleManagementProps {
  isDisabled: boolean;
}

const RoleManagement: FC<RoleManagementProps> = ({ isDisabled }) => {
  return (
    <div className="w-full space-y-3 md:max-w-4xl">
      <div className="w-full flex justify-between items-center">
        <h2>Role Management</h2>
        <Switch id="dropdown-roles" disabled={isDisabled} />
      </div>
      <div className="w-full">
        <DropdownRoles isDisabled={isDisabled} />
      </div>
    </div>
  );
};

export default RoleManagement;
