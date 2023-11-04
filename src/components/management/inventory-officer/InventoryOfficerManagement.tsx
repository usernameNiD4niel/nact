import { ButtonList } from "@/constants/enums";
import { useSelectedStore } from "@/utils/HomePageState";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const InventoryOfficerManagement = () => {
	const [selected, setSelected] = useSelectedStore((state) => [
		state.selected,
		state.setSelected,
	]);

	const router = useNavigate();
	const role = Cookies.get("role");

	useEffect(() => {
		if (role === "unset") {
			router("/");
		}
		if (selected !== ButtonList.InventoryOfficer) {
			setSelected(ButtonList.InventoryOfficer);
		}
	}, []);
	return <div>InventoryOfficerManagement</div>;
};

export default InventoryOfficerManagement;
