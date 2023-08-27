import AddButton from "@/components/reuseable/AddButton";
import SearchWithFilter from "@/components/reuseable/SearchWithFilter";
import TableSixCol from "@/components/reuseable/TableSixCol";
import { useInventoryState } from "@/utils/InventoryState";
import { useEffect } from "react";

const Available = (): JSX.Element => {
	const [setActiveTab] = useInventoryState((state) => [state.setActiveTab]);

	useEffect(() => setActiveTab(0), []);
	return (
		<div className="md:px-10 w-full space-y-5 px-5 py-6">
			<SearchWithFilter placeHolder="Search Inventory" />
			<AddButton
				redirectUrl="/inventory/add"
				textButton="INVENTORY"
				key="Add Button Key Inventory Management"
			/>
			<DisplayInventoryData />
		</div>
	);
};

const DisplayInventoryData = (): JSX.Element => {
	return (
		<section className="w-full flex items-center justify-center flex-col gap-y-2">
			<TableSixCol />
		</section>
	);
};

export default Available;
