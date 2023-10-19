import { Button } from "@/components/ui/button";
import { SupplierTableProps } from "@/constants/props";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export const mobileColumn: ColumnDef<SupplierTableProps>[] = [
  {
    accessorKey: "businessName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="font-bold text-gray-700 text-sm"
        >
          Supplier
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="ml-4 text-gray-700 text-sm">
          {row.getValue("businessName")}
        </div>
      );
    },
  },

  {
    accessorKey: "companyPhoneNumber",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="font-bold text-gray-700 text-sm"
        >
          Contact
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="ml-4 text-sm">{row.getValue("companyPhoneNumber")}</div>
      );
    },
  },
];
