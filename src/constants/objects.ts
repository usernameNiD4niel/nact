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
