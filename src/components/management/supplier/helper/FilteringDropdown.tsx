import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BsChevronDown } from "react-icons/bs";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { FC, useEffect, useState } from "react";
import { CheckboxShape } from "@/constants/props";
import { Input } from "@/components/ui/input";
import useDebounce from "@/hooks/useDebounce";
import {
	getBusinessNameFilter,
	getContactFilter,
	getLocationFilter,
} from "@/api/supplier";

type FilteringDropdownProps = {
	label: string;
	items: CheckboxShape[];
	check: CheckboxShape[];
	setCheck: React.Dispatch<React.SetStateAction<CheckboxShape[]>>;
	dropdown: "businessName" | "location" | "contact";
};

const FilteringDropdown: FC<FilteringDropdownProps> = ({
	items,
	check,
	setCheck,
	label,
	dropdown,
}) => {
	const handleCheckbox = (
		checked: boolean | "indeterminate",
		item: CheckboxShape,
	) => {
		if (search) {
			setSearch("");
		}
		if (checked) {
			setCheck((prevChecked) => [...prevChecked, item]);
		} else {
			const filteredChecked = check.filter((i) => i.id !== item.id);
			setCheck(filteredChecked);
		}

		return checked;
	};

	const [search, setSearch] = useState("");
	const debounceSearchTerms = useDebounce<string>(search, 300);
	const [data, setData] = useState<CheckboxShape[]>([]);
	const [isSearching, setIsSearching] = useState(false);

	const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
		setIsSearching(true);
	};

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

	useEffect(() => setData(items), [items]);

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

		return data.map((item, index) => (
			<Label
				className="flex gap-2 items-center text-xs"
				key={item.id + index * Math.random()}>
				<Checkbox
					checked={check.find((i) => i.id === item.id)?.id === item.id}
					onCheckedChange={(checked) => handleCheckbox(checked, item)}
					className="border-gray-400"
				/>
				<span>{item.label}</span>
			</Label>
		));
	};

	return (
		<DropdownMenu modal={false}>
			<DropdownMenuTrigger asChild>
				<button className="flex items-center justify-center gap-2 text-xs py-3">
					{label} <BsChevronDown />
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="px-4 py-5 flex flex-col gap-4 justify-center z-0">
				<Input
					placeholder="Search"
					className="w-full"
					value={search}
					onChange={handleOnChange}
				/>
				<ComponentLoader />
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default FilteringDropdown;
