import SearchWithFilter from "@/components/reuseable/SearchWithFilter";
import Table from "@/components/reuseable/Table";
import { useInventoryState } from "@/utils/InventoryState";
import { useEffect } from "react";
import { IoMdAdd } from "react-icons/io";
import { Link } from "react-router-dom";
import { useState } from "react";
import Filter from "@/components/reuseable/Filter";

const List = () => {
	const [setTab] = useInventoryState((state) => [state.setActiveTab]);
	const [isShowingFilter, setIsShowingFilter] = useState<boolean>(false);

	useEffect(() => setTab(0), []);

	const handleMappingButton = (event: React.MouseEvent) => {
		const target = event.target as HTMLElement;

		if (target.id === "filter-btn") {
			setIsShowingFilter(true);
		}
	};
	return (
		<div className="w-full">
			<div
				className="md:px-10 w-full space-y-5 px-5 py-6"
				onClick={handleMappingButton}>
				<SearchWithFilter
					placeHolder="Search Supplier"
					setIsShowingFilter={setIsShowingFilter}
				/>
				<Table />
			</div>
			<AddButton />
			{isShowingFilter && (
				<Filter setIsFilterShowing={setIsShowingFilter} isInventory={false} />
			)}
		</div>
	);
};

const AddButton = () => {
	return (
		<Link
			to="/supplier/add"
			className="absolute right-2 bottom-4 md:right-10 hover:opacity-90 flex rounded-full items-center justify-center gap-x-2 w-14 h-14 bg-primary md:w-32 text-white text-2xl">
			<IoMdAdd />
			<span className="hidden md:block text-sm">SUPPLIER</span>
		</Link>
	);
};

export default List;
