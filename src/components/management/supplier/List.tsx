import SearchWithFilter from "@/components/reuseable/SearchWithFilter";
import Table from "@/components/reuseable/Table";
import { useInventoryState } from "@/utils/InventoryState";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { HiOutlinePlus } from "react-icons/hi2";

const List = () => {
	const [setTab] = useInventoryState((state) => [state.setActiveTab]);

	useEffect(() => setTab(0), []);

	return (
		<div className="w-full">
			<div className="md:px-10 w-full space-y-5 px-5 py-6">
				<SearchWithFilter placeHolder="Search Supplier" />
				<Table />
			</div>
			<AddButton />
		</div>
	);
};

const AddButton = () => {
	return (
		<Link
			to="/supplier/add"
			className="absolute right-2 bottom-4 md:right-10 hover:opacity-90 flex rounded-full items-center justify-center gap-x-2 w-14 h-14 bg-primary md:w-32 text-white text-2xl">
			<HiOutlinePlus />
			<span className="hidden md:block text-sm">SUPPLIER</span>
		</Link>
	);
};

export default List;
