import { Button } from "@/components/ui/button";
import { Table } from "@tanstack/react-table";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

export function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  const handleLoadMore = () => {
    console.log();

    table.setPageSize(10);
  };

  return (
    <div className="flex items-center justify-center py-4 w-full">
      <Button variant={"custom"} onClick={handleLoadMore} disabled={false}>
        End of List
      </Button>
    </div>
  );
}
