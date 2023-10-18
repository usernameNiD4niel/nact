import { FC, useState } from "react";
import { CheckboxShape, SupplierTableProps } from "@/constants/props";
import { Input } from "@/components/ui/input";
import FilteringDialog from "./FilteringDialog";
import FilteringDropdown from "./FilteringDropdown";
import Badge from "@/components/reuseable/Badge";
import FilteringSheet from "./FilteringSheet";

type SearchWithFilterProps = {
	placeHolder: string;
	isList: boolean;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	value: string;
	data: SupplierTableProps[];
};

const SearchWithFilter: FC<SearchWithFilterProps> = ({
	placeHolder,
	onChange,
	value,
	data,
}) => {
	const [check, setCheck] = useState<CheckboxShape[]>([]);

	const getSupplier = () => {
		const checkboxArray: CheckboxShape[] = [];
		data.forEach((supplier) => {
			const object: CheckboxShape = {
				id: supplier.id! + "supplier",
				label: supplier.businessName,
			};
			checkboxArray.push(object);
		});

		return checkboxArray;
	};

	const getLocation = () => {
		const uniqueLocations = new Set<string>(); // Create a Set to store unique locations

		data.forEach((location) => {
			uniqueLocations.add(location.location); // Add each location to the Set
		});

		// Convert the Set back to an array of objects
		const checkboxArray: CheckboxShape[] = Array.from(uniqueLocations).map(
			(uniqueLocation, index) => ({
				id: `${index}location`,
				label: uniqueLocation,
			}),
		);
		return checkboxArray;
	};

	const getContact = () => {
		const uniqueContacts = new Set<string>(); // Create a Set to store unique locations

		data.forEach((contact) => {
			uniqueContacts.add(contact.companyPhoneNumber); // Add each contact to the Set
		});

		// Convert the Set back to an array of objects
		const checkboxArray: CheckboxShape[] = Array.from(uniqueContacts).map(
			(uniqueContact, index) => ({
				id: `${index}contact`,
				label: uniqueContact,
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
					key={"SupplierKeyFilterDropdown"}
				/>
				<FilteringDropdown
					items={getLocation()}
					label="Location"
					check={check}
					setCheck={setCheck}
					key={"LocationKeyFilterDropdown"}
				/>
				<FilteringDropdown
					items={getContact()}
					check={check}
					setCheck={setCheck}
					label="Contact"
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
