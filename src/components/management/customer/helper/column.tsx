import { Button } from "@/components/ui/button";
import { CustomerTable } from "@/constants/props";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export const columns: ColumnDef<CustomerTable>[] = [
	{
		accessorKey: "customer",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
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
					className="hidden md:flex">
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
					className="hidden md:flex">
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
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
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
