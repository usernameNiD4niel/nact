import { getPaginatedExpired } from "@/api/inventory";
import { Button } from "@/components/ui/button";
import { InventoryData } from "@/constants/props";
import { Table } from "@tanstack/react-table";
import { useEffect, useState } from "react";

interface DataTablePaginationProps<TData> {
	table: Table<TData>;
	setData: React.Dispatch<React.SetStateAction<InventoryData[]>>;
	next_page_url: number | null;
}

export function DataTablePagination<TData>({
	table,
	next_page_url,
	setData,
}: DataTablePaginationProps<TData>) {
	const [nextPageUrl, setNextPageUrl] = useState<number | null>(null);

	useEffect(() => {
		if (next_page_url) {
			setNextPageUrl(next_page_url);
		}
	}, [next_page_url]);

	const handleLoadMore = async () => {
		if (nextPageUrl) {
			const response = await getPaginatedExpired(nextPageUrl);

			setData((prev) => [...prev, ...response.expired_inventory_items]);
			setNextPageUrl(response.next_page);
			table.setPageSize(nextPageUrl * 10);
		}
	};

	return (
		<div className="flex items-center justify-center py-4 w-full">
			<Button
				variant={"custom"}
				onClick={handleLoadMore}
				disabled={!nextPageUrl}>
				{nextPageUrl ? `Load More` : "End of List"}
			</Button>
		</div>
	);
}
