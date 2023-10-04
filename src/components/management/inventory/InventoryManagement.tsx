import Tabs from "@/components/reuseable/Tabs";
import { ButtonList } from "@/constants/enums";
import { useSelectedStore } from "@/utils/HomePageState";
import { useInventoryState } from "@/utils/InventoryState";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const InventoryManagement = () => {
	const [selected, setSelected] = useSelectedStore((state) => [
		state.selected,
		state.setSelected,
	]);

	const [tab] = useInventoryState((state) => [state.tab]);

	useEffect(() => {
		if (selected !== ButtonList.Inventory) {
			setSelected(ButtonList.Inventory);
		}
	}, []);
	return (
		<section className="w-full flex flex-col items-center justify-center gap-y-4">
			{/* w-full md:w-[70%] lg:w-[80%] z-[5] bg-[#1F2123] px-5 mb-0 pt-6 border-t-[#1F2123] border-t-2 fixed top-14 md:top-0 */}
			<div className="w-full md:w-[70%] lg:w-[80%] z-[5] bg-[#1F2123] px-5 mb-0 pt-6 border-t-[#1F2123] border-t-2 fixed top-14 md:top-0">
				<Tabs
					activeTabIndex={tab}
					arrayOfText={["Available", "Full List", "Abcd", "New Feature"]}
					key="TabsInventoryManagementkey"
					arrayOfRoutes={[
						"/inventory/",
						"/inventory/full-list",
						"/inventory/abcd",
						"/inventory/new-feature",
					]}
				/>
			</div>

			<Outlet />
		</section>
	);
};

export default InventoryManagement;
