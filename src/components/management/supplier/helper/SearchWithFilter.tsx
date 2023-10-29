import { FC, useEffect, useState } from "react";
import { CheckboxShape, SupplierTableProps } from "@/constants/props";
import { Input } from "@/components/ui/input";
import FilteringDialog from "./FilteringDialog";
import FilteringDropdown from "./FilteringDropdown";
import Badge from "@/components/reuseable/Badge";
import FilteringSheet from "./FilteringSheet";

type SearchWithFilterProps = {
	placeHolder: string;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	value: string;
	data: SupplierTableProps[];
	setData: React.Dispatch<React.SetStateAction<SupplierTableProps[]>>;
	setIsFiltering: React.Dispatch<React.SetStateAction<boolean>>;
};

type TemporarySupplierType = {
	/**
	 * "id": 47,
            "businessName": "Banana Republic",
            "city": "New York City",
            "state": "New York",
            "country": "USA",
            "companyPhoneNumber": "09154814993"
	 */
	id: string;
	businessName: string;
	state: string;
	country: string;
	companyPhoneNumber: string;
};

const getUniqueFilterData = async () => {
	const response = await fetch(`${import.meta.env.VITE_BASE_URL}/supplier`, {
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (response.ok) {
		const data = await response.json();
		const suppliers: TemporarySupplierType[] = data.suppliers;

		return suppliers;
	}

	throw new Error("Cannot get all the supplier");
};

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
	const [uniqueFilter, seUniqueFilter] = useState<TemporarySupplierType[]>([]);

	const getSupplier = () => {
		const checkboxArray: CheckboxShape[] = [];
		uniqueFilter.forEach((supplier) => {
			const object: CheckboxShape = {
				id: supplier.id! + "supplier",
				label: supplier.businessName,
				column: "business_name",
			};
			checkboxArray.push(object);
		});

		return checkboxArray;
	};

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
		} else if (check.length === 0 && data.length <= 1) {
			getInitialData(setData);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [check]);

	const fetchUniqueFilter = async () => {
		const actualDataFilter = await getUniqueFilterData();
		seUniqueFilter(actualDataFilter);
	};

	useEffect(() => {
		fetchUniqueFilter();
	}, []);

	const getLocation = () => {
		const uniqueLocations = new Set<string>(); // Create a Set to store unique locations

		// uniqueFilter.forEach((location) => {
		// 	uniqueLocations.add(location.location); // Add each location to the Set
		// });
		uniqueFilter.forEach((location) => {
			uniqueLocations.add(`${location.state}, ${location.country}`);
		});

		// Convert the Set back to an array of objects
		const checkboxArray: CheckboxShape[] = Array.from(uniqueLocations).map(
			(uniqueLocation, index) => ({
				id: `${index}location`,
				label: uniqueLocation,
				column: "location",
			}),
		);
		return checkboxArray;
	};

	const getContact = () => {
		const uniqueContacts = new Set<string>(); // Create a Set to store unique locations

		uniqueFilter.forEach((contact) => {
			uniqueContacts.add(contact.companyPhoneNumber); // Add each contact to the Set
		});

		// Convert the Set back to an array of objects
		const checkboxArray: CheckboxShape[] = Array.from(uniqueContacts).map(
			(uniqueContact, index) => ({
				id: `${index}contact`,
				label: uniqueContact,
				column: "phone_number",
			}),
		);
		return checkboxArray;
	};

	const handleOnSubmit = (event: React.FormEvent) => {
		event.preventDefault();
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
				<FilteringDialog data={data} />
			</form>
			<div className="w-full gap-6 justify-end hidden md:flex z-0">
				<FilteringDropdown
					items={getSupplier()}
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
				suppliers={getSupplier()}
				locations={getLocation()}
				contacts={getContact()}
				check={check}
				setCheck={setCheck}
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
