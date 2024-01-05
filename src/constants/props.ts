import { FieldErrors, UseFormRegister } from "react-hook-form";
import { supplierValidationSchema } from "@/models/supplier";
import { z } from "zod";

export type PersonalDetailProps = {
	firstName: string;
	middleInitial: string;
	lastName: string;
	birthDate: string;
	setFirstName: React.Dispatch<React.SetStateAction<string>>;
	setMiddleInitial: React.Dispatch<React.SetStateAction<string>>;
	setLastName: React.Dispatch<React.SetStateAction<string>>;
	setBirthDate: React.Dispatch<React.SetStateAction<string>>;
	register: UseFormRegister<User>;
	errors?: FieldErrors<User>;
};

export type CustomDropdownProps = {
	gender: string;
	setGender: (gender: string) => void;
	hasGenderError: boolean;
};

export type FormDataProps = {
	firstName: string;
	lastName: string;
	middleName: string;
	gender: string;
	birthDate: string;
	mobileNumber: string;
	pin: string;
	setError?: React.Dispatch<React.SetStateAction<string>>;
};

export type LoginFormProps = {
	extractedPin: string;
	phoneNumber: string;
};

export type OTPFieldProps = {
	otp: string[];
	setOtp: React.Dispatch<React.SetStateAction<string[]>>;
};

export type RegistrationSignature = {
	success: boolean;
	message: string;
	user: User;
};
export type User = {
	firstName: string;
	middleName: string;
	lastName: string;
	birthDate: string;
	gender: string;
	mobileNumber: string;
	pin: string;
	confirmPin?: string;
	setResponse?: React.Dispatch<React.SetStateAction<User | null>>;
};

export type PersonalDetailDatatypes = {
	firstName: string;
	middleInitial: string;
	lastName: string;
};

export type AccountDetailDatatypes = {
	mobileNumber: string;
	pin: string;
	confirmPin: string;
};

export type AccountDetailProps = {
	mobileNumber: string;
	pin: string;
	confirmPin: string;
	gender: string;
	setGender: React.Dispatch<React.SetStateAction<string>>;
	setMobileNumber: React.Dispatch<React.SetStateAction<string>>;
	setPin: React.Dispatch<React.SetStateAction<string>>;
	setConfirmPin: React.Dispatch<React.SetStateAction<string>>;
	register: UseFormRegister<User>;
	errors?: FieldErrors<User>;
};

type CardTypes = {
	transaction: string;
	description: string;
};

export const cardData: CardTypes[] = [
	{ description: "TOTAL TRANSACTION", transaction: "1,500" },
	{ description: "AVERAGENORTH", transaction: "5,350" },
	{
		description: "TOTAL REVENUES",
		transaction: "₱ 25,325.00",
	},
	{
		description: "AVERAGE REVENUE PER SUBSCRIPTION",
		transaction: "₱ 5,405.00",
	},
];

export type SupplierManagementCard = {
	route: string;
	title: string;
	subtitle: string;
	phoneNumber: string;
};

export const SupplierManagementProps: SupplierManagementCard[] = [
	{
		route: "east-pacific-container",
		title: "East Pacific Container",
		subtitle: "Chicago, USA",
		phoneNumber: "09154814993",
	},
	{
		route: "north-pacific-container",
		title: "North Pacific Container",
		subtitle: "New York, USA",
		phoneNumber: "09154814993",
	},
	{
		route: "south-atlantic",
		title: "South Atlantic",
		subtitle: "California, USA",
		phoneNumber: "09154814993",
	},
];

