import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
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
				<AccordionContent className="w-full">
					<div className="w-full px-1 pb-3 pt-1">
						<Input placeholder="Search" className="w-full" />
					</div>
					{items.map((item) => (
						<Label className="flex gap-2 px-1 items-center pb-2" key={item.id}>
							<Checkbox
								checked={check.find((i) => i.id === item.id)?.id === item.id}
								onCheckedChange={(checked) => handleCheckbox(checked, item)}
								className="border-gray-400"
							/>{" "}
							<span>{item.label}</span>
						</Label>
					))}
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	);
};

export default FilterAccordion;
