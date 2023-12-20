import NavigationTab from "@/components/reuseable/NavigationTab";
import { ButtonList } from "@/constants/enums";
import { useSelectedStore } from "@/utils/HomePageState";
import Cookies from "js-cookie";

const SalesAgentManagement = () => {
	const [setSelected] = useSelectedStore((state) => [state.setSelected]);

	const access_module = Cookies.get("access_module");

	// const router = useNavigate();
	// const role = Cookies.get("role");
	// useEffect(() => {
	// 	if (!(role === "sales-agent" || role === "admin")) {
	// 		router("/");
	// 	}
	// 	if (selected !== ButtonList.SalesAgent) {
	// 		setSelected(ButtonList.SalesAgent);
	// 	}
	// }, []);
	return (
		<div>
			{" "}
			<NavigationTab
				access_module={access_module}
				selected={ButtonList.SalesAgent}
				setSelected={setSelected}
				tabName="Sales Agent"
				key={"NavigationTabSalesAgentManagementKey"}
			/>{" "}
			SalesAgentManagement
		</div>
	);
};

export default SalesAgentManagement;
