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

import { Link, useNavigate } from "react-router-dom";
import { HiOutlinePlus } from "react-icons/hi2";
import { Payment } from "@/constants/props";
import SearchWithFilter from "./SearchWithFilter";

interface DataTableProps<TValue> {
	columns: ColumnDef<Payment, TValue>[];
	data: Payment[];
	setData: React.Dispatch<React.SetStateAction<Payment[]>>;
}

export function DataTable<TValue>({
	columns,
	data,
	setData,
}: DataTableProps<TValue>) {
	const [sorting, setSorting] = React.useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [counter, setCounter] = useState(20);

	const navigate = useNavigate();

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

	const handleTableItem = (supplier: string) => {
		console.log("redirect");
		const foundObject = data.find((item) => item.supplier === supplier);

		navigate(`/supplier/${foundObject?.id}`);
	};

	const getState = (supplier: string) => {
		return data
			.find((item) => item.supplier === supplier)
			?.location.split(",")[0]
			.trim();
	};

	const getCountry = (supplier: string) => {
		return data
			.find((item) => item.supplier === supplier)
			?.location.split(",")[1]
			.trim();
	};

	return (
		<div className="w-full">
			<div className="my-4 w-full space-y-2">
				<SearchWithFilter
					placeHolder="Search Supplier"
					isList={true}
					value={getValue()}
					setData={setData}
					onChange={handleOnChange}
					data={data}
				/>
				{/* <div className="my-3">
          <TableMutator data={data} />
        </div> */}
			</div>
			<div className="rounded-md border">
				<Table className="w-full">
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
									className="hover:cursor-pointer bg-white hover:bg-zinc-50/10"
									onClick={() => handleTableItem(row.getValue("supplier"))}>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
											<span className="md:hidden ml-4 flex flex-col">
												{cell.id.endsWith("supplier") === true && (
													<>
														{getState(row.getValue("supplier"))}
														{", "}
														{getCountry(row.getValue("supplier"))}
													</>
												)}
											</span>
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
			{/* <div className="my-3">
				<DataTablePagination table={table} />
			</div> */}
			<div className="w-full flex items-center justify-center my-4">
				{Math.floor(table.getFilteredRowModel().flatRows.length / 10) ===
				Math.floor((counter - 20) / 10) ? (
					<Button
						className="bg-transparent text-[#017DC3] px-8 font-bold py-6"
						disabled>
						No Item Found
					</Button>
				) : (
					<Button
						variant={"noVariant"}
						className="px-8 font-bold py-6 text-[#017DC3] bg-transparent"
						onClick={() => {
							table.setPageSize(counter);
							setCounter((prevCount) => prevCount + 10);
						}}>
						Load More
					</Button>
				)}
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
