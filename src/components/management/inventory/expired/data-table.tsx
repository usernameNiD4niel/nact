import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
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
import { InventoryData } from "@/constants/props";
import { DataTablePagination } from "./data-table-pagination";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import FilterSVG from "@/assets/filter.svg";
import useScreenSize from "@/hooks/useScreenSize";

interface DataTableProps<TValue> {
  columns: ColumnDef<InventoryData, TValue>[];
  data_: InventoryData[];
  nextPage: number | null;
}

export function DataTable<TValue>({
  columns,
  data_,
  nextPage,
}: DataTableProps<TValue>) {
  const [data, setData] = useState(data_);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    state: {
      sorting,
      columnFilters,
    },
  });

  function handleWidth(width: number) {
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

  useEffect(() => {
    setTimeout(() => handleWidth(width), 200);
  }, [width]);

  return (
    <div className="w-full">
      <form className="flex items-center pb-4 w-full relative">
        <Search
          className="absolute left-3 top-[0.9rem] text-gray-400"
          size={18}
        />
        <Input
          placeholder="Search product name"
          className="w-full py-6 px-10"
          required
        />
        <Button
          variant={"outline"}
          className="absolute right-0 top-0 h-[3.09rem] rounded-none rounded-e-md"
        >
          <img src={FilterSVG} width={25} height={25} />
        </Button>
      </form>
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
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
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
      <DataTablePagination
        next_page_url={nextPage}
        setData={setData}
        table={table}
      />
    </div>
  );
}
