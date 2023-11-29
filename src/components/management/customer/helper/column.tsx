import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export type Customer = {
  customer: string;
  location: number;
  abcde: "pending" | "processing" | "success" | "failed";
  contact: string;
};

export const customer: Customer[] = [
  {
    customer: "Alice",
    location: 123,
    abcde: "pending",
    contact: "09123456789",
  },
  {
    customer: "Bob",
    location: 456,
    abcde: "processing",
    contact: "09234567890",
  },
  {
    customer: "Charlie",
    location: 789,
    abcde: "success",
    contact: "09345678901",
  },
  {
    customer: "David",
    location: 246,
    abcde: "pending",
    contact: "09456789012",
  },
  {
    customer: "Eva",
    location: 135,
    abcde: "failed",
    contact: "09567890123",
  },
  // ... (additional items with 11-digit numbers starting with "09")
];

export const columns: ColumnDef<Customer>[] = [
  {
    accessorKey: "customer",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Customer
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div className="ml-4 font-medium">{row.getValue("customer")}</div>;
    },
  },
  {
    accessorKey: "location",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hidden md:flex"
        >
          Location
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="ml-4 hidden md:flex font-medium">
          {row.getValue("location")}
        </div>
      );
    },
  },
  {
    accessorKey: "abcde",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hidden md:flex"
        >
          Abcde
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="ml-4 font-medium hidden md:flex">
          {row.getValue("abcde")}
        </div>
      );
    },
  },
  {
    accessorKey: "contact",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Contact
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div className="ml-4 font-medium">{row.getValue("contact")}</div>;
    },
  },
];
