import {
	Customer,
	CustomerPage,
	CustomerTable,
	UniqueItemsCustomer,
} from "@/constants/props";

export async function getFilteredData(params: string) {
	const response = await fetch(
		`${import.meta.env.VITE_BASE_URL}/api/filter?${params}`,
		{
			headers: {
				"Content-Type": "application/json",
			},
		},
	);

	if (response.ok) {
		const data = await response.json();
		return data.filtered as CustomerTable[];
	}

	console.log(response);

	throw new Error("Cannot get the filtered data, please try again later");
}

/**
 * 
 * @param page suppliers: SupplierTableProps[];
    page_count: number;
    previous_page: number | null;
    next_page: number | null;
 * @returns 
 */

// use the type "CustomerTableProps" here...
export async function getInitialData(page: number) {
	const response = await fetch(
		`${import.meta.env.VITE_BASE_URL}/api/customer?page=${page}&per_page=10`,
		{
			headers: {
				"Content-Type": "application/json",
			},
		},
	);

	if (response.ok) {
		const data: CustomerPage = await response.json();

		return data;
	}

	throw new Error("cannot get the data");
}

export async function getUniqueItems() {
	const response = await fetch(
		`${import.meta.env.VITE_BASE_URL}/api/customer/unique`,
		{
			headers: {
				"Content-Type": "application/json",
			},
		},
	);

	if (response.ok) {
		const data: UniqueItemsCustomer = await response.json();
		return data;
	}

	throw new Error("Unable to retrieve unique items");
}

export async function getColumnFilter<TData>(
	column: string,
	searchQuery: string,
) {
	const response = await fetch(
		`${import.meta.env.VITE_BASE_URL}/api/customer/${column}/${searchQuery}`,
		{
			headers: {
				"Content-Type": "application/json",
			},
		},
	)
		.then((response) => response.json())
		.then((d) => {
			const data = d[`${column}`];
			return data as TData[];
		})
		.catch((error) => {
			console.log("the error: ", error);
			return [] as TData[];
		});

	return response;
}

export async function addCustomer(customerData: Customer) {
	const response = await fetch(
		`${import.meta.env.VITE_BASE_URL}/api/customer/add`,
		{
			method: "POST",
			body: JSON.stringify(customerData),
			headers: {
				"Content-Type": "application/json",
			},
		},
	);

	if (response.ok) {
		const data = await response.json();
		return {
			success: true,
			message: data.message as string,
			customerId: data.customerId as string,
			customerName: data.customerName as string,
		};
	}

	const data = await response.json();
	return {
		success: false,
		message: data.message as string,
		customerId: "",
		customerName: "",
	};
}
