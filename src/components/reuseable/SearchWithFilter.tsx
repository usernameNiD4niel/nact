import { FC, useState } from "react";
import Filter from "./Filter";
import { InventoryTableData, SupplierTableData } from "@/constants/objects";

type SearchWithFilterProps = {
	placeHolder: string;
	isList: boolean;
};

const SearchWithFilter: FC<SearchWithFilterProps> = ({
	placeHolder,
	isList,
}) => {
	const [isShowingFilter, setIsShowingFilter] = useState<boolean>(false);

	const handleOnSubmit = (event: React.FormEvent) => {
		event.preventDefault();
	};

	return (
		<>
			<form
				className="w-full flex items-center justify-center relative"
				onSubmit={handleOnSubmit}>
				<input
					type="text"
					placeholder={placeHolder}
					className="border-[1px] rounded-lg border-black border-opacity-10 w-full p-3 focus:outline-primary focus:outline-1"
				/>
			</form>

			{isShowingFilter && (
				<>
					{isList ? (
						<Filter
							setIsShowingFilter={setIsShowingFilter}
							data={SupplierTableData}
						/>
					) : (
						<Filter
							setIsShowingFilter={setIsShowingFilter}
							data={InventoryTableData}
						/>
					)}
				</>
			)}
		</>
	);
};

export default SearchWithFilter;
