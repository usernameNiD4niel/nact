import AddButton from "@/components/reuseable/AddButton";
import SearchWithFilter from "@/components/reuseable/SearchWithFilter";
import Tabs from "@/components/reuseable/Tabs";
import { ButtonList } from "@/constants/enums";
import { SupplierManagementData } from "@/constants/objects";
import { useSelectedStore } from "@/utils/HomePageState";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const InventoryManagement = () => {
	const [selected, setSelected] = useSelectedStore((state) => [
		state.selected,
		state.setSelected,
	]);

	useEffect(() => {
		if (selected !== ButtonList.Inventory) {
			setSelected(ButtonList.Inventory);
		}
	}, []);
	return (
		<section className="w-full flex flex-col items-center justify-center gap-y-4">
			<div className="bg-[#1F2123] w-full  px-5 pt-6">
				<Tabs
					activeTabIndex={3}
					arrayOfText={["Available", "Full List", "Abcd", "New Feature"]}
					key="TabsInventoryManagementkey"
				/>
			</div>
			<div className="md:px-10 w-full space-y-5 px-5 py-6">
				<SearchWithFilter placeHolder="Search Inventory" />
				<AddButton
					redirectUrl="/inventory/add"
					textButton="INVENTORY"
					key="Add Button Key Inventory Management"
				/>
				<DisplayInventoryData />
			</div>
			<Outlet />
		</section>
	);
};

const DisplayInventoryData = (): JSX.Element => {
	return (
		<section className="w-full flex items-center justify-center flex-col gap-y-2">
			{SupplierManagementData.map((supplier) => (
				<div
					className="w-full hover:cursor-pointer group flex items-center justify-between border-b-black border-b-2 border-opacity-20 py-4"
					key={supplier.id}>
					<div className="flex flex-col justify-center gap-y-2">
						<h3 className="font-bold text-slate-800 group-hover:text-primary text-base">
							{supplier.title}
						</h3>
						<p className="font-thin text-xs md:text-sm group-hover:text-primary">
							{supplier.subtitle}
						</p>
					</div>
					<div className="flex flex-col justify-center gap-y-2">
						<h3 className="font-bold text-slate-800 text-base group-hover:text-primary">
							{supplier.price}
						</h3>
						<p className="font-thin text-xs md:text-sm group-hover:text-primary">
							{supplier.quantity}
						</p>
					</div>
				</div>
			))}
		</section>
	);
};

export default InventoryManagement;
