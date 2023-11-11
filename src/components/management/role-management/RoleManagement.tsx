import { ButtonList } from "@/constants/enums";
import { useSelectedStore } from "@/utils/HomePageState";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RoleManagement = () => {
	const [selected, setSelected] = useSelectedStore((state) => [
		state.selected,
		state.setSelected,
	]);

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
	return <div>RoleManagement</div>;
};

export default RoleManagement;
