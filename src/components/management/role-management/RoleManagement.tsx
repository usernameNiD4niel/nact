import Tabs from "@/components/reuseable/Tabs";
import { ButtonList } from "@/constants/enums";
import { useSelectedStore } from "@/utils/HomePageState";
import { useInventoryState } from "@/utils/InventoryState";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const RoleManagement = () => {
	const [selected, setSelected] = useSelectedStore((state) => [
		state.selected,
		state.setSelected,
	]);

	const [tab] = useInventoryState((state) => [state.tab]);

	const router = useNavigate();
	const role = Cookies.get("role");

	useEffect(() => {
		if (role !== "admin") {
			router("/");
		}
		if (selected !== ButtonList.RoleManagement) {
			setSelected(ButtonList.RoleManagement);
		}
	}, []);
	return (
		<section className="w-full flex flex-col items-center justify-center gap-y-4">
			{/* w-full md:w-[70%] lg:w-[80%] z-[5] bg-[#1F2123] px-5 mb-0 pt-6 border-t-[#1F2123] border-t-2 fixed top-14 md:top-0 */}
			<div className="w-full md:w-[70%] lg:w-[80%] z-[5] bg-[#1F2123] px-5 mb-0 pt-6 border-t-[#1F2123] border-t-2 fixed top-14 md:top-0">
				<Tabs
					activeTabIndex={tab}
					arrayOfText={["Users", "Role Access"]}
					key="TabsRoleManagementkey"
					arrayOfRoutes={["/role-management", "/role-management/role-access"]}
				/>
			</div>

			<Outlet />
		</section>
	);
};

export default RoleManagement;
