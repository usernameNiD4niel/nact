import {
	ShippingFormProps,
	SupplierDataProps,
	SupplierItem,
} from "@/constants/props";
import Cookies from "js-cookie";

const token = Cookies.get("token");
const getSupplierTableData = async () => {
	console.log("token, ", token);

	const response = await fetch(
		`https://flask-service.gi2fod26lfct0.ap-southeast-1.cs.amazonlightsail.com/api/supplier`,
		{
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + token,
			},
		},
	);

	if (response.ok) {
		const data: Promise<SupplierDataProps> = response.json();
		return (await data).suppliers;
	} else {
		throw new Error(response.arrayBuffer.toString());
	}
};

type ResponseAddShipping = {
	message: string;
};

const addShippingSupplier = async (
	shipping: ShippingFormProps,
	setValidation: React.Dispatch<React.SetStateAction<string>>,
	setMessage: React.Dispatch<React.SetStateAction<string>>,
) => {
	const response = await fetch(
		`https://flask-service.gi2fod26lfct0.ap-southeast-1.cs.amazonlightsail.com/api/supplier/add/shipping`,
		{
			method: "post",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + token,
			},
			body: JSON.stringify(shipping),
		},
	);

	if (response.ok) {
		const data: Promise<ResponseAddShipping> = await response.json();

		const { message } = await data;
		setMessage(message);
		setValidation("success");
		return true;
	} else {
		const data: Promise<ResponseAddShipping> = await response.json();
		setValidation("error");
		const { message } = await data;
		setMessage(message);
		return false;
	}
};

// No Token for this request
const getSpecificSupplier = async (id: string) => {
	const supplier = await fetch(
		`https://flask-service.gi2fod26lfct0.ap-southeast-1.cs.amazonlightsail.com/api/supplier/${id}`,
		{
			headers: {
				"Content-Type": "application/json",
			},
		},
	);

	if (supplier.ok) {
		const response: SupplierItem = await supplier.json();
		return response;
	} else {
		throw new Error("Could not find supplier");
	}
};

// No Token for this request
const updateSpecificSupplier = async (
	id: string,
	shipping: ShippingFormProps,
	setValidation: React.Dispatch<React.SetStateAction<string>>,
	setMessage: React.Dispatch<React.SetStateAction<string>>,
) => {
	const response = await fetch(
		`https://flask-service.gi2fod26lfct0.ap-southeast-1.cs.amazonlightsail.com/api/supplier/update/${id}`,
		{
			method: "patch",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(shipping),
		},
	);

	if (response.ok) {
		const data: Promise<ResponseAddShipping> = await response.json();

		const { message } = await data;
		setMessage(message);
		setValidation("success");
		return true;
	} else {
		const data: Promise<ResponseAddShipping> = await response.json();
		setValidation("error");
		const { message } = await data;
		setMessage(message);
		return false;
	}
};

// No Token for this request
const deleteSupplier = async (
	id: string,
	setValidation: React.Dispatch<React.SetStateAction<string>>,
	message_: string,
) => {
	const response = await fetch(
		`https://flask-service.gi2fod26lfct0.ap-southeast-1.cs.amazonlightsail.com/api/supplier/delete/${id}`,
		{
			method: "delete",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		},
	);

	if (response.ok) {
		const data = (Promise<ResponseAddShipping> = await response.json());

		const { message } = await data;
		message_ = message;
		setValidation("success");
		return true;
	} else {
		const data: Promise<ResponseAddShipping> = await response.json();
		setValidation("error");
		const { message } = await data;
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		message_ = message;
		return false;
	}
};

export {
	getSupplierTableData,
	addShippingSupplier,
	getSpecificSupplier,
	updateSpecificSupplier,
	deleteSupplier,
};
