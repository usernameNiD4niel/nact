import { useInventoryState } from "@/utils/InventoryState";
import { useEffect, useState } from "react";
import { Payment } from "@/constants/props";
import Filter from "@/components/reuseable/Filter";
import { SupplierTableData } from "@/constants/objects";
import { DataTable } from "./helper/data-table";
import { columns } from "./helper/columns";
import { getSupplierTableData } from "@/api/supplier";
import { Link } from "react-router-dom";

const List = () => {
	const [setTab] = useInventoryState((state) => [state.setActiveTab]);
	const [isShowingFilter, setIsShowingFilter] = useState(false);

	const [supplier, setSupplier] = useState<Payment[]>([]);
	const [isFetching, setIsFetching] = useState(true);

	const datas = async () => {
		const d = await getSupplierTableData(setIsFetching);
		console.log("the data: ", d);
		setSupplier(d);
	};

	useEffect(() => {
		datas();
		setTab(0);
	}, []);

	const ContentTable = () => {
		if (isFetching) {
			return <div>Fetching data please wait...</div>;
		}

		if (supplier && supplier.length > 0) {
			return (
				<DataTable
					columns={columns}
					data={supplier}
					setIsShowingFilter={setIsShowingFilter}
				/>
			);
		}

		return (
			<div>
				No supplier data yet, <Link to="/supplier/add">create new entry</Link>
			</div>
		);
	};

	return (
		<div className="w-full">
			<div className="md:px-10 px-2">
				<div className="mt-36 md:mt-24">
					<ContentTable />
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
