import { FC } from "react";
import { Payment } from "@/constants/props";
import { Input } from "@/components/ui/input";
import FilteringDialog from "./FilteringDialog";

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
					// className="border-[1px] rounded-lg border-black border-opacity-10 w-full p-3 focus:outline-primary focus:outline-1"
				/>
				{/* <FilterUI handleFilter={handleFilter} /> */}
				<FilteringDialog setData={setData} />
				{/* <FilteringModal /> */}
				{/* <FilterModal
          contact={contact}
          location={location}
          setContact={setContact}
          setLocation={setLocation}
          handleFilter={handleFilter}
          setSupplier={setSupplier}
          supplier={supplier}
        /> */}
			</form>
		</>
	);
};

export default SearchWithFilter;