export type ContainerInformationProps = {
	containerType: string;
	condition: string;
	city: string;
	state: string;
	region: string;
	country: string;
	depot: string;
	validUntil: string;
	quantity: string;
	buyingRate: string;
	sellingRate: string;
	setContainerType: React.Dispatch<React.SetStateAction<string>>;
	setCondition: React.Dispatch<React.SetStateAction<string>>;
	setCity: React.Dispatch<React.SetStateAction<string>>;
	setState: React.Dispatch<React.SetStateAction<string>>;
	setRegion: React.Dispatch<React.SetStateAction<string>>;
	setCountry: React.Dispatch<React.SetStateAction<string>>;
	setDepot: React.Dispatch<React.SetStateAction<string>>;
	setValidUntil: React.Dispatch<React.SetStateAction<string>>;
	setQuantity: React.Dispatch<React.SetStateAction<string>>;
	setBuyingRate: React.Dispatch<React.SetStateAction<string>>;
	setSellingRate: React.Dispatch<React.SetStateAction<string>>;
};

export type SuplierFormInventoryProps = {
	supplierName: string;
	setSupplierName: React.Dispatch<React.SetStateAction<string>>;
	businessName: string;
	setBusinessName: React.Dispatch<React.SetStateAction<string>>;
	completeAddress: string;
	setCompleteAddress: React.Dispatch<React.SetStateAction<string>>;
	contactNumber: string;
	setContactNumber: React.Dispatch<React.SetStateAction<string>>;
};

export type DynamicDropdownProps = {
	dropdownText: string;
	dropDownItems: string[] | null;
	uniqueItems: string[];
	setUniqueItems: React.Dispatch<React.SetStateAction<string[]>>;
};

export type TableMutatorProps = {
	// setIsShowingFilter: React.Dispatch<React.SetStateAction<boolean>>;
	data: Payment[];
	// table: Table<Payment>;
};

export type TableDataProps = {
	id: number;
	columnTitle: string;
	tableData: string[] | null;
};

export type LoginSuccessResponse = {
	success: boolean;
	message: string;
	user: UserResponseProps;
	csrf_access_token: string;
	access_token: string;
	access_token_cookie: string;
	access_module: string[];
};

type UserResponseProps = {
	id: number;
	firstName: string;
	lastName: string;
	user_type: string;
};

export type RegisterResponse = {
	message: string;
};

export type StatesType = {
	USA: string[];
	Canada: string[];
};

export type InventoryProps = {
	containerType: string;
	condition: string;
	city: string;
	state: string;
	region: string;
	country: string;
	depot: string;
	validUntil: string;
	quantity: string;
	buyingRate: string;
	sellingRate: string;
};

export type SupplierDataProps = {
	suppliers: SupplierTableProps[];
	page_count: number;
	previous_page: number | null;
	next_page: number | null;
};

export type SupplierTableProps = {
	businessName: string;
	city: string;
	companyPhoneNumber: string;
	location: string;
	id: string;
};

export type CustomerTableProps = {
	customer: string;
	city: string;
	companyPhoneNumber: string;
	location: string;
	id: string;
};

export type BusinessFilterProps = {
	businessNames: ExtractedBusinessFilter[];
};

export type ExtractedBusinessFilter = {
	id: string;
	businessName: string;
};

export type LocationFilterProps = {
	locations: ExtractedLocationFilter[];
};

export type ExtractedLocationFilter = {
	id: string;
	location: string;
};

export type ContactFilterProps = {
	contacts: ExtractedContactFilter[];
};

export type ExtractedContactFilter = {
	id: string;
	companyPhoneNumber: string;
};

export type ShippingFormProps = {
	businessInformation: BusinessInformation;
	contactInformation: ContactInformation[];
};

export type BusinessInformation = {
	businessName: string;
	city: string;
	state: string;
	country: string;
	companyPhoneNumber: string;
	companyEmailWebsite: string;
};

export type ContactInformation = {
	contactPersonFirstName: string;
	contactPersonLastName: string;
	contactPersonMI: string;
	jobTitle: string;
	contactNumber: string;
	email: string;
};

export type SupplierFormValidation = z.infer<typeof supplierValidationSchema>;

export type SupplierItem = {
	supplier: Supplier;
	contactInformation: ContactInformation[];
	message?: string;
};

type Supplier = {
	id: number;
	businessInformation: BusinessInformation;
};

// export type Payment = {
//   id: string;
//   amount: number;
//   status: "pending" | "processing" | "success" | "failed";
//   email: string;
// };
export type Payment = {
	supplier: string;
	location: string;
	abcde: string;
	contact: string;
	id?: string;
};

