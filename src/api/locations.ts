import { Locations } from "@/constants/props";

export async function getLocations() {
	const response = await fetch(
		`${import.meta.env.VITE_BASE_URL}/api/locations`,
		{
			headers: {
				"Content-Type": "application/json",
			},
		},
	);

	if (response.ok) {
		const data = await response.json();
		return data.locations as Locations[];
	}

	console.log(response);

	return [];
}

export async function getSpecificColumnData(column: string) {
	const response = await fetch(
		`${import.meta.env.VITE_BASE_URL}/api/locations/${column}`,
		{
			headers: {
				"Content-Type": "application/json",
			},
		},
	);

	if (response.ok) {
		const data = await response.json();
		return data.locations as string[];
	}

	return [];
}

export async function createLocation(location: Locations) {
	const newLocation = {
		city: location.city,
		country: location.country,
		state: location.state,
		region: location.region,
	};

	const response = await fetch(
		`${import.meta.env.VITE_BASE_URL}/api/locations`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newLocation),
		},
	);

	const data = await response.json();
	if (response.ok) {
		return {
			success: true,
			message: data.message,
		};
	}
	return {
		success: false,
		message: data.message ?? "Cannot create new location, please try again",
	};
}
