import { Button } from "@/components/ui/button";
import { InventoryData } from "@/constants/props";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export const mobileColumn: ColumnDef<InventoryData>[] = [
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
				<div className="ml-4 font-medium">{row.getValue("containerType")}</div>
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
