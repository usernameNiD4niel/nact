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
import { getSearch, getUniqueItems } from "@/api/inventory";
import useDebounce from "@/hooks/useDebounce";

type SearchWithFilterProps = {
	placeHolder: string;
	duplicate: InventoryData[];
	data: InventoryData[];
	setData: React.Dispatch<React.SetStateAction<InventoryData[]>>;
	setIsFiltering: React.Dispatch<React.SetStateAction<boolean>>;
};

const getInitialData = async (
	setData: React.Dispatch<React.SetStateAction<InventoryData[]>>,
) => {
	const response = await fetch(
		`${import.meta.env.VITE_BASE_URL}/api/inventory?page=1&per_page=10`,
		{
			headers: {
				"Content-Type": "application/json",
			},
		},
	);

	if (response.ok) {
		const data = await response.json();
		const inventory: InventoryData[] = (await data).products;

		setData(inventory);
		return;
	}

	throw new Error("cannot get the data");
};

const SearchWithFilter: FC<SearchWithFilterProps> = ({
	placeHolder,
	duplicate,
	setData,
	data,
	setIsFiltering,
}) => {
	const [check, setCheck] = useState<CheckboxShape[]>([]);
	const [uniqueFilter, seUniqueFilter] = useState<InventoryUniqueItems>({
		containerType: [],
		city: [],
		state: [],
		depot: [],
		buyingRate: [],
		quantity: [],
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
			} else {
				params += "buying_rate=" + check[i].label + "&";
			}
		}

		console.log(`the params ::: ${params}`);

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
				const tableData: InventoryData[] = data_.filtered_inventory;

				setIsFiltering(true);
				if (!tableData || tableData.length === 0) {
					setData([]);
					return;
				}
				setData(tableData);
			})
			.catch((err) => {
				setData([]);

				console.log("Error", err);
			});
	};

	useEffect(() => {
		if (check && check.length > 0) {
			requestFiltered();
			return;
		}

		if (check.length === 0 && (!data || data.length > 0)) {
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

	async function fetchSearch() {
		const searchQuery: InventoryData[] = await getSearch(search);
		setData(searchQuery);
	}

	useEffect(() => {
		console.log(searchDebounce, duplicate);

		if (searchDebounce) {
			console.log("if");
			fetchSearch();
		} else {
			console.log("else");
			setData(duplicate);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchDebounce]);

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
					items={getColumnData(uniqueFilter.buyingRate, "buyingRate")}
					check={check}
					setCheck={setCheck}
					label="Price"
					dropdown="buyingRate"
					setIsFiltering={setIsFiltering}
					key={"BuyingRateKeyFilterDropdown"}
				/>
			</div>
			<FilteringSheet
				containerType={getContainerType}
				city={getColumnData(uniqueFilter.city, "city")}
				state={getColumnData(uniqueFilter.state, "state")}
				quantity={getColumnData(uniqueFilter.quantity, "quantity")}
				depot={getColumnData(uniqueFilter.depot, "depot")}
				buyingRate={getColumnData(uniqueFilter.buyingRate, "buyingRate")}
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
