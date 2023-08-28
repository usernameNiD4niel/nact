import search_filter from "@/assets/search-filter.svg";
import { FC } from "react";

type SearchWithFilterProps = {
	placeHolder: string;
	setIsShowingFilter: React.Dispatch<React.SetStateAction<boolean>>;
};

const SearchWithFilter: FC<SearchWithFilterProps> = ({
	placeHolder,
	setIsShowingFilter,
}) => {
	const handleOnSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		setIsShowingFilter((prev) => !prev);
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
				<button
					type="submit"
					className="border-l-[1px] border-black border-opacity-10 rounded-sm p-3 absolute right-0 top-0 bottom-0"
					id="filter-btn">
					<img src={search_filter} alt="Search filter icon" />
				</button>
			</form>
			{/* {isShowingFilter && (
				<Filter
					setIsFilterShowing={setIsShowingFilter}
					isInventory={isInventory}
				/>
			)} */}
		</>
	);
};

export default SearchWithFilter;
