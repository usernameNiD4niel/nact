import { useInventoryState } from "@/utils/InventoryState";
import { useEffect, useState } from "react";
import { Payment } from "@/constants/props";
import Filter from "@/components/reuseable/Filter";
import { SupplierTableData, payments } from "@/constants/objects";
import { DataTable } from "./helper/data-table";
import { columns } from "./helper/columns";

function getData(): Payment[] {
	return payments;
}

const List = () => {
	const [setTab] = useInventoryState((state) => [state.setActiveTab]);
	const [isShowingFilter, setIsShowingFilter] = useState(false);

	const data = getData();

	useEffect(() => setTab(0), []);

	return (
		<div className="w-full">
			<div className="md:px-10 px-2">
				<div className="mt-36 md:mt-24">
					<DataTable
						columns={columns}
						data={data}
						setIsShowingFilter={setIsShowingFilter}
					/>
				</div>
			</div>
			{/* <AddButton /> */}
			{isShowingFilter && (
				<Filter
					data={SupplierTableData}
					setIsShowingFilter={setIsShowingFilter}
				/>
			)}
		</div>
	);
};

export default List;
