import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SheetClose } from "@/components/ui/sheet";
import {
	CheckboxShape,
	CitySearch,
	DepotSearch,
	PriceSearch,
	ProductNameSearch,
	StateSearch,
} from "@/constants/props";
import useDebounce from "@/hooks/useDebounce";
import { FC, useEffect, useState } from "react";

import "../../../../../styles/styled-scrollbar.css";
import { getColumnSearch } from "@/api/inventory";

type FilterAccordionProps = {
	label: string;
	items: CheckboxShape[];
	check: CheckboxShape[];
	setCheck: React.Dispatch<React.SetStateAction<CheckboxShape[]>>;
	setIsFiltering: React.Dispatch<React.SetStateAction<boolean>>;
	dropdown:
		| "containerType"
		| "city"
		| "state"
		| "quantity"
		| "depot"
		| "buyingRate";
};

const FilterAccordion: FC<FilterAccordionProps> = ({
	check,
	items,
	label,
	setCheck,
	dropdown,
	setIsFiltering,
}) => {
	const [isSearching, setIsSearching] = useState(false);
	const [search, setSearch] = useState("");
	const debounceSearchTerms = useDebounce<string>(search, 300);
	const [data, setData] = useState<CheckboxShape[]>([]);
	const [checkboxState, setCheckboxState] = useState<CheckboxShape[]>([]);

	useEffect(() => {
		setCheckboxState(check);
	}, [check]);

	const handleCheckbox = (
		checked: boolean | "indeterminate",
		item: CheckboxShape,
	) => {
		if (checked) {
			setCheckboxState((prevChecked) => [...prevChecked, item]);
		} else {
			const filteredChecked = checkboxState.filter((i) => i.id !== item.id);
			setCheckboxState(filteredChecked);
		}
		return checked;
	};

	const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
		setIsSearching(true);
	};

	useEffect(() => setData(items), [items]);

	function searchColumnBind<T>(fetchedData: T[]) {
		if (fetchedData && fetchedData.length > 0) {
			const cleanedData: CheckboxShape[] = [];

			fetchedData.forEach((item) => {
				cleanedData.push({
					// @ts-expect-error - this is always has an id property
					id: item["id"],
					// @ts-expect-error - this is always has a property of the passed column
					label: item[dropdown],
					column: dropdown,
				});
			});
			setData(cleanedData);
			return;
		}

		setData([]);
	}

	useEffect(() => {
		const getData = async () => {
			setIsSearching(true);
			if (debounceSearchTerms) {
				if (dropdown === "containerType") {
					const fetchedData = await getColumnSearch<ProductNameSearch>(
						search,
						dropdown,
					);

					searchColumnBind<ProductNameSearch>(fetchedData);
				} else if (dropdown === "city") {
					const fetchedData = await getColumnSearch<CitySearch>(
						search,
						dropdown,
					);

					searchColumnBind<CitySearch>(fetchedData);
				} else if (dropdown === "state") {
					const fetchedData = await getColumnSearch<StateSearch>(
						search,
						dropdown,
					);

					searchColumnBind<StateSearch>(fetchedData);
				} else if (dropdown === "quantity") {
					const fetchedData = await getColumnSearch<StateSearch>(
						search,
						dropdown,
					);

					searchColumnBind<StateSearch>(fetchedData);
				} else if (dropdown === "depot") {
					const fetchedData = await getColumnSearch<DepotSearch>(
						search,
						dropdown,
					);

					searchColumnBind<DepotSearch>(fetchedData);
				} else {
					const fetchedData = await getColumnSearch<PriceSearch>(
						search,
						dropdown,
					);

					searchColumnBind<PriceSearch>(fetchedData);
				}
			}
			setIsSearching(false);
		};
		getData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [debounceSearchTerms]);

	const handleSelectAll = () => {
		// setCheck(items);
		setCheckboxState(items);
	};

	const handleOk = () => {
		setCheck(checkboxState);
		setIsFiltering(true);
	};

	const handleClearAll = () => {
		setCheckboxState([]);
	};

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
					checked={checkboxState.find((i) => i.id === item.id)?.id === item.id}
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
					<div className="flex items-center gap-2">
						<Button
							variant={"link"}
							className="text-[#017DC3] text-xs m-0 p-0"
							onClick={handleSelectAll}>
							Select All
						</Button>{" "}
						-{" "}
						<Button
							variant={"link"}
							className="text-[#017DC3] text-xs m-0 p-0"
							onClick={handleClearAll}>
							Clear
						</Button>
					</div>
					<div className="w-full px-1 pb-3 pt-1">
						<Input
							placeholder="Search"
							className="w-full"
							onChange={handleOnChange}
							value={search}
						/>
					</div>
					<div className="max-h-32 overflow-y-auto flex flex-col gap-4 filter-dropdown">
						<ComponentLoader />
					</div>
					<div className="w-full flex justify-end items-center gap-2 mt-2">
						<SheetClose className="cursor-pointer">
							<Button variant={"outline"}>Cancel</Button>
						</SheetClose>
						<SheetClose className="cursor-pointer">
							<Button
								className="bg-[#017DC3] text-white w-20 m-0 p-0 hover:bg-[#017DC3]/80"
								onClick={handleOk}>
								OK
							</Button>
						</SheetClose>
					</div>
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	);
};

export default FilterAccordion;
