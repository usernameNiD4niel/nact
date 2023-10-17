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
import React, { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { HiOutlinePlus } from "react-icons/hi2";
import { SupplierTableProps } from "@/constants/props";
import SearchWithFilter from "./SearchWithFilter";
import { getPaginatedSupplier } from "@/api/supplier";

interface DataTableProps<TValue> {
	columns: ColumnDef<SupplierTableProps, TValue>[];
	data: SupplierTableProps[];
	setData: React.Dispatch<React.SetStateAction<SupplierTableProps[]>>;
}

export function DataTable<TValue>({
	columns,
	data,
	setData,
}: DataTableProps<TValue>) {
	const [sorting, setSorting] = React.useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

	const navigate = useNavigate();
	const [counter, setCounter] = useState(10);
	const [isFetching, setIsFetching] = useState(true);

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

	const getData = async () => {
		const d = await getPaginatedSupplier(
			Math.floor(counter / 10),
			setIsFetching,
		);
		setData((prev) => [...prev, ...d.suppliers]);
		table.setPageSize(counter);
	};

	useEffect(() => {
		if (!(data.length <= 10)) {
			getData();
		}
		console.log(isFetching);
	}, [counter]);

	const getValue = () =>
		(table.getColumn("businessName")?.getFilterValue() as string) ?? "";

	const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) =>
		table.getColumn("businessName")?.setFilterValue(event.target.value);

	const handleTableItem = (supplier: string) => {
		const foundObject = data.find((item) => item.businessName === supplier);

		navigate(`/supplier/${foundObject?.id}`);
	};

	// const getState = (supplier: string) => {
	// 	return data
	// 		.find((item) => item.businessName === supplier)
	// 		?.location.split(",")[0]
	// 		.trim();
	// };

	const getLocation = (supplier: string) => {
		return data.find((item) => item.businessName === supplier)?.location.trim();
	};

	return (
		<div className="w-full">
			<div className="my-4 w-full space-y-2">
				<SearchWithFilter
					placeHolder="Search Supplier"
					isList={true}
					value={getValue()}
					onChange={handleOnChange}
					data={data}
				/>
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
									onClick={() => handleTableItem(row.getValue("businessName"))}>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
											<span className="md:hidden ml-4 flex flex-col">
												{cell.id.endsWith("businessName") === true && (
													<>{getLocation(row.getValue("businessName"))}</>
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
							// setData([]);

							setCounter((prevCount) => prevCount + 10);
							// table.setPageSize(counter);
							// table.setPageIndex(2);
						}}>
						Load More
					</Button>
				)}
			</div>
			<div className="flex w-full items-center justify-center space-x-2 py-4">
				<Button
					variant="noVariant"
					size="sm"
					onClick={() => {
						table.previousPage();
					}}
					// disabled={!previousPage}
					className="disabled:bg-white bg-[#017DC3] text-white disabled:text-black">
					Previous
				</Button>
				<Button
					variant="noVariant"
					size="sm"
					onClick={() => {
						// setCurrentPage((prevCount) => prevCount + 1);
						// setCounter((prevCount) => prevCount + 10);
						table.nextPage();
					}}
					// disabled={!nextPage}
					className="disabled:bg-white bg-[#017DC3] text-white disabled:text-black">
					Next
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
