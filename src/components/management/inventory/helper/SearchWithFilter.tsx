import { FC, useEffect, useMemo, useState } from "react";
import { CheckboxShape, InventoryTypes, UniqueItems } from "@/constants/props";
import { Input } from "@/components/ui/input";
import Badge from "@/components/reuseable/Badge";
import { getUniqueItems } from "@/api/supplier";
import FilteringDropdown from "./FilteringDropdown";
import FilteringDialog from "../../supplier/helper/FilteringDialog";
import FilteringSheet from "./FilteringSheet";

type SearchWithFilterProps = {
	placeHolder: string;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	value: string;
	data: InventoryTypes[];
	// setData: React.Dispatch<React.SetStateAction<InventoryTypes[]>>;
	setIsFiltering: React.Dispatch<React.SetStateAction<boolean>>;
};

// const getInitialData = async (
// 	setData: React.Dispatch<React.SetStateAction<InventoryTypes[]>>,
// ) => {
// 	const response = await fetch(
// 		`${import.meta.env.VITE_BASE_URL}/api/supplier?page=1&per_page=10`,
// 		{
// 			headers: {
// 				"Content-Type": "application/json",
// 			},
// 		},
// 	);

// 	if (response.ok) {
// 		const data = await response.json();
// 		const supplier: InventoryTypes[] = (await data).suppliers;

// 		setData(supplier);
// 		return;
// 	}

// 	throw new Error("cannot get the data");
// };

const SearchWithFilter: FC<SearchWithFilterProps> = ({
	placeHolder,
	onChange,
	// setData,
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

	// const requestFiltered = async () => {
	// 	let params = "";

	// 	for (let i = 0; i < check.length; i++) {
	// 		if (check[i].column === "business_name") {
	// 			params += "business_name=" + check[i].label + "&";
	// 		} else if (check[i].column === "location") {
	// 			params += "location=" + check[i].label + "&";
	// 		} else {
	// 			params += "contact=" + check[i].label + "&";
	// 		}
	// 	}

	// 	if (params.endsWith("&")) {
	// 		params = params.substring(0, params.length - 1);
	// 	}

	// 	console.log("the params: ", params);

	// 	await fetch(`${import.meta.env.VITE_BASE_URL}/api/filter?${params}`, {
	// 		headers: {
	// 			"Content-Type": "application/json",
	// 		},
	// 	})
	// 		.then((data_) => data_.json())
	// 		.then((data_) => {
	// 			const tableData: InventoryTypes[] = data_.filtered;

	// 			setIsFiltering(true);
	// 			if (!tableData || tableData.length === 0) {
	// 				setData([]);
	// 				return;
	// 			}
	// 			setData(tableData);
	// 		})
	// 		.catch((err) => {
	// 			// setData([]);
	// 			console.log("the log");
	// 			setData([]);

	// 			console.log("Error", err);
	// 			// table.getColumn("businessName")?.setFilterValue("");
	// 		});
	// };

	// useEffect(() => {
	// 	if (check && check.length > 0) {
	// 		requestFiltered();
	// 		return;
	// 	}

	// 	if (check.length === 0) {
	// 		getInitialData(setData);
	// 		setIsFiltering(false);
	// 	}
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [check]);

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
					items={[
						{ label: "20 STD - CW", column: "productName", id: "1productName" },
						{ label: "30 STD - CW", column: "productName", id: "2productName" },
					]}
					label="Product Name"
					check={check}
					setCheck={setCheck}
					// dropdown="businessName"
					setIsFiltering={setIsFiltering}
					key={"ProductNameKeyFilterDropdown"}
				/>
				<FilteringDropdown
					items={[
						{ label: "Sample City 1", column: "city", id: "1city" },
						{ label: "Sample City 2", column: "city", id: "2city" },
					]}
					label="City"
					check={check}
					setCheck={setCheck}
					// dropdown="location"
					setIsFiltering={setIsFiltering}
					key={"CityKeyFilterDropdown"}
				/>
				<FilteringDropdown
					items={[
						{ label: "USA", column: "state", id: "1state" },
						{ label: "USA", column: "state", id: "2state" },
					]}
					check={check}
					setCheck={setCheck}
					label="State"
					// dropdown="contact"
					setIsFiltering={setIsFiltering}
					key={"StateKeyFilterDropdown"}
				/>
				<FilteringDropdown
					items={[
						{ label: "12 PCS", column: "quantity", id: "1quantity" },
						{ label: "121 PCS", column: "quantity", id: "2quantity" },
					]}
					check={check}
					setCheck={setCheck}
					label="State"
					// dropdown="contact"
					setIsFiltering={setIsFiltering}
					key={"StateKeyFilterDropdown"}
				/>
				<FilteringDropdown
					items={[
						{ label: "Sample Depot 1", column: "depot", id: "1depot" },
						{ label: "Sample Depot 2", column: "depot", id: "2depot" },
					]}
					check={check}
					setCheck={setCheck}
					label="Depot"
					// dropdown="contact"
					setIsFiltering={setIsFiltering}
					key={"DepotKeyFilterDropdown"}
				/>
				<FilteringDropdown
					items={[
						{ label: "Price 1", column: "price", id: "1price" },
						{ label: "Price 2", column: "price", id: "2price" },
					]}
					check={check}
					setCheck={setCheck}
					label="Price"
					// dropdown="contact"
					setIsFiltering={setIsFiltering}
					key={"PriceKeyFilterDropdown"}
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
