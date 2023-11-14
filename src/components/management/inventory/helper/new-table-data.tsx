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

interface DataTableProps<TValue> {
	columns: ColumnDef<InventoryData, TValue>[];
	data: InventoryData[];
	setData: React.Dispatch<React.SetStateAction<InventoryData[]>>;
	next_page_url: number | null;
}

export function NewDataTable<TValue>({
	columns,
	data,
	next_page_url,
	setData,
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
		const foundObject = data.find((item) => item.containerType === inventory);

		router(`/inventory/${foundObject?.id}`);
	};

	// const handleNavigation = (destination: string) => {
	//   router(destination);
	// };

	const getValue = () =>
		(table.getColumn("containerType")?.getFilterValue() as string) ?? "";

	const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) =>
		table.getColumn("containerType")?.setFilterValue(event.target.value);

	// const getItem = (
	// 	containerType: string,
	// 	column: "state" | "city" | "quantity" | "depot",
	// ): string => {
	// 	const item = data.find((item) => item.containerType === containerType);
	// 	return item![column];
	// };

	useEffect(() => {
		if (data) {
			table.setPageSize(data.length);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data]);

	return (
		<div className="w-full">
			<div className="my-4 w-full space-y-2">
				<SearchWithFilter
					placeHolder="Search Product"
					value={getValue()}
					onChange={handleOnChange}
					data={data}
					setData={setData}
					setIsFiltering={setIsFiltering}
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
									onClick={() => handleTableItem(row.getValue("containerType"))}
									// data-state={row.getIsSelected() && "selected"}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
											{/* <div className="md:hidden">
												{cell.id.substring(2) !== "price" && (
													<>
														<span className={cn("md:hidden text-center ms-4")}>
															{getItem(row.getValue("productName"), "city")}{" "}
														</span>
														<span className={cn("md:hidden text-center ms-4")}>
															{getItem(row.getValue("productName"), "state")}{" "}
														</span>
														<span className={cn("md:hidden text-center ms-4")}>
															{getItem(row.getValue("productName"), "quantity")}{" "}
														</span>
														<span className={cn("md:hidden text-center ms-4")}>
															{getItem(row.getValue("productName"), "depot")}{" "}
														</span>
													</>
												)}
											</div> */}
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
			/>
		</div>
	);
}
