import { FC, useState } from "react";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import Filter from "./Filter";

type SearchWithFilterProps = {
	placeHolder: string;
};

const SearchWithFilter: FC<SearchWithFilterProps> = ({ placeHolder }) => {
	const [isShowingFilter, setIsShowingFilter] = useState<boolean>(false);

	const handleOnSubmit = (event: React.FormEvent) => {
		event.preventDefault();
	};

	const handleShowingFilter = () => {
		setIsShowingFilter(true);
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
					type="button"
					onClick={handleShowingFilter}
					className="border-l-[1px] text-primary text-xl border-black border-opacity-10 rounded-sm p-3 absolute right-0 top-0 bottom-0"
					id="filter-btn">
					<HiOutlineAdjustmentsHorizontal />
				</button>
			</form>
			{isShowingFilter && <Filter setIsShowingFilter={setIsShowingFilter} />}
		</>
	);
};

export default SearchWithFilter;
