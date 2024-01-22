import {
	ColumnDef,
	flexRender,
	SortingState,
	getCoreRowModel,
	ColumnFiltersState,
	getSortedRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	useReactTable,
} from "@tanstack/react-table";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

// import { useRouter } from "next/navigation";
import { InventoryData } from "@/constants/props";
import { useNavigate } from "react-router-dom";
import SearchWithFilter from "./SearchWithFilter";
import { DataTablePagination } from "./data-table-pagination";
import { useEffect, useState } from "react";
import useScreenSize from "@/hooks/useScreenSize";

interface DataTableProps<TValue> {
	columns: ColumnDef<InventoryData, TValue>[];
	data: InventoryData[];
	clone: InventoryData[];
	setData: React.Dispatch<React.SetStateAction<InventoryData[]>>;
	next_page_url: number | null;
	isAvailable: boolean;
}

export function NewDataTable<TValue>({
	columns,
	data,
	next_page_url,
	setData,
	clone,
	isAvailable,
}: DataTableProps<TValue>) {
	const [sorting, setSorting] = useState<SortingState>([]);

	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

	const [rowSelection, setRowSelection] = useState({});
	const [isFiltering, setIsFiltering] = useState(false);

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		onColumnFiltersChange: setColumnFilters,
		getFilteredRowModel: getFilteredRowModel(),
		onRowSelectionChange: setRowSelection,
		state: {
			sorting,
			columnFilters,
			rowSelection,
		},
	});

	const router = useNavigate();

	const handleTableItem = (inventory: string) => {
		const foundObject = data.find((item) => item.id === inventory);

		console.log(`inventory ::: ${JSON.stringify(foundObject, null, 2)}`);

		router(`/inventory/${foundObject?.id}`);
	};

	// ? get the actual value of an specific column
	// const getItem = (
	// 	containerType: string,
	// 	column: "state" | "city" | "quantity" | "depot",
	// ): string => {
	// 	const item = data.find((item) => item.containerType === containerType);
	// 	return item![column];
	// };

	// ? calls everytime the width changes with the delay of 200ms
	function handleWidth(width: number) {
		// ? make the table responsive
		if (width < 768) {
			table.getColumn("city")?.toggleVisibility(false);
			table.getColumn("state")?.toggleVisibility(false);
			table.getColumn("quantity")?.toggleVisibility(false);
			table.getColumn("depot")?.toggleVisibility(false);
		} else {
			table.getColumn("city")?.toggleVisibility(true);
			table.getColumn("state")?.toggleVisibility(true);
			table.getColumn("quantity")?.toggleVisibility(true);
			table.getColumn("depot")?.toggleVisibility(true);
		}
	}

	const width = useScreenSize();

	// ? Make the table adoptable based on the device width
	useEffect(() => {
		setTimeout(() => handleWidth(width), 200);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [width]);

	// ? Make sure that the table is sync with actual data
	// useEffect(() => {
	// 	table.reset();
	// 	if (data && isFiltering) {
	// 		table.setPageSize(data.length);
	// 	}
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [data, isFiltering]);

	useEffect(() => {
		table.getColumn("id")?.toggleVisibility(false);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<div className="w-full">
			<div className="my-4 w-full space-y-2">
				<SearchWithFilter
					placeHolder="Search Product"
					duplicate={clone}
					data={data}
					setData={setData}
					table={table}
					setIsFiltering={setIsFiltering}
					isAvailable={isAvailable}
				/>
			</div>
			<div className="rounded-md border w-full">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext(),
														// eslint-disable-next-line no-mixed-spaces-and-tabs
												  )}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length || (data && data.length > 0) ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									className="hover:cursor-pointer"
									onClick={() => handleTableItem(row.getValue("id"))}
									// data-state={row.getIsSelected() && "selected"}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<>
								<TableRow>
									<TableCell
										colSpan={columns.length}
										className="h-24 text-center">
										No results.
									</TableCell>
								</TableRow>
							</>
						)}
					</TableBody>
				</Table>
			</div>
			<DataTablePagination
				setData={setData}
				table={table}
				next_page_url={next_page_url}
				isFiltering={isFiltering}
				isAvailable={isAvailable}
			/>
		</div>
	);
}
