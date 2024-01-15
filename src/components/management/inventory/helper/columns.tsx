import { Button } from "@/components/ui/button";
import { InventoryData } from "@/constants/props";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export const columns: ColumnDef<InventoryData>[] = [
	{
		accessorKey: "containerType",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
					Product Name
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => {
			return (
				<div className="ml-4 font-medium flex flex-col">
					<span>{row.getValue("containerType")}</span>
					<div className="flex flex-col md:hidden">
						<span>{row.getValue("city")}</span>
						<span>{row.getValue("state")}</span>
						<span>{row.getValue("quantity")}</span>
						<span>{row.getValue("depot")}</span>
					</div>
				</div>
			);
		},
	},
	{
		accessorKey: "city",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
					City
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => {
			return (
				<div className="ml-4 font-medium md:flex hidden">
					{row.getValue("city")}
				</div>
			);
		},
	},
	{
		accessorKey: "state",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
					State
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => {
			return (
				<div className="ml-4 font-medium md:flex hidden">
					{row.getValue("state")}
				</div>
			);
		},
	},
	{
		accessorKey: "quantity",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
					Quantity
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => {
			return (
				<div className="ml-4 font-medium md:flex hidden">
					{row.getValue("quantity")}
				</div>
			);
		},
	},
	{
		accessorKey: "depot",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
					Depot
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => {
			return (
				<div className="ml-4 font-medium md:flex hidden">
					{row.getValue("depot")}
				</div>
			);
		},
	},
	{
		accessorKey: "buyingRate",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
					Price
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => {
			return (
				<div className="ml-4 font-medium">{row.getValue("buyingRate")}</div>
			);
		},
	},
];
