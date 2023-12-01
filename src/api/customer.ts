import { UniqueItemsCustomer } from "@/constants/props";

export async function getFilteredData<TData>(params: string) {
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
		return data.filtered as TData[];
	}

	console.log(response);

	throw new Error("Cannot get the filtered data, please try again later");
}

// use the type "CustomerTableProps" here...
export async function getInitialData<TData>() {
	const response = await fetch(
		`${import.meta.env.VITE_BASE_URL}/api/customer?page=1&per_page=10`,
		{
			headers: {
				"Content-Type": "application/json",
			},
		},
	);

	if (response.ok) {
		const data = await response.json();
		const customer: TData[] = (await data).customers;

		return customer;
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
