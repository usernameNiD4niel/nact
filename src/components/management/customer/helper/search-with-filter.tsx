import { Input } from "@/components/ui/input";
import FilteringDialog from "../../supplier/helper/FilteringDialog";
import { Customer } from "./column";
import {
	getFilteredData,
	getInitialData,
	getUniqueItems,
} from "@/api/customer";
import { CheckboxShape, UniqueItemsCustomer } from "@/constants/props";
import { useEffect, useMemo, useState } from "react";
import FilteringSheet from "../../supplier/helper/FilteringSheet";
import Badge from "@/components/reuseable/Badge";
import FilteringDropdown from "./filtering-dropdown";

interface SearchWithFilterProps<CustomerType> {
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	data: CustomerType[];
	setData: React.Dispatch<React.SetStateAction<CustomerType[]>>;
	value: string;
	setIsFiltering: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SearchWithFilter<CustomerType>({
	onChange,
	data,
	setData,
	setIsFiltering,
	value,
}: SearchWithFilterProps<CustomerType>) {
	const [check, setCheck] = useState<CheckboxShape[]>([]);

	const [uniqueFilter, seUniqueFilter] = useState<UniqueItemsCustomer>({
		customer: [],
		contact: [],
		location: [],
	});

	const getCustomer = useMemo(() => {
		const checkboxArray: CheckboxShape[] = [];
		uniqueFilter.customer.forEach((customer, index) => {
			const object: CheckboxShape = {
				id: `${index}${customer}`,
				label: customer,
				column: "customer",
			};

			checkboxArray.push(object);
		});

		return checkboxArray;
	}, [uniqueFilter.customer]);

	async function requestFilter() {
		let params = "";

		for (let i = 0; i < check.length; i++) {
			if (check[i].column === "customer") {
				params += "customer=" + check[i].label + "&";
			} else if (check[i].column === "location") {
				params += "location=" + check[i].label + "&";
			} else {
				params += "contact=" + check[i].label + "&";
			}
		}

		if (params.endsWith("&")) {
			params = params.substring(0, params.length - 1);
		}

		const filteredData = await getFilteredData<CustomerType>(params);

		if (filteredData && filteredData.length > 0) {
			setData(filteredData);
		} else {
			setData([] as CustomerType[]);
		}
	}

	async function getData() {
		const _data = await getInitialData<CustomerType>();
		setData(_data);
	}

	useEffect(() => {
		if (check && check.length > 0) {
			requestFilter();
			return;
		}

		if (check.length === 0) {
			getData();
			setIsFiltering(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [check]);

	const fetchUniqueFilter = async () => {
		const actualDataFilter = await getUniqueItems();
		seUniqueFilter(actualDataFilter);
	};

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

	useEffect(() => {
		fetchUniqueFilter();
	}, []);

	return (
		<>
			<form className="w-full flex items-center rounded-md justify-center relative border-[1px] border-black border-opacity-20">
				<Input
					type="text"
					placeholder="Search Customer"
					value={value}
					className="py-6 rounded-md outline-none border-0 pr-16"
					onChange={onChange}
				/>
				<button type="submit"></button>
				<FilteringDialog data={data as Customer[]} />
			</form>

			<div className="w-full gap-6 justify-end hidden md:flex z-0">
				<FilteringDropdown
					items={getCustomer}
					label="Customer"
					check={check}
					setCheck={setCheck}
					dropdown="customer"
					setIsFiltering={setIsFiltering}
					key={"CustomerKeyFilterDropdown"}
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
				suppliers={getCustomer}
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
}
