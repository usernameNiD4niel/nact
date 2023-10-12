import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BsChevronDown } from "react-icons/bs";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { FC, useEffect } from "react";
import { CheckboxShape } from "@/constants/props";

type FilteringDropdownProps = {
  label: string;
  items: CheckboxShape[];
  check: CheckboxShape[];
  setCheck: React.Dispatch<React.SetStateAction<CheckboxShape[]>>;
};

const FilteringDropdown: FC<FilteringDropdownProps> = ({
  items,
  check,
  setCheck,
  label,
}) => {
  const handleCheckbox = (
    checked: boolean | "indeterminate",
    item: CheckboxShape
  ) => {
    if (checked) {
      //   const freshCheck: CheckboxShape = {
      //     id: item.id,
      //     label: item.label,
      //   };
      console.log("the item: ", item);

      setCheck((prevChecked) => [...prevChecked, item]);
    } else {
      const filteredChecked = check.filter((i) => i.id !== item.id);
      setCheck(filteredChecked);
    }

    console.log("handle: ", check);
    console.log("handle 2: ", item.id);

    return checked;
  };

  useEffect(() => {
    console.log("check: ", check);
  }, [check]);

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center justify-center gap-2 text-xs py-3">
          {label} <BsChevronDown />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="px-4 py-5 flex flex-col gap-4 justify-center">
        {items.map((item) => (
          <>
            <Label className="flex gap-2 items-center text-xs" key={item.id}>
              <Checkbox
                checked={check.find((i) => i.id === item.id)?.id === item.id}
                onCheckedChange={(checked) => handleCheckbox(checked, item)}
              />{" "}
              <span>{item.label}</span>
            </Label>
          </>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FilteringDropdown;
