import { TableDataProps } from "./props";

export type PinObjectProps = {
	name: string;
	pin: string;
};

export const pinObject: PinObjectProps[] = [
	{ name: "pin1", pin: "" },
	{ name: "pin2", pin: "" },
	{ name: "pin3", pin: "" },
	{ name: "pin4", pin: "" },
];

type CustomerTypeProps = {
	title: string;
	description: string;
	route: string;
};

export const CustomerType: CustomerTypeProps[] = [
	{
		title: "Shipping",
		description: "Shipping container business",
		route: "shipping",
	},
	{
		title: "Trucking",
		description: "Container trucking business",
		route: "trucking",
	},
];

type InventoryType = {
	title: string;
	location: string;
	quantity: string;
	price: string;
};

export const InventoryObject: InventoryType[] = [
	{
		location: "025145 | Chicago, USA | Depot",
		price: "$ 1,250",
		quantity: "12 PCS",
		title: "20 STD - CW",
	},
	{
		location: "025145 | Chicago, USA | Depot",
		price: "$ 1,250",
		quantity: "12 PCS",
		title: "40 HC - CW",
	},
	{
		location: "025145 | Chicago, USA | Depot",
		price: "$ 1,250",
		quantity: "12 PCS",
		title: "20 STD - OT",
	},
];

type SupplierManagementTypes = {
	id: number;
	title: string;
	subtitle: string;
	price: string;
	quantity: string;
};

export const SupplierManagementData: SupplierManagementTypes[] = [
	{
		id: 1,
		title: "20 STD - CW",
		subtitle: "025145 | Chicago, USA | Depot",
		price: "$ 1,250",
		quantity: "12 PCS",
	},
	{
		id: 2,
		title: "40 HC - CW",
		subtitle: "025145 | Chicago, USA | Depot",
		price: "$ 1,250",
		quantity: "12 PCS",
	},
	{
		id: 3,
		title: "20 STD - OT",
		subtitle: "025145 | Chicago, USA | Depot",
		price: "$ 1,250",
		quantity: "12 PCS",
	},
];

export const InventoryTableData: TableDataProps[] = [
	{
		id: 1,
		columnTitle: "Product Name",
		tableData: ["20 STD - CW", "40 HC - CW", "20 STD - OT"],
	},
	{
		id: 2,
		columnTitle: "City",
		tableData: ["Chicago", "Chicago", "Chicago"],
	},
	{
		id: 3,
		columnTitle: "State",
		tableData: ["USA", "USA", "USA"],
	},
	{
		id: 4,
		columnTitle: "Quantity",
		tableData: ["12 PCS", "12 PCS", "12 PCS"],
	},
	{
		id: 5,
		columnTitle: "Depot",
		tableData: ["Depot", "Depot", "Depot"],
	},
	{
		id: 6,
		columnTitle: "Price",
		tableData: ["$ 1,250", "$ 1,250", "$ 1,250"],
	},
];

export const SupplierTableData: TableDataProps[] = [
	{
		id: 1,
		columnTitle: "Supplier",
		tableData: [
			"East Pacific Container",
			"North Pacific Container",
			"North Atlantic",
		],
	},
	{
		id: 2,
		columnTitle: "Location",
		tableData: ["Chicago, USA", "New York, USA", "California, USA"],
	},
	{
		id: 3,
		columnTitle: "Abcde",
		tableData: null,
	},
	{
		id: 4,
		columnTitle: "Contact",
		tableData: ["09154814993", "09154814993", "09154814993"],
	},
];

export type TableTypes<Header, Body> = {
	tableHeader: Header[];
	tableBody: Body[];
};
