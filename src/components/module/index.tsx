import { ButtonList } from "@/constants/enums";
import { useSelectedStore } from "@/utils/HomePageState";
import { useInventoryState } from "@/utils/InventoryState";
import { useEffect } from "react";
import Tabs from "../reuseable/Tabs";
import { Outlet } from "react-router-dom";

const Module = () => {
	const [selected, setSelected] = useSelectedStore((state) => [
		state.selected,
		state.setSelected,
	]);

	useEffect(() => {
		if (selected !== ButtonList.Module) {
			setSelected(ButtonList.Module);
		}
	}, []);

	const [tab] = useInventoryState((state) => [state.tab, state.setActiveTab]);

	return (
		<section className="w-full flex flex-col items-center justify-center gap-y-4">
			<div className="w-full md:w-[70%] lg:w-[80%] z-10 bg-[#1F2123] px-5 mb-0 pt-6 border-t-[#1F2123] border-t-2 fixed top-14 md:top-0">
				<Tabs
					activeTabIndex={tab}
					arrayOfText={[
						"Assign Role",
						"Supply Chain",
						"Sales Agent",
						"Billing and Collection",
					]}
					arrayOfRoutes={["/module"]}
					key={"ModuleTab"}
				/>
			</div>
			<Outlet />
		</section>
	);
};

export default Module;
