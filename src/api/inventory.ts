import { InventoryProps, InventoryUniqueItems } from "@/constants/props";

// ! Store the endpoints to env file
export const isInventoryAdded = async (inventory: InventoryProps) => {
	const response = await fetch(
		"https://flask-service.gi2fod26lfct0.ap-southeast-1.cs.amazonlightsail.com/inventory/add",
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(inventory),
		},
	);

	if (response.ok) {
		return response.json();
	} else {
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

export async function getColumnSearch<T>(searchQuery: string, column: string) {
	const response = await fetch(
		`${import.meta.env.VITE_BASE_URL}/api/inventory/${column}/${searchQuery}`,
		{
			headers: {
				"Content-Type": "application/json",
			},
		},
	)
		.then((response) => response.json())
		.then((d) => {
			const data: T[] = d[`${column}s`];
			return data;
		})
		.catch((error) => {
			console.log("the error: ", error);
			return [] as T[];
		});

	return response;
}
