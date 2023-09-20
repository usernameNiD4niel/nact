import { InventoryProps } from "@/constants/props";

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
