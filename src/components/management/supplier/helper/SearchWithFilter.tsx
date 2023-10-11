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
};

const SearchWithFilter: FC<SearchWithFilterProps> = ({
	placeHolder,
	onChange,
	value,
	setData,
}) => {
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
			<div className="w-full flex gap-6 justify-end">
				<FilteringDropdown
					items={["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"]}
					label="Supplier"
				/>
				<FilteringDropdown
					items={[
						"Location 1",
						"Location 2",
						"Location 3",
						"Location 4",
						"Location 5",
					]}
					label="Location"
				/>
				<FilteringDropdown
					items={[
						"Contact 1",
						"Contact 2",
						"Contact 3",
						"Contact 4",
						"Contact 5",
					]}
					label="Contact"
				/>
			</div>
		</>
	);
};

export default SearchWithFilter;
