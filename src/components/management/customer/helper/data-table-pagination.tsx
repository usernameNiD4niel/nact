import { Button } from "@/components/ui/button";
import { Table } from "@tanstack/react-table";
import { useEffect, useState } from "react";

interface DataTablePaginationProps<TData> {
	table: Table<TData>;
	next_page_url: number | null;
	setData: React.Dispatch<React.SetStateAction<TData[]>>;
	isFiltering: boolean;
}

export function DataTablePagination<TData>({
	table,
	next_page_url,
	isFiltering,
	setData,
}: DataTablePaginationProps<TData>) {
	const [nextPageUrl, setNextPageUrl] = useState<number | null>(null);

	const handleLoadMore = () => {
		// getInitialData(setNextPageUrl, setData, nextPageUrl);

		console.log(setData);

		if (nextPageUrl) {
			table.setPageSize(10);
		}
	};

	useEffect(() => {
		if (next_page_url) {
			setNextPageUrl(next_page_url);
		}
	}, [next_page_url]);

	return (
		<div className="flex items-center justify-center py-4 w-full">
			<Button
				variant={"custom"}
				onClick={handleLoadMore}
				disabled={!nextPageUrl || isFiltering}>
				{nextPageUrl && !isFiltering ? "Load More" : "End of List"}
			</Button>
		</div>
	);
}
