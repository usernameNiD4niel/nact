import { useInventoryState } from "@/utils/InventoryState";
import { useEffect } from "react";
import { DataTable } from "./expired/data-table";
import { columns } from "./expired/columns";
import { useQuery } from "@tanstack/react-query";
import { getPaginatedExpired } from "@/api/inventory";

export default function Expired() {
	const [setActiveTab] = useInventoryState((state) => [state.setActiveTab]);

	const { data, isLoading, isError } = useQuery(["get-paginated-expired"], {
		queryFn: () => getPaginatedExpired(1),
	});

	useEffect(() => {
		setActiveTab(1);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

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
			<DataTable
				columns={columns}
				data_={data.expired_inventory_items}
				nextPage={data.next_page}
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
