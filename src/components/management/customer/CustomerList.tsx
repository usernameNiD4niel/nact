import { useInventoryState } from "@/utils/InventoryState";
import { useEffect } from "react";
import AddButton from "@/components/reuseable/AddButton";
import { DataTable } from "./helper/data-table";
import { columns } from "./helper/column";
import { useQuery } from "@tanstack/react-query";
import { getInitialData } from "@/api/customer";

const CustomerList = () => {
	const [setTab] = useInventoryState((state) => [state.setActiveTab]);

	const { data, isLoading } = useQuery(["get-paginated-customer"], {
		queryFn: () => getInitialData(1),
	});

	useEffect(() => {
		setTab(0);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className="w-full flex items-center justify-center">
			<div className="md:px-10 px-5 w-full">
				<div className="mt-36 md:mt-24 w-full">
					{isLoading ? (
						<div className="w-full flex items-center justify-center h-[60vh]">
							<p className="text-sm">Loading...</p>
						</div>
					) : (
						<DataTable
							columns={columns}
							data_={data?.customers || []}
							next_page_url={null}
						/>
					)}
				</div>
			</div>
			<AddButton
				redirectUrl="/customer/add"
				textButton="Customer"
				key={"CustomerAddTable"}
			/>
		</div>
	);
};

export default CustomerList;
