import NavigationTab from "@/components/reuseable/NavigationTab";
import { ButtonList } from "@/constants/enums";
import { useSelectedStore } from "@/utils/HomePageState";
import Cookies from "js-cookie";
const InventoryOfficerManagement = () => {
	const [setSelected] = useSelectedStore((state) => [state.setSelected]);

	const access_module = Cookies.get("access_module");

	// const router = useNavigate();
	// const role = Cookies.get("role");

	// useEffect(() => {
	// 	if (!(role === "admin" || role === "inventory")) {
	// 		router("/");
	// 	}

	// 	if (selected !== ButtonList.InventoryOfficer) {
	// 		setSelected(ButtonList.InventoryOfficer);
	// 	}
	// }, []);
	return (
		<div>
			<NavigationTab
				access_module={access_module}
				selected={ButtonList.InventoryOfficer}
				setSelected={setSelected}
				tabName="Inventory Officer"
				key={"NavigationTabInventoryOfficerManagementKey"}
			/>{" "}
			InventoryOfficerManagement
		</div>
	);
};

export default InventoryOfficerManagement;
