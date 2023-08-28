import Filter from "@/components/reuseable/Filter";
import SearchWithFilter from "@/components/reuseable/SearchWithFilter";
import TableSixCol from "@/components/reuseable/TableSixCol";
import { useInventoryState } from "@/utils/InventoryState";
import { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { Link } from "react-router-dom";

const Available = (): JSX.Element => {
	const [setActiveTab] = useInventoryState((state) => [state.setActiveTab]);

	const [isShowingFilter, setIsShowingFilter] = useState<boolean>(false);

	useEffect(() => setActiveTab(0), []);
	return (
		<>
			<div className="md:px-10 w-full space-y-5 px-5 py-6">
				<SearchWithFilter
					placeHolder="Search Inventory"
					setIsShowingFilter={setIsShowingFilter}
				/>
				<AddButton />
				<DisplayInventoryData />
			</div>
			{isShowingFilter && (
				<Filter setIsFilterShowing={setIsShowingFilter} isInventory={true} />
			)}
		</>
	);
};

const DisplayInventoryData = (): JSX.Element => {
	return (
		<section className="w-full flex items-center justify-center flex-col gap-y-2">
			<TableSixCol />
		</section>
	);
};

const AddButton = () => {
	return (
		<Link
			to="/inventory/add"
			className="absolute right-2 bottom-4 md:right-10 hover:opacity-90 flex rounded-full items-center justify-center gap-x-2 w-14 h-14 bg-primary md:w-32 text-white text-2xl">
			<IoMdAdd />
			<span className="hidden md:block text-sm">INVENTORY</span>
		</Link>
	);
};

export default Available;
