import { StatesType, TableDataProps } from "./props";

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

export const states: StatesType = {
	usa: [
		"Ohio",
		"New Mexico",
		"Virginia",
		"Texas",
		"California",
		"Alaska",
		"Georgia",
		"Illinois",
		"Colorado",
		"Maryland",
		"Louisiana",
		"Puerto Rico",
		"Washington",
		"Alabama",
		"Idaho",
		"Massachusetts",
		"Connecticut",
		"New York",
		"Florida",
		"North Carolina",
		"Arizona",
		"South Carolina",
		"Tennessee",
		"Iowa",
		"Michigan",
		"Nevada",
		"Oregon",
		"Indiana",
		"Mississippi",
		"New Jersey",
		"Missouri",
		"Kansas",
		"Kentucky",
		"Nebraska",
		"Arkansas",
		"Wisconsin",
		"Minnesota",
		"Hawaii",
		"Oklahoma",
		"Rhode Island",
		"Utah",
		"District of Columbia",
		"South Dakota",
	],
	canada: [
		"British Columbia",
		"Newfoundland",
		"Ontario",
		"Alberta",
		"Quebec",
		"Nova Scotia",
		"Saskatchewan",
		"New Brunswick",
		"Manitoba",
	],
};

export const cities = {
	// CANADA
	"British Columbia": ["Abbotsford", "Kelowna", "Vancouver", "Victoria"],
	Ontario: [
		"Barrie",
		"Hamilton",
		"Kingston",
		"Kitchener",
		"London",
		"Oshawa",
		"St Catharines-Niagara",
		"Sudbury",
		"Thunder Bay",
		"Toronto",
		"Windsor",
	],
	Alberta: ["Calgary", "Edmonton"],
	Quebec: ["Chicoutimi", "Montréal", "Quebéc", "Sherbrooke", "Trois-Rivières"],
	"Nova Scotia": ["Halifax", "Sydney"],
	Saskatchewan: ["Regina", "Saskatoon"],
	"New Brunswick": ["Saint John"],
	Newfoundland: ["St John's"],
	Manitoba: ["Winnipeg"],

	// USA
	Ohio: ["Akron", "Cincinnati", "Cleveland", "Columbus", "Toledo"],
	"New Mexico": ["Albuquerque", "Santa Teresa"],
	Virginia: [
		"Alexandria",
		"Arlington",
		"Chesapeake",
		"Newport News",
		"Norfolk",
		"Richmond",
		"Virginia Beach",
	],
	Texas: [
		"Amarillo",
		"Arlington",
		"Austin",
		"Brownsville",
		"Corpus Christi",
		"Dallas",
		"Denton",
		"El Paso",
		"Fort Worth",
		"Frisco",
		"Garland",
		"Grand Prairie",
		"Haslet",
		"Houston",
		"Irving",
		"Killeen",
		"Laredo",
		"Lubbock",
		"McAllen",
		"McKinney",
		"Mesquite",
		"Pasadena",
		"Plano",
		"San Antonio",
	],
	California: [
		"Anaheim",
		"Bakersfield",
		"Chula Vista",
		"Corona",
		"Elk Grove",
		"Escondido",
		"Fontana",
		"Fremont",
		"Fresno",
		"Fullerton",
		"Garden Grove",
		"Glendale",
		"Hayward",
		"Huntington Beach",
		"Irvine",
		"Lancaster",
		"Los Angeles/Long Beach",
		"Modesto",
		"Moreno Valley",
		"Oakland",
		"Oceanside",
		"Ontario",
		"Oxnard",
		"Palmdale",
		"Pomona",
		"Rancho Cucamonga",
		"Riverside",
		"Roseville",
		"Sacramento",
		"Salinas",
		"San Bernardino",
		"San Diego",
		"San Francisco",
		"San Jose",
		"Santa Ana",
		"Santa Clarita",
		"Santa Rosa",
		"Stockton",
		"Sunnyvale",
		"Torrance",
		"Visalia",
	],
	Alaska: ["Anchorage"],
	Georgia: ["Atlanta", "Augusta", "Columbus", "Savannah"],
	Illinois: ["Aurora", "Chicago", "Joliet", "Naperville", "Rockford"],
	Colorado: [
		"Aurora",
		"Colorado Springs",
		"Denver",
		"Fort Collins",
		"Lakewood",
		"Thornton",
	],
	Maryland: ["Baltimore"],
	Louisiana: ["Baton Rouge", "New Orleans", "Shreveport"],
	"Puerto Rico": ["Bayamon", "San Juan"],
	Washington: ["Bellevue", "Kent", "Seatle", "Spokane", "Tacoma", "Vancouver"],
	Alabama: ["Birmingham", "Huntsville", "Mobile", "Montgomery"],
	Idaho: ["Boise"],
	Massachusetts: ["Boston", "Springfield", "Worcester"],
	Connecticut: ["Bridgeport"],
	"New York": ["Buffalo", "New York City", "Rochester", "Syracuse", "Yonkers"],
	Florida: [
		"Cape Coral",
		"Fort Lauderdale",
		"Hialeah",
		"Hollywood",
		"Jacksonville",
		"Miami",
		"Orlando",
		"Pembroke Pines",
		"Port St. Lucie",
		"St. Petersburg",
		"Tallahassee",
		"Tampa",
	],
	"North Carolina": [
		"Cary",
		"Charlotte",
		"Durham",
		"Fayetteville",
		"Greensboro",
		"Wilmington",
		"Raleigh",
		"Winston-Salem",
	],
	Arizona: [
		"Chandler",
		"Gilbert",
		"Glendale",
		"Mesa",
		"Peoria",
		"Phoenix",
		"Scottsdale",
		"Surprise",
		"Tempe",
		"Tucson",
	],
	"South Carolina": ["Charleston", "Greer"],
	Tennessee: [
		"Chattanooga",
		"Clarksville",
		"Knoxville",
		"Memphis",
		"Murfreesboro",
		"Nashville",
	],
	Iowa: ["Des Moines"],
	Michigan: ["Detroit", "Grand Rapids"],
	Nevada: [
		"Enterprise",
		"Henderson",
		"Las Vegas",
		"North Las Vegas",
		"Paradise",
		"Reno",
		"Spring Valley",
		"Sunrise Manor",
	],
	Oregon: ["Eugene", "Portland", "Salem"],
	Indiana: ["Indianapolis", "Fort Wayne"],
	Mississippi: ["Jackson"],
	"New Jersey": ["Jersey City", "Township", "Newark", "Paterson"],
	Missouri: ["Kansas City", "Springfield", "St. Louis"],
	Kansas: ["Kansas City", "Overland Park", "Wichita"],
	Kentucky: ["Lexington", "Louisville"],
	Nebraska: ["Lincoln", "Omaha"],
	Arkansas: ["Little Rock"],
	Wisconsin: ["Milwaukee", "Madison"],
	Minnesota: ["St. Paul", "Minneapolis"],
	Hawaii: ["Honolulu"],
	Oklahoma: ["Oklahoma City", "Tulsa"],
	"Rhode Island": ["Providence"],
	Utah: ["Salt Lake City"],
	"District of Columbia": ["Washington"],
	"South Dakota": ["Sioux Falls"],
};
