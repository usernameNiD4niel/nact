import search_filter from "@/assets/search-filter.svg";
const SearchWithFilter = () => {
	return (
		<form className="w-full flex items-center justify-center">
			<input
				type="text"
				placeholder="Search Supplier"
				className="border-[1px] rounded-sm border-black border-opacity-30 w-full p-[10px] focus:outline-primary focus:outline-1"
			/>
			<button
				type="submit"
				className="border-[1px] border-black rounded-sm border-opacity-30 p-2">
				<img src={search_filter} alt="Search filter icon" />
			</button>
		</form>
	);
};

export default SearchWithFilter;
