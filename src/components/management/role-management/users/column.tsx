import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

type Users = {
	employee: string;
	role: string;
	accountStatus: "active" | "inactive";
};

export const users: Users[] = [
	{
		accountStatus: "active",
		employee: "Employee 1",
		role: "Supply Chain",
	},
	{
		accountStatus: "inactive",
		employee: "Employee 2 ",
		role: "Sales Agent",
	},
	{
		accountStatus: "inactive",
		employee: "Employee 3",
		role: "Admin",
	},
	{
		accountStatus: "inactive",
		employee: "Employee 4",
		role: "Billing and Collection",
	},
	{
		accountStatus: "active",
		employee: "Employee 5",
		role: "Billing and Collection",
	},
	{
		accountStatus: "inactive",
		employee: "Employee 2",
		role: "Sales Agent",
	},
	{
		accountStatus: "inactive",
		employee: "Employee 3",
		role: "Admin",
	},
	{
		accountStatus: "inactive",
		employee: "Employee 4",
		role: "Billing and Collection",
	},
	{
		accountStatus: "active",
		employee: "Employee 5",
		role: "Billing and Collection",
	},
	{
		accountStatus: "inactive",
		employee: "Employee 2",
		role: "Sales Agent",
	},
	{
		accountStatus: "inactive",
		employee: "Employee 3",
		role: "Admin",
	},
	{
		accountStatus: "inactive",
		employee: "Employee 4",
		role: "Billing and Collection",
	},
	{
		accountStatus: "active",
		employee: "Employee 5",
		role: "Billing and Collection",
	},
	{
		accountStatus: "inactive",
		employee: "Employee 2",
		role: "Sales Agent",
	},
	{
		accountStatus: "inactive",
		employee: "Employee 3",
		role: "Admin",
	},
	{
		accountStatus: "inactive",
		employee: "Employee 4",
		role: "Billing and Collection",
	},
	{
		accountStatus: "active",
		employee: "Employee 5",
		role: "Billing and Collection",
	},
];

export const columns: ColumnDef<Users>[] = [
	{
		accessorKey: "employee",
		header: () => <div className="ml-5 text-xs">Employee</div>,
		cell: ({ row }) => {
			return (
				<div className=" font-medium ml-5 text-xs">
					{row.getValue("employee")}
				</div>
			);
		},
	},
	{
		accessorKey: "role",
		header: () => <div className="text-xs">Role</div>,
		cell: ({ row }) => {
			return <div className="font-medium text-xs">{row.getValue("role")}</div>;
		},
	},
	{
		accessorKey: "accountStatus",
		header: () => <div className="text-xs">Account Status</div>,
		cell: ({ row }) => {
			return (
				<Badge
					className=" font-medium text-xs"
					variant={
						((
							row.getValue("accountStatus") as string
						).toLowerCase() as "active") || "inactive"
					}>
					{row.getValue("accountStatus")}
				</Badge>
			);
		},
	},
];
