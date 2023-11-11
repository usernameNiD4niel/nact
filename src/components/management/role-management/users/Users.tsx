import { useInventoryState } from "@/utils/InventoryState";
import { useEffect } from "react";

const Users = () => {
	const [setActiveTab] = useInventoryState((state) => [state.setActiveTab]);

	useEffect(() => {
		setActiveTab(0);
	}, []);
	return <div>Users</div>;
};

export default Users;
