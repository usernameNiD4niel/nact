import { FC, useEffect, useMemo, useState } from "react";
import {
	CheckboxShape,
	SupplierTableProps,
	UniqueItems,
} from "@/constants/props";
import { Input } from "@/components/ui/input";
import FilteringDialog from "./FilteringDialog";
import FilteringDropdown from "./FilteringDropdown";
import Badge from "@/components/reuseable/Badge";
import FilteringSheet from "./FilteringSheet";
import { getUniqueItems } from "@/api/supplier";

type SearchWithFilterProps = {
	placeHolder: string;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	value: string;
	data: SupplierTableProps[];
	setData: React.Dispatch<React.SetStateAction<SupplierTableProps[]>>;
	setIsFiltering: React.Dispatch<React.SetStateAction<boolean>>;
};

// const getUniqueFilterData = async () => {
// 	const response = await fetch(
// 		`${import.meta.env.VITE_BASE_URL}/api/supplier/unique`,
// 		{
// 			headers: {
// 				"Content-Type": "application/json",
// 			},
// 		},
// 	);

// 	if (response.ok) {
// 		const data = await response.json();
// 		const suppliers: TemporarySupplierType[] = data.suppliers;

// 		return suppliers;
// 	}

// 	throw new Error("Cannot get all the supplier");
// };

const getInitialData = async (
	setData: React.Dispatch<React.SetStateAction<SupplierTableProps[]>>,
) => {
	const response = await fetch(
		`${import.meta.env.VITE_BASE_URL}/api/supplier?page=1&per_page=10`,
		{
			headers: {
				"Content-Type": "application/json",
			},
		},
	);

	if (response.ok) {
		const data = await response.json();
		const supplier: SupplierTableProps[] = (await data).suppliers;

		setData(supplier);
		return;
	}

	throw new Error("cannot get the data");
};

const SearchWithFilter: FC<SearchWithFilterProps> = ({
	placeHolder,
	onChange,
	setData,
	value,
	data,
	setIsFiltering,
}) => {
	const [check, setCheck] = useState<CheckboxShape[]>([]);
	const [uniqueFilter, seUniqueFilter] = useState<UniqueItems>({
		businessName: [],
		contact: [],
		location: [],
	});

	const getSupplier = useMemo(() => {
		const checkboxArray: CheckboxShape[] = [];
		uniqueFilter.businessName.forEach((supplier, index) => {
			const object: CheckboxShape = {
				id: `${index}${supplier}`,
				label: supplier,
				column: "business_name",
			};

			checkboxArray.push(object);
		});

		return checkboxArray;
	}, [uniqueFilter.businessName]);

	const requestFiltered = async () => {
		let params = "";

		for (let i = 0; i < check.length; i++) {
			params += `${check[i].column}=${check[i].label}&`;
		}

		if (params.endsWith("&")) {
			params = params.substring(0, params.length - 1);
		}

		const response = await fetch(
			`${import.meta.env.VITE_BASE_URL}/api/filter?${params}`,
			{
				headers: {
					"Content-Type": "application/json",
				},
			},
		);

		if (response.ok) {
			const data = await response.json();
			const tableData: SupplierTableProps[] = data.filtered;
			setData(tableData);
		} else {
			throw new Error("Error processing response");
		}
	};

	useEffect(() => {
		if (check && check.length > 0) {
			requestFiltered();
			return;
		}

		if (check.length === 0) {
			getInitialData(setData);
			setIsFiltering(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [check]);

	const fetchUniqueFilter = async () => {
		const actualDataFilter = await getUniqueItems();
		seUniqueFilter(actualDataFilter);
	};

	useEffect(() => {
		fetchUniqueFilter();
	}, []);

	const getLocation = () => {
		// Convert the Set back to an array of objects
		const checkboxArray: CheckboxShape[] = [];
		uniqueFilter.location.forEach((uniqueLocation, index) => {
			const object = {
				id: `${index}location`,
				label: uniqueLocation,
				column: "location",
			};
			checkboxArray.push(object);
		});
		return checkboxArray;
	};

	const getContact = () => {
		// Convert the Set back to an array of objects
		const checkboxArray: CheckboxShape[] = [];
		uniqueFilter.contact.forEach((uniqueContact, index) => {
			const object = {
				id: `${index}contact`,
				label: uniqueContact,
				column: "phone_number",
			};
			checkboxArray.push(object);
		});
		return checkboxArray;
	};

	const handleOnSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		// TODO: use this method => searchData(query)
	};

	return (
		<>
			<form
				className="w-full flex items-center rounded-md justify-center relative border-[1px] border-black border-opacity-20"
				onSubmit={handleOnSubmit}>
				<Input
					type="text"
					placeholder={placeHolder}
					className="py-6 rounded-md outline-none border-0 pr-16"
					value={value}
					onChange={onChange}
				/>
				<button type="submit"></button>
				<FilteringDialog data={data} />
			</form>
			<div className="w-full gap-6 justify-end hidden md:flex z-0">
				<FilteringDropdown
					items={getSupplier}
					label="Supplier"
					check={check}
					setCheck={setCheck}
					dropdown="businessName"
					setIsFiltering={setIsFiltering}
					key={"SupplierKeyFilterDropdown"}
				/>
				<FilteringDropdown
					items={getLocation()}
					label="Location"
					check={check}
					setCheck={setCheck}
					dropdown="location"
					setIsFiltering={setIsFiltering}
					key={"LocationKeyFilterDropdown"}
				/>
				<FilteringDropdown
					items={getContact()}
					check={check}
					setCheck={setCheck}
					label="Contact"
					dropdown="contact"
					setIsFiltering={setIsFiltering}
					key={"ContactKeyFilterDropdown"}
				/>
			</div>
			<FilteringSheet
				suppliers={getSupplier}
				locations={getLocation()}
				contacts={getContact()}
				check={check}
				setCheck={setCheck}
				setIsFiltering={setIsFiltering}
				key={"MobileViewFilteringDropdown"}
			/>
			{check && check.length > 0 && (
				<div className="w-full flex flex-wrap p-2 gap-2 bg-zinc-100 rounded-lg">
					{check.map((checkItem) => (
						<Badge
							key={checkItem.id}
							text={checkItem.label}
							id={checkItem.id}
							setCheck={setCheck}
						/>
					))}
				</div>
			)}
		</>
	);
};

export default SearchWithFilter;
