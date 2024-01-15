import { useInventoryState } from "@/utils/InventoryState";
import React, { useEffect, useState } from "react";
import { HelperType, SupplierTableProps } from "@/constants/props";
import { columns } from "./helper/columns";
import { NewDataTable } from "./helper/new-table-data";
import AddButton from "@/components/reuseable/AddButton";
import { useSearchParams } from "react-router-dom";

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

	const [queryParams] = useSearchParams();
	const shouldRefetch = queryParams.get("shouldRefetch");

	const fetchedData = async () => {
		const data = await getInitialData(setNextPageUrl);
		setSupplier(data);
	};

	useEffect(() => {
		if (supplier && supplier.length > 0) {
			localStorage.setItem("table_supplier", JSON.stringify(supplier));
		}
	}, [supplier]);

	useEffect(() => {
		const tableSupplier = localStorage.getItem("table_supplier");

		if (tableSupplier) {
			if (shouldRefetch && shouldRefetch === "true") {
				fetchedData();
			} else {
				setSupplier(JSON.parse(tableSupplier));
			}
		} else {
			fetchedData();
			setTab(0);
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className="w-full flex items-center justify-center">
			<div className="md:px-10 px-5 w-full">
				<div className="mt-36 md:mt-24 w-full">
					<NewDataTable
						columns={columns}
						data={supplier}
						next_page_url={nextPageUrl}
						setData={setSupplier}
					/>
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
