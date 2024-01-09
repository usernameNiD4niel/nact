import { useInventoryState } from "@/utils/InventoryState";
import { useEffect } from "react";

export default function Expired() {
	const [setActiveTab] = useInventoryState((state) => [state.setActiveTab]);

	useEffect(() => {
		setActiveTab(1);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className="w-full flex items-center justify-center">
			<div className="md:px-10 px-5 w-full">
				<div className="mt-36 md:mt-24 w-full">Expired</div>
			</div>
		</div>
	);
}
