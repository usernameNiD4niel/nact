import { FC } from "react";
import { Payment } from "@/constants/props";
import { Input } from "@/components/ui/input";
import FilteringDialog from "./FilteringDialog";
import FilteringDropdown from "./FilteringDropdown";

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
	const handleOnSubmit = (event: React.FormEvent) => {
		event.preventDefault();
	};

	const getSupplier = () => {
		const suppliers = data.map((supplier) => supplier.supplier);
		return suppliers;
	};

	const getLocation = () => {
		const locations = data.map((location) => location.location);
		return locations;
	};
	const getContact = () => {
		const contacts = data.map((contact) => contact.contact);
		return contacts;
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
			<div className="w-full flex gap-6 justify-end">
				<FilteringDropdown items={getSupplier()} label="Supplier" />
				<FilteringDropdown items={getLocation()} label="Location" />
				<FilteringDropdown items={getContact()} label="Contact" />
			</div>
		</>
	);
};

export default SearchWithFilter;
