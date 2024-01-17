import { InventoryData } from "@/constants/props";
import { ColumnDef } from "@tanstack/react-table";

/**
 * id: string;
	containerType: string;
	city: string;
	state: string;
	quantity: string;
	depot: string;
	buyingRate: string;
 */
export const columns: ColumnDef<InventoryData>[] = [
	{
		accessorKey: "containerType",
		header: "Product Name",
		cell: ({ row }) => (
			<div className="capitalize">{row.getValue("containerType")}</div>
		),
	},
	{
		accessorKey: "city",
		header: "City",
		cell: ({ row }) => <div className="capitalize">{row.getValue("city")}</div>,
	},
	{
		accessorKey: "state",
		header: "State",
		cell: ({ row }) => (
			<div className="capitalize">{row.getValue("state")}</div>
		),
	},
	{
		accessorKey: "quantity",
		header: "Quantity",
		cell: ({ row }) => (
			<div className="capitalize">{row.getValue("quantity")}</div>
		),
	},
	{
		accessorKey: "depot",
		header: "Depot",
		cell: ({ row }) => (
			<div className="capitalize">{row.getValue("depot")}</div>
		),
	},
	{
		accessorKey: "buyingRate",
		header: "Buying Rate",
		cell: ({ row }) => (
			<div className="capitalize">{row.getValue("buyingRate")}</div>
		),
	},
];
