import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BsChevronDown } from "react-icons/bs";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { FC, useEffect, useState } from "react";
import {
	CheckboxShape,
	CitySearch,
	DepotSearch,
	PriceSearch,
	ProductNameSearch,
	StateSearch,
	SupplierSearch,
} from "@/constants/props";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import "../../../../../styles/styled-scrollbar.css";
import useDebounce from "@/hooks/useDebounce";
import { getColumnSearch } from "@/api/inventory";

type FilteringDropdownProps = {
	label: string;
	items: CheckboxShape[];
	check: CheckboxShape[];
	setCheck: React.Dispatch<React.SetStateAction<CheckboxShape[]>>;
	dropdown:
		| "containerType"
		| "city"
		| "state"
		| "quantity"
		| "depot"
		| "buyingRate"
		| "supplier";
	setIsFiltering: React.Dispatch<React.SetStateAction<boolean>>;
	isAvailable: boolean;
};

const FilteringDropdown: FC<FilteringDropdownProps> = ({
	items,
	check,
	setCheck,
	label,
	dropdown,
	setIsFiltering,
	isAvailable,
}) => {
	const [search, setSearch] = useState("");
	const debounceSearchTerms = useDebounce<string>(search, 100);
	const [data, setData] = useState<CheckboxShape[]>([]);
	const [isSearching, setIsSearching] = useState(false);
	const [checkboxState, setCheckboxState] = useState<CheckboxShape[]>([]);

	useEffect(() => {
		setCheckboxState(check);
	}, [check]);

	const handleCheckbox = (
		checked: boolean | "indeterminate",
		item: CheckboxShape,
	) => {
		if (search) {
			setSearch("");
		}
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
						"type",
						isAvailable,
					);

					searchColumnBind<ProductNameSearch>(fetchedData);
				} else if (dropdown === "city") {
					const fetchedData = await getColumnSearch<CitySearch>(
						search,
						dropdown,
						isAvailable,
					);

					searchColumnBind<CitySearch>(fetchedData);
				} else if (dropdown === "state") {
					const fetchedData = await getColumnSearch<StateSearch>(
						search,
						dropdown,
						isAvailable,
					);

					searchColumnBind<StateSearch>(fetchedData);
				} else if (dropdown === "quantity") {
					const fetchedData = await getColumnSearch<StateSearch>(
						search,
						dropdown,
						isAvailable,
					);

					searchColumnBind<StateSearch>(fetchedData);
				} else if (dropdown === "depot") {
					const fetchedData = await getColumnSearch<DepotSearch>(
						search,
						dropdown,
						isAvailable,
					);

					searchColumnBind<DepotSearch>(fetchedData);
				} else if (dropdown === "supplier") {
					const fetchedData = await getColumnSearch<SupplierSearch>(
						search,
						dropdown,
						isAvailable,
					);

					searchColumnBind<SupplierSearch>(fetchedData);
				} else {
					const fetchedData = await getColumnSearch<PriceSearch>(
						search,
						dropdown,
						isAvailable,
					);

					searchColumnBind<PriceSearch>(fetchedData);
				}
			}
			setIsSearching(false);
		};
		getData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [debounceSearchTerms]);

	const ComponentLoader = () => {
		if (isSearching) {
			return <div className="text-xs text-center">Searching...</div>;
		}

		if (!data || data.length === 0) {
			return <div className="text-xs text-center">No data found</div>;
		}

		return data.map((item) => (
			<Label
				className="flex gap-2 items-center text-xs"
				key={`${item.id}${item.column}${item.label}`}>
				<Checkbox
					checked={checkboxState.find((i) => i.id === item.id)?.id === item.id}
					onCheckedChange={(checked) => handleCheckbox(checked, item)}
					className="border-gray-400"
				/>
				<span>{item.label}</span>
			</Label>
		));
	};

	const handleSelectAll = () => {
		// setCheck(items);
		setCheckboxState((prevCheckbox) => [...prevCheckbox, ...items]);
	};

	const handleOk = () => {
		setIsFiltering(true);
		if (checkboxState.length === 0) {
			setCheck(checkboxState);
			return;
		}
		const items = new Set(checkboxState);

		for (let i = 0; i < checkboxState.length; i++) {
			if (!items.has(checkboxState[i])) {
				items.add(checkboxState[i]);
			}
		}

		setCheck([...items]);
	};

	const handleClearAll = () => {
		const unique: CheckboxShape[] = checkboxState.filter((dataItem) => {
			return !data.some(
				(checkboxItem) => dataItem.label === checkboxItem.label,
			);
		});

		setCheckboxState(unique);
	};

	return (
		<DropdownMenu modal={false}>
			<DropdownMenuTrigger asChild>
				<button className="flex items-center justify-center gap-2 text-xs py-3">
					{label} <BsChevronDown />
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="px-4 py-5 flex flex-col gap-2 justify-center z-0">
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
				<div className="flex flex-col gap-4">
					<Input
						placeholder="Search"
						className="w-full"
						value={search}
						onChange={handleOnChange}
					/>
					<div className="max-h-32 overflow-y-auto flex flex-col gap-4 filter-dropdown">
						<ComponentLoader />
					</div>
				</div>
				<div className="w-full flex justify-end items-center gap-2">
					<DropdownMenuItem asChild className="cursor-pointer">
						<Button variant={"outline"}>Cancel</Button>
					</DropdownMenuItem>
					<Button
						className="bg-[#017DC3] text-white w-20 m-0 p-0 hover:bg-[#017DC3]/80"
						onClick={handleOk}
						type="button">
						OK
					</Button>
				</div>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default FilteringDropdown;
