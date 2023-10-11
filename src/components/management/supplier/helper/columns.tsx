import { Button } from "@/components/ui/button";
import { Payment } from "@/constants/props";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export const columns: ColumnDef<Payment>[] = [
	{
		accessorKey: "supplier",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					className="font-bold text-gray-700 text-sm">
					Supplier
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => {
			return (
				<div className="ml-4 text-gray-700 text-sm">
					{row.getValue("supplier")}
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
					className="hidden md:flex font-bold text-gray-700 text-sm">
					Location
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => {
			return (
				<div className="ml-4 hidden md:flex text-gray-700 text-sm">
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
					className="hidden md:flex font-bold text-gray-700 text-sm">
					Abcde
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => {
			return (
				<div className="ml-4 text-sm hidden md:flex text-gray-700">
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
					className="font-bold text-gray-700 text-sm">
					Contact
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => {
			return <div className="ml-4 text-sm">{row.getValue("contact")}</div>;
		},
	},
];
