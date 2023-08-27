import { useInventoryState } from "@/utils/InventoryState";
import { useEffect } from "react";

const Analytics = () => {
	const [setTab] = useInventoryState((state) => [state.setActiveTab]);

	useEffect(() => setTab(1), []);
	return <div>Analytics</div>;
};

export default Analytics;
