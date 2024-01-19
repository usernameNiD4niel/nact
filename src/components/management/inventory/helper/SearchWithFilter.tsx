import { FC, useEffect, useMemo, useState } from "react";
import {
	CheckboxShape,
	InventoryData,
	InventoryUniqueItems,
} from "@/constants/props";
import { Input } from "@/components/ui/input";
import Badge from "@/components/reuseable/Badge";
import FilteringDropdown from "./FilteringDropdown";
import FilteringDialog from "../../supplier/helper/FilteringDialog";
import FilteringSheet from "./FilteringSheet";
import {
	getPaginatedData,
	getPaginatedExpired,
	getSearch,
	getSearchExpired,
	getUniqueItems,
} from "@/api/inventory";
import useDebounce from "@/hooks/useDebounce";

type SearchWithFilterProps = {
	placeHolder: string;
	duplicate: InventoryData[];
	data: InventoryData[];
	setData: React.Dispatch<React.SetStateAction<InventoryData[]>>;
	setIsFiltering: React.Dispatch<React.SetStateAction<boolean>>;
	isAvailable: boolean;
};

const SearchWithFilter: FC<SearchWithFilterProps> = ({
	placeHolder,
	duplicate,
	setData,
	data,
	setIsFiltering,
	isAvailable,
}) => {
	const [check, setCheck] = useState<CheckboxShape[]>([]);
	const [uniqueFilter, seUniqueFilter] = useState<InventoryUniqueItems>({
		containerType: [],
		city: [],
		state: [],
		depot: [],
		buyingRate: [],
		quantity: [],
		supplier: [],
	});

	const [search, setSearch] = useState("");
	const searchDebounce = useDebounce(search, 200);

	const getContainerType = useMemo(() => {
		const checkboxArray: CheckboxShape[] = [];
		uniqueFilter.containerType.forEach((containerType, index) => {
			const object: CheckboxShape = {
				id: `${index}${containerType}`,
				label: containerType,
				column: "containerType",
			};

			checkboxArray.push(object);
		});

		return checkboxArray;
	}, [uniqueFilter.containerType]);

	// ? Create a filtering
	const requestFiltered = async () => {
		let params = "";

		for (let i = 0; i < check.length; i++) {
			if (check[i].column === "containerType") {
				params += "container_type=" + check[i].label + "&";
			} else if (check[i].column === "city") {
				params += "city=" + check[i].label + "&";
			} else if (check[i].column === "state") {
				params += "state=" + check[i].label + "&";
			} else if (check[i].column === "quantity") {
				params += "quantity=" + check[i].label + "&";
			} else if (check[i].column === "depot") {
				params += "depot=" + check[i].label + "&";
			} else if (check[i].column === "supplier") {
				params += "supplier=" + check[i].label + "&";
			} else {
				params += "buying_rate=" + check[i].label + "&";
			}
		}

		if (params.endsWith("&")) {
			params = "?" + params.substring(0, params.length - 1);
		}

		let url = "";

		if (isAvailable) {
			url = `inventory/filter${params}`;
		} else {
			url = `expire/inventory/filter${params}`;
		}

		await fetch(`${import.meta.env.VITE_BASE_URL}/api/${url}`, {
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((data_) => data_.json())
			.then((data_) => {
				const tableData: InventoryData[] = data_.filtered_inventory;

				setIsFiltering(true);
				if (!tableData || tableData.length === 0) {
					setData([]);
					return;
				}
				if (isAvailable) {
					localStorage.setItem("table_data", JSON.stringify(tableData));
					localStorage.setItem("filterData", JSON.stringify(check));
					setData(tableData);
				} else {
					localStorage.setItem("expire_table_data", JSON.stringify(tableData));
					localStorage.setItem("expireFilterData", JSON.stringify(check));
					setData(tableData);
				}
			})
			.catch((err) => {
				setData([]);

				console.log("Error", err);
			});
	};

	async function handleFetchDefault() {
		if (isAvailable) {
			const data_ = await getPaginatedData();
			setData(data_.products);
		} else {
			const data_ = await getPaginatedExpired(1);
			setData(data_.expired_inventory_items);
		}
	}
	useEffect(() => {
		setIsFiltering(false);

		if (check && check.length > 0) {
			requestFiltered();
			return;
		}

		if (duplicate.length > 0) {
			setData(duplicate);
			if (isAvailable) {
				localStorage.removeItem("filterData");
			} else {
				localStorage.removeItem("expireFilterData");
			}
			return;
		}

		handleFetchDefault();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [check]);

	// useEffect(() => {

	// 	const filterData = localStorage.getItem("filterData");
	// 	const table_data = localStorage.getItem("table_data");

	// 	if (check.length === 0 && filterData && table_data) {
	// 		const tableData = JSON.parse(
	// 			JSON.stringify(table_data),
	// 		) as InventoryData[];

	// 		setData(tableData);
	// 		setIsFiltering(true);
	// 	}
	// }, []);

	const fetchUniqueFilter = async () => {
		const actualDataFilter = await getUniqueItems();
		seUniqueFilter(actualDataFilter);
		let filterData: string | null = "";

		if (isAvailable) {
			filterData = localStorage.getItem("filterData");
		} else {
			filterData = localStorage.getItem("expireFilterData");
		}

		if (filterData) {
			setCheck(JSON.parse(filterData));
		}
	};

	useEffect(() => {
		fetchUniqueFilter();
	}, []);

	async function fetchSearch() {
		if (isAvailable) {
			const searchQuery: InventoryData[] = await getSearch(search);
			setData(searchQuery);
		} else {
			const searchQuery: InventoryData[] = await getSearchExpired(search);
			setData(searchQuery);
		}
	}

	useEffect(() => {
		if (searchDebounce) {
			fetchSearch();
		} else {
			setData(duplicate);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchDebounce]);

	// ? Getting specific column value and add it to the array.
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

	function handleChangeInput(event: React.ChangeEvent<HTMLInputElement>) {
		setSearch(event.target.value);
	}

	return (
		<>
			<div className="w-full flex items-center rounded-md justify-center relative border-[1px] border-black border-opacity-20">
				<Input
					type="text"
					placeholder={placeHolder}
					className="py-6 rounded-md outline-none border-0 pr-16"
					value={search}
					onChange={handleChangeInput}
				/>
				<FilteringDialog data={data} />
			</div>
			<div className="w-full gap-6 justify-end hidden md:flex z-0">
				<FilteringDropdown
					items={getContainerType}
					label="Product Name"
					check={check}
					setCheck={setCheck}
					dropdown="containerType"
					setIsFiltering={setIsFiltering}
					isAvailable={isAvailable}
					key={"containerTypeKeyFilterDropdown"}
				/>
				<FilteringDropdown
					items={getColumnData(uniqueFilter.city, "city")}
					label="City"
					check={check}
					setCheck={setCheck}
					dropdown="city"
					setIsFiltering={setIsFiltering}
					key={"CityKeyFilterDropdown"}
					isAvailable={isAvailable}
				/>
				<FilteringDropdown
					items={getColumnData(uniqueFilter.state, "state")}
					check={check}
					setCheck={setCheck}
					label="State"
					dropdown="state"
					isAvailable={isAvailable}
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
					isAvailable={isAvailable}
					key={"QuantityKeyFilterDropdown"}
				/>
				<FilteringDropdown
					items={getColumnData(uniqueFilter.depot, "depot")}
					check={check}
					setCheck={setCheck}
					label="Depot"
					dropdown="depot"
					setIsFiltering={setIsFiltering}
					isAvailable={isAvailable}
					key={"DepotKeyFilterDropdown"}
				/>
				<FilteringDropdown
					items={getColumnData(uniqueFilter.buyingRate, "buyingRate")}
					check={check}
					setCheck={setCheck}
					label="Price"
					dropdown="buyingRate"
					setIsFiltering={setIsFiltering}
					isAvailable={isAvailable}
					key={"BuyingRateKeyFilterDropdown"}
				/>
				<FilteringDropdown
					items={getColumnData(uniqueFilter.supplier, "supplier")}
					check={check}
					setCheck={setCheck}
					label="Supplier"
					dropdown="supplier"
					isAvailable={isAvailable}
					setIsFiltering={setIsFiltering}
					key={"SupplierKeyFilterDropdown"}
				/>
			</div>
			<FilteringSheet
				containerType={getContainerType}
				city={getColumnData(uniqueFilter.city, "city")}
				state={getColumnData(uniqueFilter.state, "state")}
				quantity={getColumnData(uniqueFilter.quantity, "quantity")}
				depot={getColumnData(uniqueFilter.depot, "depot")}
				buyingRate={getColumnData(uniqueFilter.buyingRate, "buyingRate")}
				supplier={getColumnData(uniqueFilter.supplier, "supplier")}
				check={check}
				setCheck={setCheck}
				isAvailable={isAvailable}
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
