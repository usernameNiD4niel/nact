import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BsChevronDown } from "react-icons/bs";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { FC } from "react";

type FilteringDropdownProps = {
	label: string;
	items: string[];
};

const FilteringDropdown: FC<FilteringDropdownProps> = ({ items, label }) => {
	return (
		<DropdownMenu modal={false}>
			<DropdownMenuTrigger asChild>
				<button className="flex items-center justify-center gap-2 text-xs py-3">
					{label} <BsChevronDown />
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="px-4 py-5 flex flex-col gap-4 justify-center">
				{items.map((item, index) => (
					<Label className="flex gap-2 items-center text-xs" key={index}>
						<Checkbox /> <span>{item}</span>
					</Label>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default FilteringDropdown;
