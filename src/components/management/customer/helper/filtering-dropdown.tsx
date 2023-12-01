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
import { CheckboxShape } from "@/constants/props";
import { Input } from "@/components/ui/input";
import useDebounce from "@/hooks/useDebounce";
import { Button } from "@/components/ui/button";

import "../../../../../styles/styled-scrollbar.css";
import { getColumnFilter } from "@/api/customer";

type FilteringDropdownProps = {
	label: string;
	items: CheckboxShape[];
	check: CheckboxShape[];
	setCheck: React.Dispatch<React.SetStateAction<CheckboxShape[]>>;
	dropdown: "customer" | "location" | "contact";
	setIsFiltering: React.Dispatch<React.SetStateAction<boolean>>;
};

const FilteringDropdown: FC<FilteringDropdownProps> = ({
	items,
	check,
	setCheck,
	label,
	dropdown,
	setIsFiltering,
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

	useEffect(() => {
		const getData = async () => {
			setIsSearching(true);
			if (debounceSearchTerms) {
				const tempData = await getColumnFilter(dropdown, search);
				const cleanedData: CheckboxShape[] = tempData.map((item) => {
					return {
						// @ts-expect-error - This is guaranteed to have id property
						id: item.id,
						// @ts-expect-error - This is guaranteed to have this property
						column: item[`${dropdown}`],
						label: dropdown,
					} as CheckboxShape;
				});
				setData(cleanedData);
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

		console.log(":::" + items.size);

		setCheck([...items]);
	};

	const handleClearAll = () => {
		console.log(`checbox ${JSON.stringify(checkboxState, null, 2)}`);
		console.log(`items ${JSON.stringify(items, null, 2)}`);

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
