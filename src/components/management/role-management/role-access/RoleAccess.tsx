import { useInventoryState } from "@/utils/InventoryState";
import { useEffect } from "react";

const RoleAccess = () => {
	const [setActiveTab] = useInventoryState((state) => [state.setActiveTab]);

	useEffect(() => {
		setActiveTab(1);
	}, []);
	return <div>RoleAccess</div>;
};

export default RoleAccess;
