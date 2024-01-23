import { useInventoryState } from "@/utils/InventoryState";
import { useEffect, useState } from "react";
import { columns } from "./helper/columns";
import { useQuery } from "@tanstack/react-query";
import { getPaginatedExpired } from "@/api/inventory";
import { NewDataTable } from "./helper/new-table-data";
import { InventoryData } from "@/constants/props";

export default function Expired() {
	/**
	 * 

	const [data, setData] = useState<InventoryData[]>([]);

	const [clone, setClone] = useState<InventoryData[]>([]);

	const [queryParams] = useSearchParams();

	const shouldRefetch = queryParams.get("shouldRefetch");

	const [nextPageUrl, setNextPageUrl] = useState<number | null>(null);

	const fetchedData = async () => {
		const data_ = await getPaginatedData();
		localStorage.setItem("available-inventory", JSON.stringify(data_));
		setNextPageUrl(data_.next_page);
		setData(data_.products);
		setClone(data_.products);
	};

	useEffect(() => {
		if (data && data.length > 0) {
			localStorage.setItem("table_data", JSON.stringify(data));
		}
	}, [data]);

	const tableData = localStorage.getItem("table_data");

	useEffect(() => {
		if (tableData) {
			if (shouldRefetch && shouldRefetch === "true") {
				fetchedData();
			} else {
				setData(JSON.parse(tableData));
			}
		} else {
			fetchedData();
		}
		setActiveTab(0);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	 */
	const [setActiveTab] = useInventoryState((state) => [state.setActiveTab]);

	const { data, isLoading, isError } = useQuery(["get-paginated-expired"], {
		queryFn: () => getPaginatedExpired(1),
	});

	const [expired, setExpired] = useState<InventoryData[]>([]);
	const [nextPage, setNextPage] = useState<number | null>(null);
	const [clone, setClone] = useState<InventoryData[]>([]);

	async function fetchData() {
		const data = await getPaginatedExpired(1);
		console.log(`dataa ::: ${JSON.stringify(data, null, 2)}`);
		setClone(data.expired_inventory_items);
		setExpired(data.expired_inventory_items);
		setNextPage(data.next_page);
	}

	useEffect(() => {
		setActiveTab(1);
		const expire_table_data = localStorage.getItem("expire_table_data");

		if (expire_table_data) {
			setExpired(JSON.parse(expire_table_data));
			return;
		}

		fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (expired && expired.length > 0) {
			localStorage.setItem(
				"expire_table_data",
				JSON.stringify(data?.expired_inventory_items),
			);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [expired]);

	function content() {
		if (isLoading) {
			return (
				<div className="w-full h-[65vh] flex items-center justify-center">
					<p className="text-sm">Getting the expired inventory</p>
				</div>
			);
		}

		if (isError) {
			return (
				<div className="w-full h-[65vh] flex items-center justify-center">
					<p className="text-red-500 text-sm">
						Cannot get the expired data, please try again
					</p>
				</div>
			);
		}

		return (
			<NewDataTable
				columns={columns}
				data={expired}
				next_page_url={nextPage}
				clone={clone}
				isAvailable={false}
				setData={setExpired}
				key={"srccomponentsmanagementinventoryexpired"}
			/>
		);
	}

	return (
		<div className="w-full flex items-center justify-center">
			<div className="md:px-10 px-5 w-full">
				<div className="mt-36 mb-10 md:mt-24 w-full">{content()}</div>
			</div>
		</div>
	);
}
