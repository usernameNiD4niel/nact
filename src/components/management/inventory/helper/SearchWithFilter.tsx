import { FC, useEffect, useMemo, useState } from "react";
import {
	CheckboxShape,
	InventoryTypes,
	InventoryUniqueItems,
} from "@/constants/props";
import { Input } from "@/components/ui/input";
import Badge from "@/components/reuseable/Badge";
import FilteringDropdown from "./FilteringDropdown";
import FilteringDialog from "../../supplier/helper/FilteringDialog";
import FilteringSheet from "./FilteringSheet";
import { getUniqueItems } from "@/api/inventory";

type SearchWithFilterProps = {
	placeHolder: string;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	value: string;
	data: InventoryTypes[];
	setData: React.Dispatch<React.SetStateAction<InventoryTypes[]>>;
	setIsFiltering: React.Dispatch<React.SetStateAction<boolean>>;
};

const getInitialData = async (
	setData: React.Dispatch<React.SetStateAction<InventoryTypes[]>>,
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
		const supplier: InventoryTypes[] = (await data).suppliers;

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
	const [uniqueFilter, seUniqueFilter] = useState<InventoryUniqueItems>({
		productName: [],
		city: [],
		state: [],
		depot: [],
		price: [],
		quantity: [],
	});

	const getProductName = useMemo(() => {
		const checkboxArray: CheckboxShape[] = [];
		uniqueFilter.productName.forEach((productName, index) => {
			const object: CheckboxShape = {
				id: `${index}${productName}`,
				label: productName,
				column: "productName",
			};

			checkboxArray.push(object);
		});

		return checkboxArray;
	}, [uniqueFilter.productName]);

	const requestFiltered = async () => {
		let params = "";

		for (let i = 0; i < check.length; i++) {
			if (check[i].column === "productName") {
				params += "productName=" + check[i].label + "&";
			} else if (check[i].column === "city") {
				params += "city=" + check[i].label + "&";
			} else if (check[i].column === "state") {
				params += "state=" + check[i].label + "&";
			} else if (check[i].column === "quantity") {
				params += "quantity=" + check[i].label + "&";
			} else if (check[i].column === "depot") {
				params += "depot=" + check[i].label + "&";
			} else {
				params += "contact=" + check[i].label + "&";
			}
		}

		if (params.endsWith("&")) {
			params = params.substring(0, params.length - 1);
		}

		await fetch(
			`${import.meta.env.VITE_BASE_URL}/api/inventory/filter?${params}`,
			{
				headers: {
					"Content-Type": "application/json",
				},
			},
		)
			.then((data_) => data_.json())
			.then((data_) => {
				const tableData: InventoryTypes[] = data_.filtered;

				setIsFiltering(true);
				if (!tableData || tableData.length === 0) {
					// setData([]);
					return;
				}
				// setData(tableData);
			})
			.catch((err) => {
				// setData([]);

				console.log("Error", err);
				// table.getColumn("businessName")?.setFilterValue("");
			});
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

	const getColumnData = (column: string[], text: string) => {
		const checkboxArray: CheckboxShape[] = [];
		column.forEach((uniqueColumn, index) => {
			const object = {
				id: `${index}${text}`,
				label: uniqueColumn,
				column: text,
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
					items={getProductName}
					label="Product Name"
					check={check}
					setCheck={setCheck}
					dropdown="productName"
					setIsFiltering={setIsFiltering}
					key={"ProductNameKeyFilterDropdown"}
				/>
				<FilteringDropdown
					items={getColumnData(uniqueFilter.city, "city")}
					label="City"
					check={check}
					setCheck={setCheck}
					dropdown="city"
					setIsFiltering={setIsFiltering}
					key={"CityKeyFilterDropdown"}
				/>
				<FilteringDropdown
					items={getColumnData(uniqueFilter.state, "state")}
					check={check}
					setCheck={setCheck}
					label="State"
					dropdown="state"
					setIsFiltering={setIsFiltering}
					key={"StateKeyFilterDropdown"}
				/>
				<FilteringDropdown
					items={getColumnData(uniqueFilter.quantity, "quantity")}
					check={check}
					setCheck={setCheck}
					label="Quantity"
					dropdown="quantity"
					setIsFiltering={setIsFiltering}
					key={"QuantityKeyFilterDropdown"}
				/>
				<FilteringDropdown
					items={getColumnData(uniqueFilter.depot, "depot")}
					check={check}
					setCheck={setCheck}
					label="Depot"
					dropdown="depot"
					setIsFiltering={setIsFiltering}
					key={"DepotKeyFilterDropdown"}
				/>
				<FilteringDropdown
					items={getColumnData(uniqueFilter.price, "price")}
					check={check}
					setCheck={setCheck}
					label="Price"
					dropdown="price"
					setIsFiltering={setIsFiltering}
					key={"PriceKeyFilterDropdown"}
				/>
			</div>
			<FilteringSheet
				productName={getProductName}
				city={getColumnData(uniqueFilter.city, "city")}
				state={getColumnData(uniqueFilter.state, "state")}
				quantity={getColumnData(uniqueFilter.quantity, "quantity")}
				depot={getColumnData(uniqueFilter.depot, "depot")}
				price={getColumnData(uniqueFilter.price, "price")}
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
