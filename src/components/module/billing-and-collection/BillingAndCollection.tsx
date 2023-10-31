import { useInventoryState } from "@/utils/InventoryState";
import { useEffect } from "react";

const BillingAndCollection = () => {
	const [setTab] = useInventoryState((state) => [state.setActiveTab]);

	useEffect(() => setTab(3), []);
	return <div>BillingAndCollection</div>;
};

export default BillingAndCollection;
