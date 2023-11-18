import { Badge } from "@/components/ui/badge";
import { RoleManagementAccounts } from "@/constants/props";
import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want. wwwhat

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

export const columns: ColumnDef<RoleManagementAccounts>[] = [
	{
		accessorKey: "id",
	},
	{
		accessorKey: "fullName",
		header: () => <div className="ml-5 text-xs">Employee</div>,
		cell: ({ row }) => {
			const employee = row.getValue("fullName") as string;
			return (
				<div className=" font-medium ml-5 text-xs flex flex-col">
					<span>
						{employee.length > 20
							? employee.substring(0, 20) + "..."
							: employee}
					</span>
					<span className="md:hidden">{row.getValue("userType")}</span>
				</div>
			);
		},
	},
	{
		accessorKey: "userType",
		header: () => <div className="text-xs hidden md:flex">Role</div>,
		cell: ({ row }) => {
			return (
				<div className="font-medium text-xs hidden md:flex">
					{row.getValue("userType")}
				</div>
			);
		},
	},
	{
		accessorKey: "status",
		header: () => <div className="text-xs">Account Status</div>,
		cell: ({ row }) => {
			return (
				<Badge
					className=" font-medium text-xs"
					variant={
						((row.getValue("status") as string).toLowerCase() as "active") ||
						"inactive"
					}>
					{row.getValue("status")}
				</Badge>
			);
		},
	},
];
