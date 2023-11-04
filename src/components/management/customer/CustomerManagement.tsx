import { ButtonList } from "@/constants/enums";
import { useSelectedStore } from "@/utils/HomePageState";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CostumerManagement = () => {
	const [selected, setSelected] = useSelectedStore((state) => [
		state.selected,
		state.setSelected,
	]);
	const role = Cookies.get("role");

	const router = useNavigate();

	useEffect(() => {
		if (role === "unset") {
			router("/");
		}
		if (selected !== ButtonList.Costumer) {
			setSelected(ButtonList.Costumer);
		}
	}, []);
	return <div>CostumerManagement</div>;
};

export default CostumerManagement;
