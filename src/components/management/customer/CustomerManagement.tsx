import NavigationTab from "@/components/reuseable/NavigationTab";
import Tabs from "@/components/reuseable/Tabs";
import { ButtonList } from "@/constants/enums";
import { useSelectedStore } from "@/utils/HomePageState";
import { useInventoryState } from "@/utils/InventoryState";
import Cookies from "js-cookie";
import { Outlet } from "react-router-dom";

const CustumerManagement = () => {
	const [setSelected] = useSelectedStore((state) => [state.setSelected]);

	const [tab] = useInventoryState((state) => [state.tab, state.setActiveTab]);

	const access_module = Cookies.get("access_module");

	// const router = useNavigate();

	// useEffect(() => {
	// 	const accessModule = JSON.parse(access_module!) as string[];

	// 	const access = accessModule.find((item) => item === "customer");

	// 	if (!access) {
	// 		router(-1);
	// 	}

	// 	if (selected !== ButtonList.Customer) {
	// 		setSelected(ButtonList.Customer);
	// 	}
	// }, []);

	return (
		<section className="w-full flex flex-col items-center justify-center gap-y-4">
			<NavigationTab
				access_module={access_module}
				selected={ButtonList.Customer}
				setSelected={setSelected}
				tabName="Customer"
				key={"NavigationTabCustomerKey"}
			/>
			<div className="w-full md:w-[70%] lg:w-[80%] z-10 bg-[#1F2123] px-5 mb-0 pt-6 border-t-[#1F2123] border-t-2 fixed top-14 md:top-0">
				<Tabs
					activeTabIndex={tab}
					arrayOfText={["List", "Analytics"]}
					arrayOfRoutes={["/customer/", "/customer/analytics"]}
					key={"CustomerTab"}
				/>
			</div>
			<Outlet />
		</section>
	);
};

export default CustumerManagement;
