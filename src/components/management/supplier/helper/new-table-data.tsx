// "use client";

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

import { DataTablePagination } from "./DataTablePagination";
// import { useRouter } from "next/navigation";
import { SupplierTableProps } from "@/constants/props";
import { useNavigate } from "react-router-dom";
import SearchWithFilter from "./SearchWithFilter";
import { cn } from "@/lib/utils";

interface DataTableProps<TValue> {
	columns: ColumnDef<SupplierTableProps, TValue>[];
	data: SupplierTableProps[];
	setData: React.Dispatch<React.SetStateAction<SupplierTableProps[]>>;
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

	const handleTableItem = (supplier: string) => {
		const foundObject = data.find((item) => item.businessName === supplier);

		router(`/supplier/${foundObject?.id}`);
	};

	// const handleNavigation = (destination: string) => {
	//   router(destination);
	// };

	const getValue = () =>
		(table.getColumn("businessName")?.getFilterValue() as string) ?? "";

	const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) =>
		table.getColumn("businessName")?.setFilterValue(event.target.value);

	const getLocation = (businessName: string) => {
		const location = data.find((item) => item.businessName === businessName);
		return location?.location;
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
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									className="hover:cursor-pointer"
									onClick={() => handleTableItem(row.getValue("businessName"))}
									// data-state={row.getIsSelected() && "selected"}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}

											{cell.id.substring(2) !== "companyPhoneNumber" && (
												<span className={cn("md:hidden text-center ms-4")}>
													{getLocation(row.getValue("businessName"))}{" "}
												</span>
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
				setData={setData}
				table={table}
				next_page_url={next_page_url}
				isFiltering={isFiltering}
			/>
		</div>
	);
}
