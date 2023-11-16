import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FC } from "react";
import { IoIosArrowDown } from "react-icons/io";

interface DropdownRolesProps {
  isDisabled: boolean;
}

const DropdownRoles: FC<DropdownRolesProps> = ({ isDisabled }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={"outline"}
          className="flex justify-between w-full items-center py-6"
          disabled={isDisabled}
        >
          <span className="text-gray-500">Roles</span>
          <span className="text-gray-500">
            <IoIosArrowDown />
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="md:w-[250px]">
        <DropdownMenuItem className="p-2 cursor-pointer text-sm">
          Admin
        </DropdownMenuItem>
        <DropdownMenuItem className="p-2 cursor-pointer text-sm">
          Supply Chain
        </DropdownMenuItem>
        <DropdownMenuItem className="p-2 cursor-pointer text-sm">
          Sales Agent
        </DropdownMenuItem>
        <DropdownMenuItem className="p-2 cursor-pointer text-sm">
          Billing and Collection
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownRoles;
