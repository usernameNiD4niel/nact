import { useInventoryState } from "@/utils/InventoryState";
import { useEffect } from "react";

const Abcd = () => {
	const [setActiveTab] = useInventoryState((state) => [state.setActiveTab]);

	useEffect(() => setActiveTab(2), []);
	return <div>Abcde</div>;
};

export default Abcd;
