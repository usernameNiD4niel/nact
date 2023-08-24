import SearchWithFilter from "@/components/reuseable/SearchWithFilter";
import { ButtonList } from "@/constants/enums";
import { SupplierManagementProps } from "@/constants/props";
import { useSelectedStore } from "@/utils/HomePageState";
import { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import Tabs from "@/components/reuseable/Tabs";
import AddButton from "@/components/reuseable/AddButton";

const SupplierManagement = () => {
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
		<section className="w-full flex flex-col items-center justify-center px-5 py-6 gap-y-4">
			<Tabs
				activeTabIndex={0}
				arrayOfText={["List", "Analytics"]}
				key="Tabs Supplier Management key"
			/>
			<SearchWithFilter />
			<AddButton textButton="SUPPLIER" redirectUrl="/supplier/add" />
			<CardSupplierManagement />
			<Outlet />
		</section>
	);
};

const CardSupplierManagement = () => {
	return (
		<div className="flex py-2 items-center flex-col w-full gap-y-2">
			{SupplierManagementProps.map((value, index) => (
				<div
					className="flex p-4 md:justify-between w-full md:items-center flex-col md:flex-row border-b-[1px] border-black border-opacity-20 hover:cursor-pointer hover:border-b-2 hover:border-primary"
					key={index}>
					<Link to="#" className="flex gap-y-1 flex-col justify-center">
						<h3 className="font-bold text-sm text-primary">{value.title}</h3>
						<p className="text-xs font-thin">{value.subtitle}</p>
					</Link>
					<p className="font-thin text-xs">{value.phoneNumber}</p>
				</div>
			))}
		</div>
	);
};

export default SupplierManagement;
