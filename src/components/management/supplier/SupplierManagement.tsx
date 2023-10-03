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
	// w-[30%] lg:w-[20%]
	return (
		<section className="w-full flex flex-col items-center justify-center gap-y-4">
			<div className="w-full md:w-[70%] lg:w-[80%] z-[5] bg-[#1F2123] px-5 mb-0 pt-6 border-t-[#1F2123] border-t-2 fixed top-14 md:top-0">
				<Tabs
					activeTabIndex={tab}
					arrayOfText={["List", "Analytics"]}
					arrayOfRoutes={["/supplier/", "/supplier/analytics"]}
				/>
			</div>
			<Outlet />
		</section>
	);
};

export default SupplierManagement;
