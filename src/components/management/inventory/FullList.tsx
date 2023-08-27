import { useInventoryState } from "@/utils/InventoryState";
import { useEffect } from "react";

const FullList = () => {
	const [setActiveTab] = useInventoryState((state) => [state.setActiveTab]);

	useEffect(() => setActiveTab(1), []);
	return <div>FullList</div>;
};

export default FullList;
