import { useState } from "react";
import { GrClose } from "react-icons/gr";
import { IoIosSearch } from "react-icons/io";

const Search = () => {
	const [search, setSearch] = useState<string>("");
	return (
		<form className="text-lg flex items-center relative w-full justify-center max-w-lg flex-1 px-5 md:px-0">
			<span className="text-2xl md:text-black absolute left-6 md:left-2 top-3 opacity-50">
				<IoIosSearch />
			</span>
			<input
				type="text"
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				placeholder="Search..."
				className={`input w-full text-sm focus:outline-none focus:border-0 px-10 text-black`}
			/>
			{search && (
				<button
					type="reset"
					onClick={() => setSearch("")}
					className="text-sm absolute right-7 md:right-2 top-4">
					<GrClose />
				</button>
			)}
		</form>
	);
};

export default Search;
