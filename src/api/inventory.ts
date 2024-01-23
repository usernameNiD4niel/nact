import {
	InventorySupplierAlter,
	InventorySupplierPostType,
	InventorySupplierType,
	InventoryUniqueItems,
	PaginatedInventory,
	PaginatedInventoryExpired,
} from "@/constants/props";

export const isInventoryAdded = async (
	inventory: InventorySupplierPostType,
) => {
	const request = {
		containerInformation: inventory.containerInformation,
		supplierInformation: inventory.supplier,
	};

	console.log(`${JSON.stringify(request, null, 2)}`);

	const response = await fetch(
		`${import.meta.env.VITE_BASE_URL}/api/inventory/add`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(request),
		},
	);

	if (response.ok) {
		return response.json();
	} else {
		console.log(`the response status code ::: ${response.status}`);

		if (response.status === 500) {
			throw new Error(
				"Kapag nakita moto internal error, means ang error sa backend",
			);
		}
		return new Error("Please enter a valid input");
	}
};

export const getUniqueItems = async () => {
	const response = await fetch(
		`${import.meta.env.VITE_BASE_URL}/api/inventory/unique`,
		{
			headers: {
				"Content-Type": "application/json",
			},
		},
	);

	if (response.ok) {
		const data: InventoryUniqueItems = await response.json();
		return data;
	}
	throw new Error("Unable to retrieve unique items");
};

export async function getColumnSearch<T>(
	searchQuery: string,
	column: string,
	isAvailable = true,
) {
	let url = "";
	if (isAvailable) {
		url = `inventory/${column}/${searchQuery}`;
	} else {
		url = `expired/inventory/${column}/${searchQuery}`;
	}

	const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/${url}`, {
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then((response) => response.json())
		.then((d) => {
			const data: T[] = isAvailable ? d.products : d.expired_inventory;
			return data;
		})
		.catch((error) => {
			console.log("the error: ", error);
			return [] as T[];
		});

	return response;
}

//! use this in mmain search
export async function getSearch(search: string) {
	const response = await fetch(
		`${import.meta.env.VITE_BASE_URL}/api/inventory/search?query=${search}`,
		{
			headers: {
				"Content-Type": "application/json",
			},
		},
	);

	if (response.ok) {
		const data = await response.json();
		//add a type here
		console.log(`search ::: ${JSON.stringify(data, null, 2)}`);

		return data.filtered;
	}

	return [];
}

export async function getSearchExpired(search: string) {
	const response = await fetch(
		`${
			import.meta.env.VITE_BASE_URL
		}/api/expired/inventory/search?query=${search}`,
		{
			headers: {
				"Content-Type": "application/json",
			},
		},
	);

	if (response.ok) {
		const data = await response.json();
		//add a type here
		console.log(`search ::: ${JSON.stringify(data, null, 2)}`);

		return data.filtered;
	}

	return [];
}

export async function getPaginatedData() {
	const response = await fetch(
		`${import.meta.env.VITE_BASE_URL}/api/inventory?page=1&per_page=10`,
		{
			headers: {
				"Content-Type": "application/json",
			},
		},
	);

	if (response.ok) {
		const data = await response.json();
		console.log(JSON.stringify(data, null, 2));

		return data as PaginatedInventory;
	}

	throw new Error("Cannot get the data...");
}

export async function updateInventory(
	id: string,
	data: InventorySupplierPostType,
) {
	const response = await fetch(
		`${import.meta.env.VITE_BASE_URL}/api/inventory/update/${id}`,
		{
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		},
	);

	if (response.ok) {
		const { message } = await response.json();

		return {
			success: message,
			message: "You have successfully updated the selected inventory",
		} as {
			success: boolean;
			message: string;
		};
	}
	console.log(response.status);

	if (response.status === 500) {
		console.log("response:::", response);

		return {
			success: false,
			message:
				"Cannot update the inventory data, the error is from server status " +
				500,
		} as { success: boolean; message: string };
	}

	return {
		success: false,
		message: "Cannot update the inventory data, please try again",
	} as { success: boolean; message: string };
}

export async function getSpecificItem(id: string) {
	const response = await fetch(
		`${import.meta.env.VITE_BASE_URL}/api/inventory/retrieve/${id}`,
		{
			headers: {
				"Content-Type": "application/json",
			},
		},
	);

	if (!response.ok) {
		throw new Error("Cannot fetch the specified inventory");
	}

	const data = await response.json();
	return data as InventorySupplierType;
}

export async function getSupplierInventory() {
	const response = await fetch(
		`${import.meta.env.VITE_BASE_URL}/api/inventory/data`,
		{
			headers: {
				"Content-Type": "application/json",
			},
		},
	);

	if (!response.ok) {
		throw new Error("Cannot fetch all of the available supplier");
	}

	const data = await response.json();
	return data.suppliers as InventorySupplierAlter[];
}

export async function getPaginatedExpired(page: number) {
	const response = await fetch(
		`${
			import.meta.env.VITE_BASE_URL
		}/api/expired/inventory?page=${page}&per_page=10`,
		{
			headers: {
				"Content-Type": "application/json",
			},
		},
	);

	if (response.ok) {
		const data = await response.json();
		return data as PaginatedInventoryExpired;
	}

	return {} as PaginatedInventoryExpired;
}
