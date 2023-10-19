import { ButtonList } from "@/constants/enums";
import { useSelectedStore } from "@/utils/HomePageState";
import { useEffect } from "react";

const AssignRole = () => {
	const [setSelected] = useSelectedStore((state) => [state.setSelected]);

	useEffect(() => setSelected(ButtonList.AssignRoles), []);
	return <div>AssignRole</div>;
};

export default AssignRole;
