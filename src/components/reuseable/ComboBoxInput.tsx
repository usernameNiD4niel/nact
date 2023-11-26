// import "@/index.css";
import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { InventorySupplierAlter } from "@/constants/props";
type ComboBoxProps = {
	inputValue: string;
	setInputValue: React.Dispatch<React.SetStateAction<string>>;
	supplierName: InventorySupplierAlter[];
	isDisabled: boolean;
};

const ComboBoxInput: React.FC<ComboBoxProps> = ({
	inputValue,
	setInputValue,
	supplierName,
	isDisabled,
}) => {
	const [open, setOpen] = React.useState(false);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					disabled={isDisabled}
					aria-expanded={open}
					className="w-full justify-between py-6 disabled:bg-gray-200 disabled:border disabled:border-black disabled:border-opacity-50">
					{inputValue
						? supplierName.find(
								(supplier) => supplier.businessName === inputValue,
								// eslint-disable-next-line no-mixed-spaces-and-tabs
						  )?.businessName
						: "Select supplier name..."}
					<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className=" p-0">
				<Command>
					<CommandInput placeholder="Search supplier name..." />
					<CommandEmpty>No supplier name found.</CommandEmpty>
					<CommandGroup>
						{supplierName.map((supplier) => (
							<CommandItem
								key={supplier.businessName}
								value={supplier.businessName}
								onSelect={(currentValue: React.SetStateAction<string>) => {
									setInputValue(
										currentValue === inputValue ? "" : currentValue,
									);
									setOpen(false);
								}}>
								<Check
									className={cn(
										"mr-2 h-4 w-4",
										inputValue === supplier.businessName
											? "opacity-100"
											: "opacity-0",
									)}
								/>
								{supplier.businessName}
							</CommandItem>
						))}
					</CommandGroup>
				</Command>
			</PopoverContent>
		</Popover>
	);
};

export default ComboBoxInput;
