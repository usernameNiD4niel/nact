import { FC, useState } from "react";
import { CheckboxShape, Payment } from "@/constants/props";
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
	setData: React.Dispatch<React.SetStateAction<Payment[]>>;
	data: Payment[];
};

const SearchWithFilter: FC<SearchWithFilterProps> = ({
	placeHolder,
	onChange,
	value,
	setData,
	data,
}) => {
	const [check, setCheck] = useState<CheckboxShape[]>([]);

	const getSupplier = () => {
		const checkboxArray: CheckboxShape[] = [];
		data.forEach((supplier) => {
			const object: CheckboxShape = {
				id: supplier.id! + "supplier",
				label: supplier.supplier,
			};
			checkboxArray.push(object);
		});

		return checkboxArray;
	};

	const getLocation = () => {
		const checkboxArray: CheckboxShape[] = [];
		data.forEach((location) => {
			const object: CheckboxShape = {
				id: location.id! + "location",
				label: location.location,
			};
			checkboxArray.push(object);
		});
		return checkboxArray;
	};

	const getContact = () => {
		const checkboxArray: CheckboxShape[] = [];
		data.forEach((contact) => {
			const object: CheckboxShape = {
				id: contact.id! + "contact",
				// id: crypto.randomUUID(),
				label: contact.contact,
			};
			checkboxArray.push(object);
		});
		return checkboxArray;
	};

	// const [suppliers_, setSuppliers_] = useState(getSupplier());
	//   const [locations_, setLocations_] = useState(getLocation());
	//   const [contacts_, setContacts_] = useState(getContact());

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
				<FilteringDialog setData={setData} />
			</form>
			<div className="w-full gap-6 justify-end hidden md:flex">
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
				<div className="w-full flex flex-wrap p-2 gap-2 bg-zinc-100">
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
