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

export type InventoryTypes = {
	id: number;
	productName: string;
	state: string;
	city: string;
	price: string;
	quantity: string;
	depot: string;
};

export const InventoryObjects: InventoryTypes[] = [
	{
		id: 1,
		productName: "20 STD - CW",
		city: "Chicago",
		state: "USA",
		depot: "Depot",
		price: "$ 1,250",
		quantity: "12 PCS",
	},
	{
		id: 2,
		productName: "40 HC - CW",
		city: "Chicago",
		state: "USA",
		depot: "Depot",
		price: "$ 1,250",
		quantity: "12 PCS",
	},
	{
		id: 3,
		productName: "20 STD - OT",
		city: "Chicago",
		state: "USA",
		depot: "Depot",
		price: "$ 1,250",
		quantity: "12 PCS",
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
	setIsShowingFilter: React.Dispatch<React.SetStateAction<boolean>>;
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
	access_token: string;
};

type UserResponseProps = {
	id: number;
	firstName: string;
	lastName: string;
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
	businessName: string;
	completeAddress: string;
	contactNumber: string;
	quantity: string;
	buyingRate: string;
	sellingRate: string;
};

export type SupplierDataProps = {
	suppliers: SupplierTableProps[];
};

export type SupplierTableProps = {
	businessName: string;
	city: string;
	companyPhoneNumber: string;
	country: string;
	state: string;
	id: string;
};

export type ShippingFormProps = {
	businessInformation: BusinessInformation;
	contactInformation: ContactInformation[];
};

type BusinessInformation = {
	businessName: string;
	city: string;
	state: string;
	country: string;
	companyPhoneNumber: string;
	companyEmailWebsite: string;
};

type ContactInformation = {
	contactPersonFirstName: string;
	contactPersonLastName: string;
	contactPersonMI: string;
	jobTitle: string;
	contactNumber: string;
	email: string;
};

export type SupplierFormValidation = z.infer<typeof supplierValidationSchema>;
