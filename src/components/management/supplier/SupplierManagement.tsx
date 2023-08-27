import { ButtonList } from "@/constants/enums";
import { useSelectedStore } from "@/utils/HomePageState";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Tabs from "@/components/reuseable/Tabs";
import { useInventoryState } from "@/utils/InventoryState";

const SupplierManagement = () => {
	const [selected, setSelected] = useSelectedStore((state) => [
		state.selected,
		state.setSelected,
	]);

	const [tab] = useInventoryState((state) => [state.tab, state.setActiveTab]);

	useEffect(() => {
		if (selected !== ButtonList.Supplier) {
			setSelected(ButtonList.Supplier);
		}
	}, []);
	return (
		<section className="w-full flex flex-col items-center justify-center gap-y-4">
			<div className="w-full bg-[#1F2123] px-5 mb-0 pt-6 border-t-[#1F2123] border-t-2">
				<Tabs
					activeTabIndex={tab}
					arrayOfText={["List", "Analytics"]}
					key="Tabs Supplier Management key"
					arrayOfRoutes={["/supplier/", "/supplier/analytics"]}
				/>
			</div>
			<Outlet />
		</section>
	);
};

export default SupplierManagement;
