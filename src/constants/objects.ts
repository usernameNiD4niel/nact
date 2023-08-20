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
