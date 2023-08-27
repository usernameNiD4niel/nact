import { useInventoryState } from "@/utils/InventoryState";
import { useEffect } from "react";
const NewFeatures = () => {
	const [setActiveTab] = useInventoryState((state) => [state.setActiveTab]);

	useEffect(() => setActiveTab(3), []);

	return <div>NewFeatures</div>;
};

export default NewFeatures;
