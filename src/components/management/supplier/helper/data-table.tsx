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

import { Link, useNavigate } from "react-router-dom";
import { HiOutlinePlus } from "react-icons/hi2";
import { FilterForm, Payment } from "@/constants/props";

interface DataTableProps<TValue> {
  columns: ColumnDef<Payment, TValue>[];
  data: Payment[];
  handleFilter: ({ contact, location, supplier }: FilterForm) => void;
  setIsShowingFilter: React.Dispatch<React.SetStateAction<boolean>>;
}

export function DataTable<TValue>({
  columns,
  data,
  setIsShowingFilter,
  handleFilter,
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

  const handleTableItem = (rowIndex: number) => {
    console.log("redirect");

    navigate(`/supplier/${data[rowIndex].id}`);
  };

  return (
    <div className="px-6">
      <div className="">
        <SearchWithFilter
          placeHolder="Search Supplier"
          isList={true}
          value={getValue()}
          handleFilter={handleFilter}
          onChange={handleOnChange}
        />
        <div className="my-3">
          <TableMutator setIsShowingFilter={setIsShowingFilter} data={data} />
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
                            header.getContext()
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
              table.getRowModel().rows.map((row, rowIndex) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="hover:cursor-pointer bg-white hover:bg-zinc-50/10"
                  onClick={() => handleTableItem(rowIndex)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
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
            disabled
          >
            No Item Found
          </Button>
        ) : (
          <Button
            variant={"noVariant"}
            className="px-8 font-bold py-6 text-[#017DC3] bg-transparent"
            onClick={() => {
              table.setPageSize(counter);
              setCounter((prevCount) => prevCount + 10);
            }}
          >
            Load More
          </Button>
        )}
      </div>
      <div className="fixed bottom-2 right-4">
        <Link
          to="/supplier/add"
          className="flex gap-1 rounded-full w-14 md:w-auto md:h-auto items-center justify-center text-white p-4 text-2xl h-14 bg-[#017DC3]"
        >
          <HiOutlinePlus />
          <span className="hidden md:block text-sm">SUPPLIER</span>
        </Link>
      </div>
    </div>
  );
}
