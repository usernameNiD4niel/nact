import SearchWithFilter from "@/components/reuseable/SearchWithFilter";
import { ButtonList } from "@/constants/enums";
import { useSelectedStore } from "@/utils/HomePageState";
import { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import Tabs from "@/components/reuseable/Tabs";
import Table from "@/components/reuseable/Table";
import { IoMdAdd } from "react-icons/io";

const SupplierManagement = () => {
	const header: string[] = [
		"Product Name",
		"State",
		"City",
		"Price",
		"Quantity",
		"Depot",
	];
	const body: string[][] = [
		[
			"Product Name body 1",
			"State body 2",
			"Price body 3",
			"City body 4",
			"Quantity body 5",
			"Depot body 6",
		],
		[
			"Product Name body 1",
			"State body 2",
			"Price body 3",
			"City body 4",
			"Quantity body 5",
			"Depot body 6",
		],
		[
			"Product Name body 1",
			"State body 2",
			"Price body 3",
			"City body 4",
			"Quantity body 5",
			"Depot body 6",
		],
		[
			"Product Name body 1",
			"State body 2",
			"Price body 3",
			"City body 4",
			"Quantity body 5",
			"Depot body 6",
		],
		[
			"Product Name body 1",
			"State body 2",
			"Price body 3",
			"City body 4",
			"Quantity body 5",
			"Depot body 6",
		],
		[
			"Product Name body 1",
			"State body 2",
			"Price body 3",
			"City body 4",
			"Quantity body 5",
			"Depot body 6",
		],
	];

	const [selected, setSelected] = useSelectedStore((state) => [
		state.selected,
		state.setSelected,
	]);

	useEffect(() => {
		if (selected !== ButtonList.Supplier) {
			setSelected(ButtonList.Supplier);
		}
	}, []);
	return (
		<section className="w-full flex flex-col items-center justify-center gap-y-4">
			<div className="w-full bg-[#1F2123] px-5 mb-0 pt-6 border-t-[#1F2123] border-t-2">
				<Tabs
					activeTabIndex={0}
					arrayOfText={["List", "Analytics"]}
					key="Tabs Supplier Management key"
				/>
			</div>
			<div className="md:px-10 w-full space-y-5 px-5 py-6">
				<SearchWithFilter placeHolder="Search Supplier" />
				<Table body={body} header={header} key="SupplierManagementKey" />
			</div>
			<AddButton />
			<Outlet />
		</section>
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

export default SupplierManagement;
