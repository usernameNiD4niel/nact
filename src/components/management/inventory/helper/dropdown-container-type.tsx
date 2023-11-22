import { containerType } from "@/constants/arrays";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FC } from "react";
interface DropdownContainerTypeProps {
  defaultValue?: string;
}

const DropdownContainerType: FC<DropdownContainerTypeProps> = ({
  defaultValue,
}) => {
  return (
    <div className="space-y-1">
      <Select name="containerType">
        <SelectTrigger className="w-full py-6 border-black border-opacity-20">
          <SelectValue
            placeholder={
              defaultValue ? defaultValue : "Select a container type"
            }
          />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Container Types</SelectLabel>
            {containerType.map((container) => (
              <SelectItem value={container} key={container}>
                {container}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default DropdownContainerType;
