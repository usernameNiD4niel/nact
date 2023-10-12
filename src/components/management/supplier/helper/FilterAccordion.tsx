import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { CheckboxShape } from "@/constants/props";
import { FC } from "react";

type FilterAccordionProps = {
	label: string;
	items: CheckboxShape[];
	check: CheckboxShape[];
	setCheck: React.Dispatch<React.SetStateAction<CheckboxShape[]>>;
};

const FilterAccordion: FC<FilterAccordionProps> = ({
	check,
	items,
	label,
	setCheck,
}) => {
	const handleCheckbox = (
		checked: boolean | "indeterminate",
		item: CheckboxShape,
	) => {
		if (checked) {
			setCheck((prevChecked) => [...prevChecked, item]);
		} else {
			const filteredChecked = check.filter((i) => i.id !== item.id);
			setCheck(filteredChecked);
		}
		return checked;
	};

	return (
		<Accordion type="single" collapsible className="w-full">
			<AccordionItem value="item-1">
				<AccordionTrigger>{label}</AccordionTrigger>
				{items.map((item) => (
					<AccordionContent>
						<Label className="flex gap-2 items-center text-xs" key={item.id}>
							<Checkbox
								checked={check.find((i) => i.id === item.id)?.id === item.id}
								onCheckedChange={(checked) => handleCheckbox(checked, item)}
							/>{" "}
							<span>{item.label}</span>
						</Label>
					</AccordionContent>
				))}
			</AccordionItem>
		</Accordion>
	);
};

export default FilterAccordion;
