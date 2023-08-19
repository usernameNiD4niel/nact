import { ButtonList } from "@/constants/enums";
import { useSelectedStore } from "@/utils/HomePageState";
import { useEffect } from "react";

const InventoryOfficerManagement = () => {
	const [selected, setSelected] = useSelectedStore((state) => [
		state.selected,
		state.setSelected,
	]);

	useEffect(() => {
		if (selected !== ButtonList.InventoryOfficer) {
			setSelected(ButtonList.InventoryOfficer);
		}
	}, []);
	return <div>InventoryOfficerManagement</div>;
};

export default InventoryOfficerManagement;
