import { useSelectedStore } from "@/utils/HomePageState";
import { Outlet } from "react-router-dom";
import Tabs from "@/components/reuseable/Tabs";
import { useInventoryState } from "@/utils/InventoryState";
import Cookies from "js-cookie";
import NavigationTab from "@/components/reuseable/NavigationTab";
import { ButtonList } from "@/constants/enums";

const SupplierManagement = () => {
	const [setSelected] = useSelectedStore((state) => [state.setSelected]);

	const [tab] = useInventoryState((state) => [state.tab, state.setActiveTab]);

	const access_module = Cookies.get("access_module");

	// const router = useNavigate();

	// const role = Cookies.get("role");

	// useEffect(() => {
	// 	if (!(role === "supplier_chain" || role === "admin")) {
	// 		router("/");
	// 	}
	// 	if (selected !== ButtonList.Supplier) {
	// 		setSelected(ButtonList.Supplier);
	// 	}
	// }, []);

	return (
		<section className="w-full flex flex-col items-center justify-center gap-y-4">
			<NavigationTab
				access_module={access_module}
				selected={ButtonList.Supplier}
				setSelected={setSelected}
				tabName="Supplier Management"
				key={"NavigationTabSupplierManagementKey"}
			/>
			<div className="w-full md:w-[70%] lg:w-[80%] z-10 bg-[#1F2123] px-5 mb-0 pt-6 border-t-[#1F2123] border-t-2 fixed top-14 md:top-0">
				<Tabs
					activeTabIndex={tab}
					arrayOfText={["List", "Analytics"]}
					arrayOfRoutes={["/supplier/"]}
					key={"SupplierTab"}
				/>
			</div>
			<Outlet />
		</section>
	);
};

export default SupplierManagement;
