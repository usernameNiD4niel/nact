import { useInventoryState } from "@/utils/InventoryState";
import { useEffect } from "react";

const SalesAgent = () => {
	const [setTab] = useInventoryState((state) => [state.setActiveTab]);

	useEffect(() => setTab(2), []);
	return <div>SalesAgent</div>;
};

export default SalesAgent;
