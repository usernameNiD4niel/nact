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
	buyingRate,
	state,
	containerType,
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
						items={containerType}
						label="Product Name"
						setCheck={setCheck}
						dropdown="containerType"
						setIsFiltering={setIsFiltering}
						key={"FilteringSheetcontainerType"}
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
						label="Quantity"
						setIsFiltering={setIsFiltering}
						setCheck={setCheck}
						dropdown="quantity"
						key={"FilteringSheetQuantity"}
					/>
					<FilterAccordion
						check={check}
						items={depot}
						label="Depot"
						setIsFiltering={setIsFiltering}
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
						dropdown="buyingRate"
						key={"FilteringSheetBuyingRate"}
					/>
				</div>
			</SheetContent>
		</Sheet>
	);
};

export default FilteringSheet;
