import { useInventoryState } from "@/utils/InventoryState";
import { useEffect, useState } from "react";
import { columns } from "./helper/columns";
import AddButton from "@/components/reuseable/AddButton";
import { NewDataTable } from "./helper/new-table-data";
import { InventoryData } from "@/constants/props";
import { getPaginatedData } from "@/api/inventory";
import { useSearchParams } from "react-router-dom";
import Cookies from "js-cookie";

const Available = (): JSX.Element => {
	const [setActiveTab] = useInventoryState((state) => [state.setActiveTab]);

	const [data, setData] = useState<InventoryData[]>([]);

	const [clone, setClone] = useState<InventoryData[]>([]);

	const [queryParams] = useSearchParams();

	const shouldRefetch = queryParams.get("shouldRefetch");

	const [isSalesAssociate, setIsSalesAssociate] = useState(false);

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

	useEffect(() => {
		const access_role = Cookies.get("access_role")?.toString();

		if (access_role && access_role === "Sales Associate") {
			setIsSalesAssociate(true);
		} else {
			setIsSalesAssociate(false);
		}
		const tableData = localStorage.getItem("table_data");
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

	return (
		<>
			<div className="w-full flex items-center justify-center">
				<div className="md:px-10 px-5 w-full">
					<div className="mt-36 md:mt-24 w-full">
						<NewDataTable
							columns={columns}
							data={data}
							next_page_url={nextPageUrl}
							clone={clone}
							setData={setData}
							isAvailable={true}
						/>
					</div>
				</div>
				{!isSalesAssociate && (
					<AddButton
						redirectUrl="/inventory/add"
						textButton="Inventory"
						key={"InventoryAddTable"}
					/>
				)}
			</div>
		</>
	);
};

export default Available;
