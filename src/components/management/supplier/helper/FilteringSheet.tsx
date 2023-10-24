import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import FilterAccordion from "./FilterAccordion";
import { CheckboxShape } from "@/constants/props";
import { FC } from "react";

type FilteringSheetProps = {
	suppliers: CheckboxShape[];
	locations: CheckboxShape[];
	contacts: CheckboxShape[];
	check: CheckboxShape[];
	setCheck: React.Dispatch<React.SetStateAction<CheckboxShape[]>>;
};

const FilteringSheet: FC<FilteringSheetProps> = ({
	check,
	contacts,
	locations,
	suppliers,
	setCheck,
}) => {
	return (
		<Sheet>
			<div className="w-full flex justify-end items-center">
				<SheetTrigger asChild>
					<Button variant="noVariant" className="md:hidden w-fit text-xs">
						Filter
					</Button>
				</SheetTrigger>
			</div>
			<SheetContent className="bg-white overflow-y-auto">
				<SheetHeader>
					<SheetTitle className="text-start">Filter</SheetTitle>
				</SheetHeader>
				<div>
					<FilterAccordion
						check={check}
						items={suppliers}
						label="Supplier"
						setCheck={setCheck}
						dropdown="businessName"
						key={"FilteringSheetSupplier"}
					/>
					<FilterAccordion
						check={check}
						items={locations}
						label="Location"
						setCheck={setCheck}
						dropdown="location"
						key={"FilteringSheetLocation"}
					/>
					<FilterAccordion
						check={check}
						items={contacts}
						label="Contact"
						setCheck={setCheck}
						dropdown="contact"
						key={"FilteringSheetContact"}
					/>
				</div>
			</SheetContent>
		</Sheet>
	);
};

export default FilteringSheet;
