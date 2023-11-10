import * as React from "react";

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
import { InventoryTypes } from "@/constants/props";
import { useNavigate } from "react-router-dom";
import SearchWithFilter from "./SearchWithFilter";
import { cn } from "@/lib/utils";
import { DataTablePagination } from "./data-table-pagination";

interface DataTableProps<TValue> {
	columns: ColumnDef<InventoryTypes, TValue>[];
	data: InventoryTypes[];
	setData: React.Dispatch<React.SetStateAction<InventoryTypes[]>>;
	next_page_url: number | null;
}

export function NewDataTable<TValue>({
	columns,
	data,
	setData,
	next_page_url,
}: DataTableProps<TValue>) {
	const [sorting, setSorting] = React.useState<SortingState>([]);

	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
		[],
	);

	const [rowSelection, setRowSelection] = React.useState({});
	const [isFiltering, setIsFiltering] = React.useState(false);

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
		const foundObject = data.find((item) => item.productName === inventory);

		router(`/inventory/${foundObject?.id}`);
	};

	// const handleNavigation = (destination: string) => {
	//   router(destination);
	// };

	const getValue = () =>
		(table.getColumn("productName")?.getFilterValue() as string) ?? "";

	const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) =>
		table.getColumn("productName")?.setFilterValue(event.target.value);

	const getItem = (
		productName: string,
		column: "state" | "city" | "quantity" | "depot",
	): string => {
		const item = data.find((item) => item.productName === productName);
		return item![column];
	};

	React.useEffect(() => {
		console.log(`data ${data.length}`);

		table.setPageSize(data.length);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data]);

	return (
		<div className="w-full">
			<div className="my-4 w-full space-y-2">
				<SearchWithFilter
					placeHolder="Search Supplier"
					value={getValue()}
					onChange={handleOnChange}
					data={data}
					// setData={setData}
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
									onClick={() => handleTableItem(row.getValue("productName"))}
									// data-state={row.getIsSelected() && "selected"}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}

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
