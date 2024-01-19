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
	containerType: CheckboxShape[];
	city: CheckboxShape[];
	state: CheckboxShape[];
	quantity: CheckboxShape[];
	buyingRate: CheckboxShape[];
	supplier: CheckboxShape[];
	depot: CheckboxShape[];
	check: CheckboxShape[];
	setCheck: React.Dispatch<React.SetStateAction<CheckboxShape[]>>;
	setIsFiltering: React.Dispatch<React.SetStateAction<boolean>>;
	isAvailable: boolean;
};

const FilteringSheet: FC<FilteringSheetProps> = ({
	check,
	quantity,
	city,
	depot,
	buyingRate,
	state,
	containerType,
	setCheck,
	setIsFiltering,
	supplier,
	isAvailable,
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
						items={containerType}
						label="Product Name"
						setCheck={setCheck}
						dropdown="containerType"
						setIsFiltering={setIsFiltering}
						isAvailable={isAvailable}
						key={"FilteringSheetcontainerType"}
					/>
					<FilterAccordion
						check={check}
						items={city}
						label="City"
						isAvailable={isAvailable}
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
						isAvailable={isAvailable}
						dropdown="state"
						key={"FilteringSheetState"}
					/>
					<FilterAccordion
						check={check}
						items={quantity}
						label="Quantity"
						setIsFiltering={setIsFiltering}
						setCheck={setCheck}
						dropdown="quantity"
						isAvailable={isAvailable}
						key={"FilteringSheetQuantity"}
					/>
					<FilterAccordion
						check={check}
						items={depot}
						label="Depot"
						setIsFiltering={setIsFiltering}
						isAvailable={isAvailable}
						setCheck={setCheck}
						dropdown="depot"
						key={"FilteringSheetDepot"}
					/>
					<FilterAccordion
						check={check}
						items={buyingRate}
						label="Buying Rate"
						setIsFiltering={setIsFiltering}
						setCheck={setCheck}
						isAvailable={isAvailable}
						dropdown="buyingRate"
						key={"FilteringSheetBuyingRate"}
					/>
					<FilterAccordion
						check={check}
						items={supplier}
						label="Supplier"
						setIsFiltering={setIsFiltering}
						setCheck={setCheck}
						isAvailable={isAvailable}
						dropdown="supplier"
						key={"FilteringSheetSupplier"}
					/>
				</div>
			</SheetContent>
		</Sheet>
	);
};

export default FilteringSheet;
