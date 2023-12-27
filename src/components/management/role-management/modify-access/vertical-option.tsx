import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SlOptionsVertical } from "react-icons/sl";
import UpdateRole from "./update-role";
import { useState } from "react";
interface VerticalOptionProps {
  roles: string[];
  /*refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<string[], unknown>>;*/
}

export default function VerticalOption({
  roles,
}: //refetch,
VerticalOptionProps) {
  const [updateRoleOpen, setUpdateRoleOpen] = useState(false);

  function handleUpdate() {
    setUpdateRoleOpen(true);
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"link"} className="text-xs p-0" type="button">
            <SlOptionsVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={handleUpdate}>Update</DropdownMenuItem>
          <DropdownMenuItem>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {updateRoleOpen && (
        <UpdateRole
          roles={roles}
          setUpdateRoleOpen={setUpdateRoleOpen}
          updateRoleOpen={updateRoleOpen}
          //refetch={refetch}
        />
      )}
    </>
  );
}
