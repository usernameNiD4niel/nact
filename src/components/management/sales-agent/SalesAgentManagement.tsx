import { ButtonList } from "@/constants/enums";
import { useSelectedStore } from "@/utils/HomePageState";
import { useEffect } from "react";

const SalesAgentManagement = () => {
	const [selected, setSelected] = useSelectedStore((state) => [
		state.selected,
		state.setSelected,
	]);

	useEffect(() => {
		if (selected !== ButtonList.SalesAgent) {
			setSelected(ButtonList.SalesAgent);
		}
	}, []);
	return <div>SalesAgentManagement</div>;
};

export default SalesAgentManagement;
