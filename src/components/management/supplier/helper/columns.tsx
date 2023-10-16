import { Button } from "@/components/ui/button";
import { SupplierTableProps } from "@/constants/props";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export const columns: ColumnDef<SupplierTableProps>[] = [
	{
		accessorKey: "businessName",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
					Supplier
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => {
			return (
				<div className="ml-4 font-medium">
					{row.getValue("businessName")}
					<span className="md:hidden">
						{" "}
						<br />
						{row.getValue("location")}
					</span>
				</div>
			);
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
		accessorKey: "companyPhoneNumber",
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
			return (
				<div className="ml-4 font-medium">
					{row.getValue("companyPhoneNumber")}
				</div>
			);
		},
	},
];
