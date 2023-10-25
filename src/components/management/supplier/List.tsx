import { useInventoryState } from "@/utils/InventoryState";
import React, { useEffect, useState } from "react";
import { HelperType, SupplierTableProps } from "@/constants/props";
import { columns } from "./helper/columns";
import { NewDataTable } from "./helper/new-table-data";
import AddButton from "@/components/reuseable/AddButton";
import { Link } from "react-router-dom";
import { mobileColumn } from "./helper/mobile-column";

const getInitialData = async (
	setNextPageUrl: React.Dispatch<React.SetStateAction<number | null>>,
) => {
	const response = await fetch(
		`${import.meta.env.VITE_BASE_URL}/api/supplier?page=1&per_page=10`,
		{
			headers: {
				"Content-Type": "application/json",
			},
		},
	);

	if (response.ok) {
		const data: Promise<HelperType> = await response.json();
		const supplier: SupplierTableProps[] = (await data).suppliers;
		setNextPageUrl((await data).next_page);
		return supplier;
	}

	throw new Error("cannot get the data");
};

const List = () => {
	const [setTab] = useInventoryState((state) => [state.setActiveTab]);

	const [supplier, setSupplier] = useState<SupplierTableProps[]>([]);
	const [nextPageUrl, setNextPageUrl] = useState<number | null>(null);

	const fetchedData = async () => {
		const data = await getInitialData(setNextPageUrl);
		setSupplier(data);
	};

	useEffect(() => {
		// datas();
		fetchedData();
		setTab(0);
	}, []);

	return (
		<div className="w-full flex items-center justify-center">
			<div className="md:px-10 px-5 w-full">
				<div className="mt-36 md:mt-24 w-full">
					{/* <ContentTable /> */}
					{!supplier || supplier.length === 0 ? (
						<div>
							No supplier data yet,{" "}
							<Link to="/supplier/add">create new entry</Link>
						</div>
					) : (
						<>
							<div className="w-full md:flex hidden">
								<NewDataTable
									columns={columns}
									data={supplier}
									next_page_url={nextPageUrl}
									setData={setSupplier}
								/>
							</div>
							<div className="md:hidden w-full">
								<NewDataTable
									columns={mobileColumn}
									data={supplier}
									next_page_url={nextPageUrl}
									setData={setSupplier}
								/>
							</div>
						</>
					)}
				</div>
			</div>
			<AddButton
				redirectUrl="/supplier/add"
				textButton="Supplier"
				key={"SupplierAddTable"}
			/>
		</div>
	);
};

export default List;