export type FilterForm = {
	supplier: string;
	location: string;
	contact: string;
};
export type InventoryFilterForm = {
	productName: string;
	city: string;
	state: string;
	quantity: string;
	depot: string;
	price: string;
};

export type CheckboxShape = {
	id: string;
	label: string;
	column: string;
};

export type HelperType = {
	suppliers: SupplierTableProps[];
	previous_page: number | null;
	next_page: number | null;
};

export type FilteringBusinessName = {
	id: string;
	businessName: string;
};

export type FilteringContact = {
	id: string;
	contact: string;
};

export type FilteringLocation = {
	id: string;
	location: string;
};

export type UpdateUsersRoleType = {
	role: string;
	usersPN: string[];
};

export type DeleteUsersType = {
	usersPN: UsersPhoneNumber[];
};

type UsersPhoneNumber = {
	phoneNumber: string;
};

export type UniqueItems = {
	businessName: string[];
	location: string[];
	contact: string[];
};

export type UniqueItemsCustomer = {
	customer: string[];
	location: string[];
	contact: string[];
};

export type InventoryUniqueItems = {
	containerType: string[];
	city: string[];
	state: string[];
	quantity: string[];
	depot: string[];
	buyingRate: string[];
};

export type ProductNameSearch = {
	id: string;
	containerType: string;
};

export type CitySearch = {
	id: string;
	city: string;
};

export type StateSearch = {
	id: string;
	state: string;
};

export type QuantitySearch = {
	id: string;
	quantity: string;
};

export type DepotSearch = {
	id: string;
	depot: string;
};

export type PriceSearch = {
	id: string;
	price: string;
};

export type SearchedType = {
	filtered: SupplierTableProps[];
	error?: string;
};

export type UsersType = {
	id: number;
	lastName: string;
	firstName: string;
	middleName: string;
	birthDate: string;
	gender: string;
	mobileNumber: string;
	user_type: string;
};

export type PaginatedInventory = {
	products: InventoryData[];
	page_count: number;
	previous_page: number | null;
	next_page: number | null;
};

export type InventoryData = {
	id: string;
	containerType: string;
	city: string;
	state: string;
	quantity: string;
	depot: string;
	buyingRate: string;
};

export type RoleManagementAccounts = {
	id: string;
	fullName: string;
	userType: string;
	status: string;
};

export type RoleManagementUser = {
	firstName: string;
	lastName: string;
	middleName: string;
	mobileNumber: string;
	status: string;
	user_type: string;
};

export type SupplierInventory = {
	businessName: string;
	completeAddress: string;
	contactNumber: string;
};

export type SupplierInventoryPost = {
	businessName: string;
};

export type InventorySupplierPostType = {
	containerInformation: InventoryProps;
	supplier: SupplierInventoryPost;
};

export type InventorySupplierType = {
	containerInformation: InventoryProps;
	supplier: SupplierInventory;
};

export type InventorySupplierAlter = {
	businessName: string;
	completeAddress: string;
	companyPhoneNumber: string;
};

export type AccessModule = {
	role_type: string;
	customer_module: boolean;
	role_management: boolean;
	supplier_management: boolean;
	order_generator: boolean;
	sales_agent: boolean;
	inventory_officer: boolean;
	inventory_module: boolean;
};

export type Customer = {
	customerInformation: CustomerInformation;
	contactDetails: ContactDetails[];
};

export type CustomerInformation = {
	customerName: string;
	city: string;
	state: string;
	country: string;
	companyPhoneNumber: string;
	companyEmail: string;
};

export type ContactDetails = {
	contactPersonFirstName: string;
	contactPersonLastName: string;
	contactPersonMI: string;
	jobTitle: string;
};

export type CustomerPage = {
	customers: CustomerTable[];
	page_count: number;
	previous_page: number | null;
	next_page: number | null;
};

export type CustomerTable = {
	customer: string;
	location: string;
	contact: string;
	abcde: string;
};
