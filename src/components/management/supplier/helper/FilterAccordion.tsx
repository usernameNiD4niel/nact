import {
	getBusinessNameFilter,
	getContactFilter,
	getLocationFilter,
} from "@/api/supplier";
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
import useDebounce from "@/hooks/useDebounce";
import { FC, useEffect, useState } from "react";

type FilterAccordionProps = {
	label: string;
	items: CheckboxShape[];
	check: CheckboxShape[];
	setCheck: React.Dispatch<React.SetStateAction<CheckboxShape[]>>;
	dropdown: "businessName" | "location" | "contact";
};

const FilterAccordion: FC<FilterAccordionProps> = ({
	check,
	items,
	label,
	setCheck,
	dropdown,
}) => {
	const [isSearching, setIsSearching] = useState(false);
	const [search, setSearch] = useState("");
	const debounceSearchTerms = useDebounce<string>(search, 300);
	const [data, setData] = useState<CheckboxShape[]>([]);

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

	const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
		setIsSearching(true);
	};

	useEffect(() => setData(items), [items]);

	const getColumn = () => {
		switch (dropdown) {
			case "businessName":
				return "business_name";
			case "contact":
				return "phone_number";
			case "location":
				return dropdown;
		}
	};

	useEffect(() => {
		const getData = async () => {
			setIsSearching(true);
			if (debounceSearchTerms) {
				if (dropdown == "businessName") {
					const fetchedData = await getBusinessNameFilter(search);

					if (fetchedData) {
						if (fetchedData.length > 0) {
							const cleanedData: CheckboxShape[] = [];

							fetchedData.forEach((value) =>
								cleanedData.push({
									id: value.id,
									label: value.businessName,
									column: getColumn(),
								}),
							);

							setData(cleanedData);
						} else {
							const dataFetched: CheckboxShape[] = [];
							setData(dataFetched);
						}
					} else {
						const dataFetched: CheckboxShape[] = [];
						setData(dataFetched);
					}
				} else if (dropdown === "contact") {
					const fetchedData = await getContactFilter(search);

					if (fetchedData) {
						if (fetchedData.length > 0) {
							const cleanedData: CheckboxShape[] = [];

							fetchedData.forEach((value) =>
								cleanedData.push({
									id: value.id,
									label: value.companyPhoneNumber,
									column: getColumn(),
								}),
							);

							setData(cleanedData);
						} else {
							const dataFetched: CheckboxShape[] = [];
							setData(dataFetched);
						}
					} else {
						const dataFetched: CheckboxShape[] = [];
						setData(dataFetched);
					}
				} else {
					const fetchedData = await getLocationFilter(search);

					if (fetchedData) {
						if (fetchedData.length > 0) {
							const cleanedData: CheckboxShape[] = [];

							fetchedData.forEach((value) =>
								cleanedData.push({
									id: value.id,
									label: value.location,
									column: getColumn(),
								}),
							);

							setData(cleanedData);
						} else {
							const dataFetched: CheckboxShape[] = [];
							setData(dataFetched);
						}
					} else {
						const dataFetched: CheckboxShape[] = [];
						setData(dataFetched);
					}
				}
			}
			setIsSearching(false);
		};
		getData();
	}, [debounceSearchTerms]);

	const ComponentLoader = () => {
		if (isSearching) {
			return <div className="text-xs text-center">Searching...</div>;
		}

		if (!data || data.length === 0) {
			return <div className="text-xs text-center">No data found</div>;
		}

		return data.map((item) => (
			<Label className="flex gap-2 px-1 items-center pb-2" key={item.id}>
				<Checkbox
					checked={check.find((i) => i.id === item.id)?.id === item.id}
					onCheckedChange={(checked) => handleCheckbox(checked, item)}
					className="border-gray-400"
				/>{" "}
				<span>{item.label}</span>
			</Label>
		));
	};

	return (
		<Accordion type="single" collapsible className="w-full">
			<AccordionItem value="item-1">
				<AccordionTrigger>{label}</AccordionTrigger>
				<AccordionContent className="w-full">
					<div className="w-full px-1 pb-3 pt-1">
						<Input
							placeholder="Search"
							className="w-full"
							onChange={handleOnChange}
							value={search}
						/>
					</div>
					<ComponentLoader />
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	);
};

export default FilterAccordion;
