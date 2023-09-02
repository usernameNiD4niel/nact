import { useState } from "react";
import { HiOutlineMagnifyingGlass, HiOutlineXMark } from "react-icons/hi2";

const Search = ({ isDrawerOpen }: { isDrawerOpen: boolean }) => {
	const [search, setSearch] = useState<string>("");
	return (
		<form className="text-lg md:flex items-center w-full px-5 md:px-3 hidden">
			<span className="text-2xl md:text-black absolute opacity-50 left-6">
				<HiOutlineMagnifyingGlass />
			</span>
			<input
				type="text"
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				placeholder="Search..."
				className={`input w-full lg:w-[80%] text-sm focus:outline-primary border-black border-opacity-40 transition-all duration-150 ease-in-out focus:outline-1 focus:border-0 px-10 text-black`}
			/>
			<div className={`relative ${isDrawerOpen ? "-z-10" : "z-0"}`}>
				{search && (
					<button
						type="reset"
						onClick={() => setSearch("")}
						className="text-sm absolute -top-2 right-2">
						<HiOutlineXMark />
					</button>
				)}
			</div>
		</form>
	);
};

export default Search;
