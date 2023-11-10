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
	productName: CheckboxShape[];
	city: CheckboxShape[];
	state: CheckboxShape[];
	quantity: CheckboxShape[];
	price: CheckboxShape[];
	depot: CheckboxShape[];
	check: CheckboxShape[];
	setCheck: React.Dispatch<React.SetStateAction<CheckboxShape[]>>;
	setIsFiltering: React.Dispatch<React.SetStateAction<boolean>>;
};

const FilteringSheet: FC<FilteringSheetProps> = ({
	check,
	quantity,
	city,
	depot,
	price,
	state,
	productName,
	setCheck,
	setIsFiltering,
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
						items={productName}
						label="Product Name"
						setCheck={setCheck}
						dropdown="productName"
						setIsFiltering={setIsFiltering}
						key={"FilteringSheetProductName"}
					/>
					<FilterAccordion
						check={check}
						items={city}
						label="City"
						setIsFiltering={setIsFiltering}
						setCheck={setCheck}
						dropdown="city"
						key={"FilteringSheetCity"}
					/>
					<FilterAccordion
						check={check}
						items={state}
						label="State"
						setIsFiltering={setIsFiltering}
						setCheck={setCheck}
						dropdown="state"
						key={"FilteringSheetState"}
					/>
					<FilterAccordion
						check={check}
						items={quantity}
						label="quantity"
						setIsFiltering={setIsFiltering}
						setCheck={setCheck}
						dropdown="quantity"
						key={"FilteringSheetQuantity"}
					/>
					<FilterAccordion
						check={check}
						items={depot}
						label="depot"
						setIsFiltering={setIsFiltering}
						setCheck={setCheck}
						dropdown="depot"
						key={"FilteringSheetDepot"}
					/>
					<FilterAccordion
						check={check}
						items={price}
						label="price"
						setIsFiltering={setIsFiltering}
						setCheck={setCheck}
						dropdown="price"
						key={"FilteringSheetPrice"}
					/>
				</div>
			</SheetContent>
		</Sheet>
	);
};

export default FilteringSheet;
