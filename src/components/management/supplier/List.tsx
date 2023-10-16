import { useInventoryState } from "@/utils/InventoryState";
import React, { useEffect, useState } from "react";
import { SupplierTableProps } from "@/constants/props";
import { DataTable } from "./helper/data-table";
import { columns } from "./helper/columns";
import { getPaginatedSupplier } from "@/api/supplier";
import { Link } from "react-router-dom";
import { mobileColumn } from "./helper/mobile-column";

const List = () => {
	const [setTab] = useInventoryState((state) => [state.setActiveTab]);

	const [supplier, setSupplier] = useState<SupplierTableProps[]>([]);
	const [isFetching, setIsFetching] = useState(true);
	const [currentPage, setCurrentPage] = useState(2);

	const datas = async () => {
		const d = await getPaginatedSupplier(currentPage, setIsFetching);
		setSupplier(d);
		console.log("todays data: ", d);
	};

	useEffect(() => {
		datas();
		setTab(0);
	}, [currentPage]);

	const ContentTable = () => {
		if (isFetching) {
			return <div>Fetching data please wait...</div>;
		}

		if (supplier && supplier.length > 0) {
			return (
				<React.Fragment>
					<div className="hidden md:flex w-full">
						<DataTable
							columns={columns}
							data={supplier}
							handleRefetch={datas}
							currentPage={currentPage}
							setCurrentPage={setCurrentPage}
							setIsFetching={setIsFetching}
							setData={setSupplier}
						/>
					</div>
					<div className="md:hidden w-full">
						<DataTable
							columns={mobileColumn}
							data={supplier}
							handleRefetch={datas}
							setIsFetching={setIsFetching}
							currentPage={currentPage}
							setData={setSupplier}
							setCurrentPage={setCurrentPage}
						/>
					</div>
				</React.Fragment>
			);
		}

		return (
			<div>
				No supplier data yet, <Link to="/supplier/add">create new entry</Link>
			</div>
		);
	};

	return (
		<div className="w-full flex items-center justify-center">
			<div className="md:px-10 px-5 w-full">
				<div className="mt-36 md:mt-24 w-full">
					<ContentTable />
				</div>
			</div>
			{/* <AddButton /> */}
			{/* {isShowingFilter && (
        <Filter
          data={SupplierTableData}
          setIsShowingFilter={setIsShowingFilter}
        />
      )} */}
		</div>
	);
};

export default List;
