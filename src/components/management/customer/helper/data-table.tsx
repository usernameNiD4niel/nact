"use client";

import {
	ColumnDef,
	ColumnFiltersState,
	flexRender,
	getCoreRowModel,
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
import { useCallback, useEffect, useState } from "react";
import { DataTablePagination } from "./data-table-pagination";
import SearchWithFilter from "./search-with-filter";
import useScreenSize from "@/hooks/useScreenSize";
import { cn } from "@/lib/utils";

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data_: TData[];
	next_page_url: number | null;
}

export function DataTable<TData, TValue>({
	columns,
	data_,
	next_page_url,
}: DataTableProps<TData, TValue>) {
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [data, setData] = useState<TData[]>(data_);
	const [isFiltering, setIsFiltering] = useState(false);

	const width = useScreenSize();

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onColumnFiltersChange: setColumnFilters,
		getFilteredRowModel: getFilteredRowModel(),
		state: {
			columnFilters,
		},
	});

	useEffect(() => {
		function handleWidthChange(width: number) {
			if (width < 768) {
				table.getColumn("location")?.toggleVisibility(false);
				table.getColumn("abcde")?.toggleVisibility(false);
			} else {
				table.getColumn("location")?.toggleVisibility(true);
				table.getColumn("abcde")?.toggleVisibility(true);
			}
		}
		handleWidthChange(width);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [width]);

	const getMemoizedData = useCallback(
		(customer: "location" | "abcde") => {
			console.log(`the data ::: ${JSON.stringify(data, null, 2)}`);
			// @ts-expect-error - This is a mistake
			const location = data.find((item) => item[customer] === customer);
			// @ts-expect-error - This is a mistake
			return location?.[`${customer}`];
		},
		[data],
	);

	const getValue = () =>
		(table.getColumn("customer")?.getFilterValue() as string) ?? "";

	const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) =>
		table.getColumn("customer")?.setFilterValue(event.target.value);

	return (
		<div className="w-full">
			<div className="my-4 w-full space-y-2">
				<SearchWithFilter
					onChange={handleOnChange}
					data={data}
					setData={setData}
					setIsFiltering={setIsFiltering}
					value={getValue()}
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
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && "selected"}>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
											{cell.id.substring(2) !== "contact" && (
												<>
													<span className={cn("md:hidden text-center ms-4")}>
														{getMemoizedData(row.getValue("customer"))}{" "}
													</span>
													<span className={cn("md:hidden text-center ms-4")}>
														{getMemoizedData(row.getValue("customer"))}{" "}
													</span>
												</>
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
			<DataTablePagination
				table={table}
				next_page_url={next_page_url}
				isFiltering={isFiltering}
				setData={setData}
			/>
		</div>
	);
}
