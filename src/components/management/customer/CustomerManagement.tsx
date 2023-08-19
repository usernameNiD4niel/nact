import { ButtonList } from "@/constants/enums";
import { useSelectedStore } from "@/utils/HomePageState";
import { useEffect } from "react";

const CostumerManagement = () => {
	const [selected, setSelected] = useSelectedStore((state) => [
		state.selected,
		state.setSelected,
	]);

	useEffect(() => {
		if (selected !== ButtonList.Costumer) {
			setSelected(ButtonList.Costumer);
		}
	}, []);
	return <div>CostumerManagement</div>;
};

export default CostumerManagement;
