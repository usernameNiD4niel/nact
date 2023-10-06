import {
	ColumnDef,
	ColumnFiltersState,
	SortingState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
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
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import SearchWithFilter from "@/components/reuseable/SearchWithFilter";
import TableMutator from "@/components/reuseable/TableMutator";
import { DataTablePagination } from "./data-table-pagination";

import { Link } from "react-router-dom";
import { HiOutlinePlus } from "react-icons/hi2";

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	setIsShowingFilter: React.Dispatch<React.SetStateAction<boolean>>;
}

export function DataTable<TData, TValue>({
	columns,
	data,
	setIsShowingFilter,
}: DataTableProps<TData, TValue>) {
	const [sorting, setSorting] = React.useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		onColumnFiltersChange: setColumnFilters,
		getFilteredRowModel: getFilteredRowModel(),
		state: {
			sorting,
			columnFilters,
		},
	});

	const getValue = () =>
		(table.getColumn("supplier")?.getFilterValue() as string) ?? "";

	const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) =>
		table.getColumn("supplier")?.setFilterValue(event.target.value);

	return (
		<div>
			<div className="">
				<SearchWithFilter
					placeHolder="Search Supplier"
					isList={true}
					value={getValue()}
					onChange={handleOnChange}
				/>
				<div className="my-3">
					<TableMutator setIsShowingFilter={setIsShowingFilter} />
				</div>
			</div>
			<div className="rounded-md border">
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
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && "selected"}
									className="hover:cursor-pointer bg-white hover:bg-zinc-50/10">
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
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center">
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<div className="my-3">
				<DataTablePagination table={table} />
			</div>
			<div className="w-full flex items-center justify-center my-4">
				{/* <div className="flex items-center justify-end space-x-2 py-4">
					<Button
						variant="outline"
						size="sm"
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}>
						Previous
					</Button>
					<Button
						variant="outline"
						size="sm"
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}>
						Next
					</Button>
				</div> */}
				<Button variant={"custom"} className="px-8 font-bold py-6">
					Load More
				</Button>
			</div>
			<div className="fixed bottom-2 right-4">
				<Link
					to="/supplier/add"
					className="flex gap-1 rounded-full w-14 md:w-auto md:h-auto items-center justify-center text-white p-4 text-2xl h-14 bg-[#017DC3]">
					<HiOutlinePlus />
					<span className="hidden md:block text-sm">SUPPLIER</span>
				</Link>
			</div>
		</div>
	);
}
