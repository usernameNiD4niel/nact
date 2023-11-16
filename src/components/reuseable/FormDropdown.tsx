"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DeleteModal from "./DeleteModal";
import {
  HiChevronDown,
  HiOutlinePencilSquare,
  HiOutlineTrash,
} from "react-icons/hi2";

type FormDropdownProps = {
  setIsDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  endpoint: string;
};

const FormDropdown: React.FC<FormDropdownProps> = ({
  setIsDisabled,
  endpoint,
}) => {
  const [isModalWarning, setIsModalWarning] = React.useState(false);

  const handleEditAction = () => {
    setIsDisabled(false);
  };

  const handleDeleteAction = () => {
    setIsModalWarning(true);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex gap-2 ">
          <span className="text-xs md:text-sm font-semibold">Options</span>
          <HiChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="px-2 w-44 py-2">
        <DropdownMenuItem
          className="flex items-center p-2 gap-x-2 text-xs md:text-sm"
          onClick={handleEditAction}
        >
          <HiOutlinePencilSquare />
          <span>Edit</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex items-center p-2 gap-x-2 text-xs md:text-sm"
          onClick={handleDeleteAction}
        >
          <HiOutlineTrash />
          <span>Delete</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
      {isModalWarning && (
        <DeleteModal
          setIsModalWarning={setIsModalWarning}
          endpoint={endpoint}
        />
      )}
    </DropdownMenu>
  );
};

export default FormDropdown;
